import { supabase } from './supabase';
import { CreatePostingData, PostingResponse } from '@/types/posting';

export class PostingService {
    static async createPosting(data: CreatePostingData): Promise<PostingResponse> {
        try {
            // 1. Upload media file if provided
            let mediaUrl: string | null = null;
            if (data.mediaFile) {
                mediaUrl = await this.uploadMedia(data.mediaFile);
            }

            // 2. Insert posting into database
            const { data: posting, error: postingError } = await supabase
                .from('Posting')
                .insert({
                    title: data.title,
                    description: data.description,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    address: data.address,
                    authorId: data.authorId,
                    status: 'WAITING_FOR_BIDS'
                })
                .select()
                .single();

            if (postingError) throw postingError;

            // 3. Insert media record if we have a file
            if (mediaUrl && posting) {
                const { error: mediaError } = await supabase
                    .from('media')
                    .insert({
                        url: mediaUrl,
                        mediaType: data.mediaFile!.type.startsWith('image/') ? 'IMAGE' : 'VIDEO',
                        order: 1,
                        postingId: posting.id
                    });

                if (mediaError) {
                    console.error('Media insert error:', mediaError);
                    // Continue even if media fails - posting is created
                }
            }

            // 4. Insert tags if provided
            if (data.tags && data.tags.length > 0 && posting) {
                await this.addTagsToPosting(posting.id, data.tags);
            }

            return posting;
        } catch (error) {
            console.error('Error creating posting:', error);
            throw error;
        }
    }

    private static async uploadMedia(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `postings/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }

    private static async addTagsToPosting(postingId: string, tagNames: string[]) {
        // First, get or create tags
        const tagIds: string[] = [];

        for (const tagName of tagNames) {
            let { data: tag, error } = await supabase
                .from('tags')
                .select('id')
                .eq('name', tagName.trim())
                .single();

            if (error && error.code === 'PGRST116') {
                // Tag doesn't exist, create it
                const { data: newTag, error: createError } = await supabase
                    .from('tags')
                    .insert({
                        name: tagName.trim(),
                        type: 'SERVICE' // Adjust based on your tag types
                    })
                    .select('id')
                    .single();

                if (createError) throw createError;
                tag = newTag;
            }

            if (tag) tagIds.push(tag.id);
        }

        // Insert posting_tags relationships
        if (tagIds.length > 0) {
            const { error } = await supabase
                .from('posting_tags')
                .insert(
                    tagIds.map(tagId => ({
                        postingId,
                        tagId
                    }))
                );

            if (error) throw error;
        }
    }

    static async getUserLocation(): Promise<{ latitude: number; longitude: number; address?: string }> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Reverse geocoding to get address
                        const response = await fetch(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
                        );
                        const data = await response.json();
                        const address = data.features?.[0]?.place_name;

                        resolve({ latitude, longitude, address });
                    } catch (error) {
                        // Return without address if geocoding fails
                        resolve({ latitude, longitude });
                    }
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }
}
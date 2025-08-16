export interface CreatePostingData {
	title: string;
	description: string;
	latitude: number;
	longitude: number;
	address?: string;
	authorId: string;
	mediaFile?: File;
	tags?: string[];
}

export interface PostingResponse {
	id: string;
	title: string;
	description: string;
	status: "WAITING_FOR_BIDS" | "ACTIVE" | "COMPLETED";
	latitude: number;
	longitude: number;
	address?: string;
	createdAt: string;
	updatedAt: string;
}

// Represents a Tag/Skill fetched from the database
export interface SkillTag {
	id: string;
	name: string;
	category: string;
}

// Represents a certification being built in the form
export interface CertificationData {
	id: string; // A temporary client-side ID for list keys
	title: string;
	issuingBody: string;
	validUntil?: Date;
	file: File;
}

// The main state for the entire onboarding form
export interface OnboardingFormData {
	nickname: string;
	bio: string;
	skills: SkillTag[];
	address: string;
	latitude: number | null;
	longitude: number | null;
	serviceRadiusKm: number;
	certifications: CertificationData[];
}

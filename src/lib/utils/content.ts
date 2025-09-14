type Language = 'en' | 'ja';

// Content loader utility
export async function loadContent(lang: Language, section: string) {
	try {
		const content = await import(`../data/${section}.${lang}.json`);
		return content.default || content;
	} catch (error) {
		console.warn(`Failed to load content for ${section}.${lang}.json`, error);
		// Fallback to English if Japanese fails
		if (lang === 'ja') {
			try {
				const fallback = await import(`../data/${section}.en.json`);
				return fallback.default || fallback;
			} catch (fallbackError) {
				console.error(`Failed to load fallback content for ${section}.en.json`, fallbackError);
				return {};
			}
		}
		return {};
	}
}

// Type definitions for content structure
export interface NavigationContent {
	about: string;
	experience: string;
	projects: string;
	publications: string;
	contact: string;
}

export interface AboutContent {
	title: string;
	name: string;
	role: string;
	company: string;
	introduction: string;
	brief_history: string;
	github_url: string;
	linkedin_url: string;
}

export interface ExperienceContent {
	title: string;
	work_experience: string;
	education: string;
	skills: string;
	languages: string;
	certifications: string;
}

export interface ProjectsContent {
	title: string;
	subtitle: string;
}

export interface PublicationsContent {
	title: string;
	subtitle: string;
}

export interface ContactContent {
	title: string;
	subtitle: string;
	form: {
		name: string;
		email: string;
		subject: string;
		message: string;
		send: string;
		sending: string;
		success: string;
		error: string;
		response_time: string;
	};
}

export interface CommonContent {
	present: string;
	view_project: string;
	read_more: string;
	download_cv: string;
}

export interface ContentData {
	navigation: NavigationContent;
	about: AboutContent;
	experience: ExperienceContent;
	projects: ProjectsContent;
	publications: PublicationsContent;
	contact: ContactContent;
	common: CommonContent;
}

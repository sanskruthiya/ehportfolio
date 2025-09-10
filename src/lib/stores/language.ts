import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Language = 'en' | 'ja';

function createLanguageStore() {
	const { subscribe, set, update } = writable<Language>('en');

	return {
		subscribe,
		toggle: () => update(lang => {
			const newLang = lang === 'en' ? 'ja' : 'en';
			if (browser) {
				localStorage.setItem('language', newLang);
			}
			return newLang;
		}),
		setLanguage: (lang: Language) => {
			set(lang);
			if (browser) {
				localStorage.setItem('language', lang);
			}
		},
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('language') as Language;
				const browserLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
				const lang = stored || browserLang;
				
				set(lang);
			}
		}
	};
}

export const language = createLanguageStore();

<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import { loadContent } from '$lib/utils/content';
	import type { NavigationContent } from '$lib/utils/content';

	// Temporarily commented out until dark mode functionality is implemented
	// export let isDarkMode: boolean = false;
	// export let onToggleDarkMode: () => void = () => {};

	let navigationContent: NavigationContent = {
		about: 'About',
		experience: 'Experience',
		projects: 'Projects',
		publications: 'Publications',
		contact: 'Contact'
	};

	let currentPath = '';
	let isMobileMenuOpen = false;

	onMount(async () => {
		language.init();
		
		// Load initial content
		const content = await loadContent($language, 'content');
		navigationContent = content.navigation || navigationContent;
		
		// Update content when language changes
		language.subscribe(async (lang) => {
			const content = await loadContent(lang, 'content');
			navigationContent = content.navigation || navigationContent;
		});

		// Track current path
		currentPath = window.location.pathname;
	});

	function toggleLanguage() {
		language.toggle();
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	$: isJapanese = $language === 'ja';
</script>

<header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo/Name -->
			<div class="flex-shrink-0">
				<a href="/" class="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
					{isJapanese ? '堀下 栄太' : 'Eita Horishita'}
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-8">
					<a 
						href="/" 
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						class:text-blue-600={currentPath === '/'}
						class:dark:text-blue-400={currentPath === '/'}
					>
						{navigationContent.about}
					</a>
					<a 
						href="/experience" 
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						class:text-blue-600={currentPath === '/experience'}
						class:dark:text-blue-400={currentPath === '/experience'}
					>
						{navigationContent.experience}
					</a>
					<a 
						href="/publications" 
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						class:text-blue-600={currentPath === '/publications'}
						class:dark:text-blue-400={currentPath === '/publications'}
					>
						{navigationContent.publications}
					</a>
					<a 
						href="/projects" 
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						class:text-blue-600={currentPath === '/projects'}
						class:dark:text-blue-400={currentPath === '/projects'}
					>
						{navigationContent.projects}
					</a>
					<a 
						href="/contact" 
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						class:text-blue-600={currentPath === '/contact'}
						class:dark:text-blue-400={currentPath === '/contact'}
					>
						{navigationContent.contact}
					</a>
				</div>
			</div>

			<!-- Controls (Language & Theme Toggle) -->
			<div class="flex items-center space-x-4">
				<!-- Language Toggle -->
				<button
					on:click={toggleLanguage}
					class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
					aria-label="Toggle language"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
					</svg>
					<span class="font-medium">{isJapanese ? 'English' : '日本語'}</span>
				</button>

				<!-- Theme Toggle - Temporarily hidden until functionality is implemented -->
				<!-- 
				<button
					on:click={onToggleDarkMode}
					class="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					{#if isDarkMode}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
						</svg>
					{/if}
				</button>
				-->

				<!-- Mobile menu button -->
				<button
					on:click={toggleMobileMenu}
					class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isMobileMenuOpen}
				>
					{#if isMobileMenuOpen}
						<!-- Close icon (X) -->
						<svg class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<!-- Hamburger icon -->
						<svg class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation (toggleable) -->
		{#if isMobileMenuOpen}
			<div class="md:hidden animate-in slide-in-from-top-2 duration-200">
				<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
					<a 
						href="/" 
						on:click={closeMobileMenu}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors {currentPath === '/' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}"
					>
						{navigationContent.about}
					</a>
					<a 
						href="/experience" 
						on:click={closeMobileMenu}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors {currentPath === '/experience' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}"
					>
						{navigationContent.experience}
					</a>
					<a 
						href="/publications" 
						on:click={closeMobileMenu}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors {currentPath === '/publications' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}"
					>
						{navigationContent.publications}
					</a>
					<a 
						href="/projects" 
						on:click={closeMobileMenu}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors {currentPath === '/projects' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}"
					>
						{navigationContent.projects}
					</a>
					<a 
						href="/contact" 
						on:click={closeMobileMenu}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors {currentPath === '/contact' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}"
					>
						{navigationContent.contact}
					</a>
				</div>
			</div>
		{/if}
	</nav>
</header>

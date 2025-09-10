<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { language } from '$lib/stores/language';
	import { loadContent } from '$lib/utils/content';
	import type { NavigationContent } from '$lib/utils/content';

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
		theme.init();
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

	function toggleTheme() {
		theme.toggle();
	}

	function toggleLanguage() {
		language.toggle();
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	$: isDark = $theme === 'dark';
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
						href="/projects" 
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
						class:text-blue-600={currentPath === '/projects'}
						class:dark:text-blue-400={currentPath === '/projects'}
					>
						{navigationContent.projects}
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
					class="flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="Toggle language"
				>
					<span class="text-xs font-mono">{isJapanese ? 'EN' : 'JA'}</span>
				</button>

				<!-- Theme Toggle -->
				<button
					on:click={toggleTheme}
					class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="Toggle theme"
				>
					{#if isDark}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{/if}
				</button>

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
						href="/projects" 
						on:click={closeMobileMenu}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors {currentPath === '/projects' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}"
					>
						{navigationContent.projects}
					</a>
					<a 
						href="/publications" 
						on:click={closeMobileMenu}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors {currentPath === '/publications' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}"
					>
						{navigationContent.publications}
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

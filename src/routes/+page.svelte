<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import { loadContent } from '$lib/utils/content';
	import type { AboutContent } from '$lib/utils/content';

	let aboutContent: AboutContent = {
		title: 'About Me',
		name: 'Eita Horishita',
		role: 'Technical Research Expert',
		company: 'VALUENEX Japan',
		introduction: '',
		brief_history: '',
		github_url: 'https://github.com/sanskruthiya',
		linkedin_url: 'https://www.linkedin.com/in/eita-horishita-2b8a605a/'
	};

	let profileData: any = {};

	onMount(async () => {
		// Load content based on current language
		const content = await loadContent($language, 'content');
		aboutContent = content.about || aboutContent;

		// Load profile data
		const profile = await loadContent($language, 'profile');
		profileData = profile;

		// Update content when language changes
		language.subscribe(async (lang) => {
			const content = await loadContent(lang, 'content');
			aboutContent = content.about || aboutContent;
			
			const profile = await loadContent(lang, 'profile');
			profileData = profile;
		});
	});
</script>

<svelte:head>
	<title>{aboutContent.name} - {aboutContent.role}</title>
	<meta name="description" content={aboutContent.introduction} />
</svelte:head>

<!-- Hero Section -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto text-center">
		<!-- Profile Photo -->
		<div class="mb-8">
			<img 
				src="/myprofile/myphoto.webp" 
				alt={aboutContent.name}
				class="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-blue-100 dark:border-blue-900 shadow-lg"
			/>
		</div>

		<!-- Name and Title -->
		<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
			{aboutContent.name}
		</h1>
		
		<p class="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 mb-2">
			{aboutContent.role}
		</p>
		
		<p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
			{aboutContent.company}
		</p>

		<!-- Social Links -->
		<div class="flex justify-center space-x-6 mb-12">
			<a 
				href={aboutContent.github_url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
			>
				<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				GitHub
			</a>
			
			<a 
				href={aboutContent.linkedin_url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
			>
				<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
				LinkedIn
			</a>
		</div>
	</div>
</section>

<!-- About Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
	<div class="max-w-4xl mx-auto">
		<div class="grid md:grid-cols-2 gap-12 items-start">
			<!-- Introduction -->
			<div>
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					{aboutContent.title}
				</h2>
				<p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
					{aboutContent.introduction}
				</p>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
					{aboutContent.brief_history}
				</p>
			</div>

			<!-- Quick Stats -->
			<div class="space-y-6">
				<div class="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Facts</h3>
					<div class="space-y-3">
						{#if profileData.personal}
							<div class="flex justify-between">
								<span class="text-gray-600 dark:text-gray-400">Location:</span>
								<span class="text-gray-900 dark:text-white">{profileData.personal.location}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600 dark:text-gray-400">Current Role:</span>
								<span class="text-gray-900 dark:text-white">{profileData.personal.current_position}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600 dark:text-gray-400">Company:</span>
								<span class="text-gray-900 dark:text-white">{profileData.personal.current_company}</span>
							</div>
						{/if}
					</div>
				</div>

				<!-- Skills Preview -->
				{#if profileData.skills?.technical}
					<div class="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Core Technologies</h3>
						<div class="flex flex-wrap gap-2">
							{#each profileData.skills.technical.slice(0, 6) as skill}
								<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
			Let's Connect
		</h2>
		<p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
			Interested in collaboration or have questions about my work? I'd love to hear from you.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/contact"
				class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
			>
				Get in Touch
			</a>
			<a 
				href="/experience"
				class="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
			>
				View Experience
			</a>
		</div>
	</div>
</section>

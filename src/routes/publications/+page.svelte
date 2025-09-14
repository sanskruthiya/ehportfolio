<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import { loadContent } from '$lib/utils/content';
	import type { PublicationsContent } from '$lib/utils/content';

	let publicationsContent: PublicationsContent = {
		title: 'Publications',
		subtitle: 'Research presentations and publications'
	};

	let publicationsData: any = {};

	onMount(async () => {
		// Load content based on current language
		const content = await loadContent($language, 'content');
		publicationsContent = content.publications || publicationsContent;

		// Load publications data
		const publications = await loadContent($language, 'publications');
		publicationsData = publications;

		// Update content when language changes
		language.subscribe(async (lang) => {
			const content = await loadContent(lang, 'content');
			publicationsContent = content.publications || publicationsContent;
			
			const publications = await loadContent(lang, 'publications');
			publicationsData = publications;
		});
	});

	function getTypeIcon(type: string) {
		switch (type) {
			case 'conference_presentation':
				return 'M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3zM9 3v1h2V3H9zm-4 3v8h10V6H5z';
			case 'technical_report':
				return 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM3 19a1 1 0 100-2 1 1 0 000 2z';
			case 'research_paper':
				return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
			case 'conference_paper':
				return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
			case 'case_study':
				return 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
			case 'dissertation':
				return 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z';
			default:
				return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
		}
	}

	function getTypeLabel(type: string) {
		switch (type) {
			case 'conference_presentation':
				return 'Conference Presentation';
			case 'technical_report':
				return 'Technical Report';
			case 'research_paper':
				return 'Research Paper';
			case 'conference_paper':
				return 'Conference Paper';
			case 'case_study':
				return 'Case Study';
			case 'dissertation':
				return 'Master\'s Thesis';
			default:
				return 'Publication';
		}
	}

	function getTypeColor(type: string) {
		switch (type) {
			case 'conference_presentation':
				return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
			case 'technical_report':
				return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
			case 'research_paper':
				return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
			case 'conference_paper':
				return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
			case 'case_study':
				return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200';
			case 'dissertation':
				return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
			default:
				return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
		}
	}
</script>

<svelte:head>
	<title>Publications - Eita Horishita</title>
	<meta name="description" content="Research presentations and publications" />
</svelte:head>

<div class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Page Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
				{publicationsContent.title}
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				{publicationsContent.subtitle}
			</p>
		</div>

		{#if publicationsData.publications}
			<!-- Featured Publications -->
			<div class="mb-16">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Publications</h2>
				<div class="space-y-8">
					{#each publicationsData.publications.filter(p => p.featured) as publication}
						<div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
							<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
								<div class="flex-1">
									<div class="flex items-start mb-4">
										<div class="flex-shrink-0 mr-4">
											<div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
												<svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getTypeIcon(publication.type)} />
												</svg>
											</div>
										</div>
										<div class="flex-1">
											<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
												{publication.title}
											</h3>
											<div class="flex flex-wrap items-center gap-3 mb-3">
												<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getTypeColor(publication.type)}">
													{getTypeLabel(publication.type)}
												</span>
												<span class="text-sm text-gray-600 dark:text-gray-400">
													{publication.date}
												</span>
											</div>
											<p class="text-blue-600 dark:text-blue-400 font-medium mb-2">
												{publication.venue}
											</p>
											{#if publication.location}
												<p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
													{publication.location}
												</p>
											{/if}
										</div>
									</div>
									
									<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
										{publication.description}
									</p>
									
									<!-- Tags -->
									{#if publication.tags}
										<div class="flex flex-wrap gap-2 mb-4">
											{#each publication.tags as tag}
												<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
													{tag}
												</span>
											{/each}
										</div>
									{/if}
								</div>
								
								<!-- Links -->
								{#if publication.links}
									<div class="lg:ml-6 mt-4 lg:mt-0">
										<div class="flex flex-col space-y-2">
											{#each Object.entries(publication.links) as [key, url]}
												{#if url && url !== '#'}
													<a 
														href={url} 
														target="_blank" 
														rel="noopener noreferrer"
														class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
													>
														{#if key === 'pdf'}
															<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
															</svg>
															PDF
														{:else if key === 'slides'}
															<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
															</svg>
															Slides
														{:else if key === 'video'}
															<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
															</svg>
															Video
														{:else}
															<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
															</svg>
															{key.charAt(0).toUpperCase() + key.slice(1)}
														{/if}
													</a>
												{/if}
											{/each}
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Other Publications -->
			<div>
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Other Publications</h2>
				<div class="grid md:grid-cols-2 gap-6">
					{#each publicationsData.publications.filter(p => !p.featured) as publication}
						<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
							<div class="flex items-start mb-4">
								<div class="flex-shrink-0 mr-3">
									<div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
										<svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getTypeIcon(publication.type)} />
										</svg>
									</div>
								</div>
								<div class="flex-1">
									<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
										{publication.title}
									</h3>
									<div class="flex flex-wrap items-center gap-2 mb-2">
										<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium {getTypeColor(publication.type)}">
											{getTypeLabel(publication.type)}
										</span>
										<span class="text-xs text-gray-600 dark:text-gray-400">
											{publication.date}
										</span>
									</div>
								</div>
							</div>
							
							<p class="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
								{publication.venue}
							</p>
							
							<p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
								{publication.description}
							</p>
							
							<!-- Tags -->
							{#if publication.tags}
								<div class="flex flex-wrap gap-1 mb-4">
									{#each publication.tags.slice(0, 3) as tag}
										<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
											{tag}
										</span>
									{/each}
									{#if publication.tags.length > 3}
										<span class="px-2 py-1 text-gray-500 dark:text-gray-500 text-xs">
											+{publication.tags.length - 3} more
										</span>
									{/if}
								</div>
							{/if}
							
							<!-- Links -->
							{#if publication.links}
								<div class="flex space-x-2">
									{#each Object.entries(publication.links) as [key, url]}
										{#if url && url !== '#'}
											<a 
												href={url} 
												target="_blank" 
												rel="noopener noreferrer"
												class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
											>
												{key.charAt(0).toUpperCase() + key.slice(1)}
											</a>
										{/if}
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Call to Action -->
		<div class="mt-16 text-center">
			<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
				<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
					Research Collaboration
				</h3>
				<p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
					Interested in collaborating on research projects or discussing my work? I'm always open to academic partnerships and knowledge sharing.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a 
						href="/contact"
						class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
					>
						Contact Me
					</a>
					<a 
						href="/experience"
						class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
					>
						View Experience
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

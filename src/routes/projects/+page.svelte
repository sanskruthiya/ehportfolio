<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import { loadContent } from '$lib/utils/content';
	import type { ProjectsContent } from '$lib/utils/content';

	let projectsContent: ProjectsContent = {
		title: 'Projects',
		subtitle: 'Personal projects and open source contributions'
	};

	let projectsData: any = {};

	onMount(async () => {
		// Load content based on current language
		const content = await loadContent($language, 'content');
		projectsContent = content.projects || projectsContent;

		// Load projects data
		const projects = await loadContent($language, 'projects');
		projectsData = projects;

		// Update content when language changes
		language.subscribe(async (lang) => {
			const content = await loadContent(lang, 'content');
			projectsContent = content.projects || projectsContent;

			const projects = await loadContent(lang, 'projects');
			projectsData = projects;
		});
	});
</script>

<svelte:head>
	<title>Projects - Eita Horishita</title>
	<meta name="description" content="Personal projects and open source contributions" />
</svelte:head>

<div class="px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Page Header -->
		<div class="mb-16 text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
				{projectsContent.title}
			</h1>
			<p class="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
				{projectsContent.subtitle}
			</p>
		</div>

		<!-- Featured Projects -->
		{#if projectsData.projects}
			<div class="mb-16">
				<h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
				<div class="mb-12 grid gap-8 md:grid-cols-2">
					{#each projectsData.projects.filter((p) => p.featured) as project}
						<div
							class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
						>
							<!-- Project Image -->
							<div
								class="flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600"
							>
								{#if project.image}
									<img
										src={project.image}
										alt={`${project.title}のスクリーンショット`}
										class="h-full w-full object-cover"
									/>
								{:else}
									<div class="text-center text-white">
										<svg
											class="mx-auto mb-2 h-16 w-16"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
											/>
										</svg>
										<p class="text-sm opacity-75">No Image Available</p>
									</div>
								{/if}
							</div>

							<!-- Project Content -->
							<div class="p-6">
								<div class="mb-3 flex items-start justify-between">
									<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
										{project.title}
									</h3>
									<span
										class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
									>
										{project.year}
									</span>
								</div>

								<p class="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
									{project.description}
								</p>

								<!-- Technologies -->
								<div class="mb-4 flex flex-wrap gap-2">
									{#each project.technologies as tech}
										<span
											class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
										>
											{tech}
										</span>
									{/each}
								</div>

								<!-- Status and Links -->
								<div class="flex items-center justify-between">
									<span
										class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {project.status ===
										'completed'
											? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
											: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}"
									>
										{project.status === 'completed' ? 'Completed' : 'In Progress'}
									</span>

									<div class="flex space-x-3">
										{#if project.links.demo && project.links.demo !== '#'}
											<a
												href={project.links.demo}
												target="_blank"
												rel="noopener noreferrer"
												class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
											>
												Website
											</a>
										{/if}
										{#if project.links.github && project.links.github !== '#'}
											<a
												href={project.links.github}
												target="_blank"
												rel="noopener noreferrer"
												class="text-sm font-medium text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
											>
												GitHub
											</a>
										{/if}
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Call to Action -->
		<div class="mt-16 text-center">
			<div class="rounded-lg bg-blue-50 p-8 dark:bg-blue-900/20">
				<h3 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
					Interested in Collaboration?
				</h3>
				<p class="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-400">
					I'm always open to discussing new projects, creative ideas, or opportunities to be part of
					your visions.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a
						href="/contact"
						class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
					>
						Get in Touch
					</a>
					<a
						href="https://github.com/sanskruthiya"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View GitHub
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

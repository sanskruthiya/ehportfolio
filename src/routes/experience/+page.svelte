<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import { loadContent } from '$lib/utils/content';
	import type { ExperienceContent } from '$lib/utils/content';

	let experienceContent: ExperienceContent = {
		title: 'Experience',
		work_experience: 'Work Experience',
		education: 'Education',
		skills: 'Technical Skills',
		languages: 'Languages',
		certifications: 'Certifications'
	};

	let profileData: any = {};

	onMount(async () => {
		// Load content based on current language
		const content = await loadContent($language, 'content');
		experienceContent = content.experience || experienceContent;

		// Load profile data
		const profile = await loadContent($language, 'profile');
		profileData = profile;

		// Update content when language changes
		language.subscribe(async (lang) => {
			const content = await loadContent(lang, 'content');
			experienceContent = content.experience || experienceContent;
			
			const profile = await loadContent(lang, 'profile');
			profileData = profile;
		});
	});
</script>

<svelte:head>
	<title>Experience - {profileData.personal?.name || 'Eita Horishita'}</title>
	<meta name="description" content="Professional experience and educational background" />
</svelte:head>

<div class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Page Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
				{experienceContent.title}
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				A comprehensive overview of my professional journey, education, and technical expertise.
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-12">
				<!-- Work Experience -->
				<section>
					<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
						<svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
						</svg>
						{experienceContent.work_experience}
					</h2>
					
					{#if profileData.work_experience}
						<div class="space-y-8">
							{#each profileData.work_experience as job}
								<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
									<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
										<div class="flex-1">
											<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
												{job.position}
											</h3>
											<p class="text-lg text-blue-600 dark:text-blue-400 font-medium">
												{job.company}
											</p>
											{#if job.department}
												<p class="text-gray-600 dark:text-gray-400 text-sm">
													{job.department}
												</p>
											{/if}
										</div>
										<div class="mt-2 sm:mt-0 sm:ml-4">
											<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
												{job.period}
											</span>
										</div>
									</div>
									
									<p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
										{job.description}
									</p>
									
									{#if job.skills}
										<div class="flex flex-wrap gap-2">
											{#each job.skills as skill}
												<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
													{skill}
												</span>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</section>

				<!-- Education -->
				<section>
					<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
						<svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
						</svg>
						{experienceContent.education}
					</h2>
					
					{#if profileData.education}
						<div class="space-y-6">
							{#each profileData.education as edu}
								<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
									<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
										<div class="flex-1">
											<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
												{edu.degree}
											</h3>
											<p class="text-lg text-blue-600 dark:text-blue-400 font-medium">
												{edu.institution}
											</p>
											<p class="text-gray-600 dark:text-gray-400 text-sm">
												{edu.location}
											</p>
										</div>
										<div class="mt-2 sm:mt-0 sm:ml-4">
											<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
												{edu.period}
											</span>
										</div>
									</div>
									
									{#if edu.description}
										<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
											{edu.description}
										</p>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</section>
			</div>

			<!-- Sidebar -->
			<div class="space-y-8">
				<!-- Technical Skills -->
				{#if profileData.skills?.technical}
					<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
							<svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
							</svg>
							{experienceContent.skills}
						</h3>
						<div class="flex flex-wrap gap-2">
							{#each profileData.skills.technical as skill}
								<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Languages -->
				{#if profileData.skills?.languages}
					<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
							<svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
							</svg>
							{experienceContent.languages}
						</h3>
						<div class="space-y-4">
							{#each profileData.skills.languages as lang}
								<div>
									<div class="flex justify-between items-center mb-1">
										<span class="text-gray-900 dark:text-white font-medium">{lang.language}</span>
										<span class="text-sm text-gray-600 dark:text-gray-400">{lang.level}</span>
									</div>
									{#if lang.certifications}
										<div class="text-xs text-gray-500 dark:text-gray-500">
											{#each lang.certifications as cert}
												<span class="mr-2">{cert}</span>
											{/each}
										</div>
									{/if}
									{#if lang.experience}
										<p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{lang.experience}</p>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Certifications -->
				{#if profileData.certifications}
					<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
							<svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
							</svg>
							{experienceContent.certifications}
						</h3>
						<div class="space-y-3">
							{#each profileData.certifications as cert}
								<div class="flex justify-between items-center">
									<span class="text-gray-900 dark:text-white text-sm">{cert.name}</span>
									<span class="text-xs text-gray-500 dark:text-gray-500">{cert.date}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Specialties -->
				{#if profileData.skills?.specialties}
					<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
							<svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							Specialties
						</h3>
						<ul class="space-y-2">
							{#each profileData.skills.specialties as specialty}
								<li class="text-gray-700 dark:text-gray-300 text-sm flex items-start">
									<svg class="w-4 h-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
									</svg>
									{specialty}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

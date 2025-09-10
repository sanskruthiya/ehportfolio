<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import { loadContent } from '$lib/utils/content';
	import type { ContactContent } from '$lib/utils/content';

	let contactContent: ContactContent = {
		title: 'Contact',
		subtitle: 'Get in touch with me',
		form: {
			name: 'Name',
			email: 'Email',
			subject: 'Subject',
			message: 'Message',
			send: 'Send Message'
		}
	};

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	let isSubmitting = false;
	let submitMessage = '';

	onMount(async () => {
		// Load content based on current language
		const content = await loadContent($language, 'content');
		contactContent = content.contact || contactContent;

		// Update content when language changes
		language.subscribe(async (lang) => {
			const content = await loadContent(lang, 'content');
			contactContent = content.contact || contactContent;
		});
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		
		// Simulate form submission (replace with actual form service like Formspree)
		try {
			// For now, just show a success message
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitMessage = 'Thank you for your message! I\'ll get back to you soon.';
			
			// Reset form
			formData = {
				name: '',
				email: '',
				subject: '',
				message: ''
			};
		} catch (error) {
			submitMessage = 'Sorry, there was an error sending your message. Please try again.';
		} finally {
			isSubmitting = false;
			// Clear message after 5 seconds
			setTimeout(() => {
				submitMessage = '';
			}, 5000);
		}
	}
</script>

<svelte:head>
	<title>Contact - Eita Horishita</title>
	<meta name="description" content="Get in touch with Eita Horishita" />
</svelte:head>

<div class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto">
		<!-- Page Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
				{contactContent.title}
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				{contactContent.subtitle}
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12">
			<!-- Contact Information -->
			<div class="space-y-8">
				<div>
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
						Let's Connect
					</h2>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
						I'm always interested in discussing new opportunities, collaborations, or simply connecting with fellow professionals in the field of technology and international development.
					</p>
				</div>

				<!-- Contact Methods -->
				<div class="space-y-6">
					<div class="flex items-start">
						<div class="flex-shrink-0">
							<div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
						</div>
						<div class="ml-4">
							<h3 class="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
							<p class="text-gray-600 dark:text-gray-400">
								Feel free to reach out via email for any inquiries or collaboration opportunities.
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="flex-shrink-0">
							<div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								</svg>
							</div>
						</div>
						<div class="ml-4">
							<h3 class="text-lg font-medium text-gray-900 dark:text-white">LinkedIn</h3>
							<p class="text-gray-600 dark:text-gray-400 mb-2">
								Connect with me on LinkedIn for professional networking.
							</p>
							<a 
								href="https://www.linkedin.com/in/eita-horishita-2b8a605a/" 
								target="_blank" 
								rel="noopener noreferrer"
								class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
							>
								View Profile →
							</a>
						</div>
					</div>

					<div class="flex items-start">
						<div class="flex-shrink-0">
							<div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
							</div>
						</div>
						<div class="ml-4">
							<h3 class="text-lg font-medium text-gray-900 dark:text-white">GitHub</h3>
							<p class="text-gray-600 dark:text-gray-400 mb-2">
								Check out my open source projects and contributions.
							</p>
							<a 
								href="https://github.com/sanskruthiya" 
								target="_blank" 
								rel="noopener noreferrer"
								class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
							>
								View Profile →
							</a>
						</div>
					</div>
				</div>

				<!-- Areas of Interest -->
				<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Areas of Interest
					</h3>
					<ul class="space-y-2 text-gray-600 dark:text-gray-400">
						<li class="flex items-center">
							<svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							Technology consulting and analysis
						</li>
						<li class="flex items-center">
							<svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							International development projects
						</li>
						<li class="flex items-center">
							<svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							GIS and spatial data analysis
						</li>
						<li class="flex items-center">
							<svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							Natural language processing
						</li>
						<li class="flex items-center">
							<svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							Research collaboration
						</li>
					</ul>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
					Send a Message
				</h2>
				
				{#if submitMessage}
					<div class="mb-6 p-4 rounded-md {submitMessage.includes('error') ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200' : 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'}">
						{submitMessage}
					</div>
				{/if}

				<form on:submit={handleSubmit} class="space-y-6">
					<div class="grid sm:grid-cols-2 gap-6">
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{contactContent.form.name}
							</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								required
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
								placeholder="Your name"
							/>
						</div>
						
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{contactContent.form.email}
							</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
								placeholder="your.email@example.com"
							/>
						</div>
					</div>
					
					<div>
						<label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{contactContent.form.subject}
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							required
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
							placeholder="What would you like to discuss?"
						/>
					</div>
					
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{contactContent.form.message}
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
							placeholder="Tell me more about your project or inquiry..."
						></textarea>
					</div>
					
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{#if isSubmitting}
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Sending...
						{:else}
							{contactContent.form.send}
						{/if}
					</button>
				</form>
				
				<p class="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
					Note: This is currently a demo form. For actual contact, please use the social links above.
				</p>
			</div>
		</div>
	</div>
</div>

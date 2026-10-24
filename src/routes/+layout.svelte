<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { language } from '$lib/stores/language';
	import { onMount } from 'svelte';

	let { children } = $props();

	const personJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Eita Horishita',
		alternateName: ['堀下 栄太', '堀下栄太', 'Horishita Eita'],
		url: 'https://eitahorishita.com/',
		image: 'https://eitahorishita.com/myprofile/myphoto.webp',
		jobTitle: 'STI Research Specialist',
		worksFor: {
			'@type': 'Organization',
			name: 'VALUENEX Japan',
			url: 'https://www.valuenex.com/'
		},
		memberOf: {
			'@type': 'Organization',
			name: 'OSGeo Japan Chapter (OSGeoJP)',
			url: 'https://www.osgeo.jp/'
		},
		sameAs: [
			'https://github.com/sanskruthiya',
			'https://www.linkedin.com/in/eita-horishita-2b8a605a/'
		],
		knowsAbout: [
			'Geographic Information Systems (GIS)',
			'Natural Language Processing',
			'Science, Technology and Innovation Strategy',
			'Urban Planning',
			'International Development'
		],
		nationality: 'Japan'
	};

	const siteDescription =
		'Portfolio of Eita Horishita (堀下 栄太) — specialist in Science, Technology & Innovation (STI) strategy and GIS applications. Technical research at VALUENEX Japan; Steering Committee Member of OSGeo Japan Chapter.';

	// ダークモードの状態管理
	let isDarkMode = $state(false);

	// ダークモードの切り替え
	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		updateDarkMode();
	}

	// ダークモードの状態を更新
	function updateDarkMode() {
		if (typeof document !== 'undefined') {
			if (isDarkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
			// 設定をlocalStorageに保存
			localStorage.setItem('darkMode', isDarkMode.toString());
		}
	}

	// 初期化処理
	onMount(() => {
		// <html lang> を言語切替に連動
		const unsubscribeLang = language.subscribe((lang) => {
			document.documentElement.lang = lang;
		});

		// ローカルストレージから設定を読み込む
		if (typeof localStorage !== 'undefined') {
			const saved = localStorage.getItem('darkMode');
			if (saved === 'true') {
				isDarkMode = true;
			} else if (saved === null) {
				// 初回アクセス時はシステム設定を確認
				isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
			updateDarkMode();
		}

		// システムのカラースキーム変更を監視
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		darkModeMediaQuery.addEventListener('change', (e) => {
			// ユーザーが手動でテーマを変更していない場合のみシステム設定に追従
			if (!localStorage.getItem('darkMode')) {
				isDarkMode = e.matches;
				updateDarkMode();
			}
		});

		return () => {
			darkModeMediaQuery.removeEventListener('change', () => {});
			unsubscribeLang();
		};
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="author" content="Eita Horishita (堀下 栄太)" />
	<meta
		name="keywords"
		content="Eita Horishita, 堀下栄太, 堀下 栄太, Horishita Eita, GIS, STI, VALUENEX, OSGeoJP"
	/>
	<meta property="og:site_name" content="Eita Horishita Portfolio" />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://eitahorishita.com/" />
	<meta property="og:title" content="Eita Horishita (堀下 栄太) — STI & GIS Specialist" />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:image" content="https://eitahorishita.com/myprofile/myphoto.webp" />
	<meta property="profile:first_name" content="Eita" />
	<meta property="profile:last_name" content="Horishita" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Eita Horishita (堀下 栄太) — STI & GIS Specialist" />
	<meta name="twitter:description" content={siteDescription} />
	<meta name="twitter:image" content="https://eitahorishita.com/myprofile/myphoto.webp" />
	<link rel="canonical" href="https://eitahorishita.com/" />
	{@html `<script type="application/ld+json">${JSON.stringify(personJsonLd)}</script>`}
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
	<Header {isDarkMode} onToggleDarkMode={toggleDarkMode} />
	
	<main class="flex-1">
		{@render children?.()}
	</main>
	
	<Footer />
</div>

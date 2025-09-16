<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

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
		};
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
	<Header {isDarkMode} onToggleDarkMode={toggleDarkMode} />
	
	<main class="flex-1">
		{@render children?.()}
	</main>
	
	<Footer />
</div>

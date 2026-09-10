import { defineClientConfig } from "vuepress/client";
import { onMounted, onUnmounted } from "vue";

export default defineClientConfig({
	setup() {
		const openReadingApp = (event: MouseEvent) => {
			if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

			const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href="/reading/"], a[href="/reading/index.html"]') : null;

			if (!link || (link.target && link.target !== "_self")) return;

			event.preventDefault();
			window.location.assign(new URL("/reading/index.html", window.location.origin));
		};
		const openSearch = (event: KeyboardEvent) => {
			if (event.defaultPrevented || event.altKey || event.shiftKey || !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;

			const searchButton = document.querySelector<HTMLButtonElement>(".slimsearch-button");

			if (searchButton) {
				event.preventDefault();
				searchButton.click();
			}
		};

		onMounted(() => {
			document.addEventListener("click", openReadingApp, true);
			document.addEventListener("keydown", openSearch);
		});
		onUnmounted(() => {
			document.removeEventListener("click", openReadingApp, true);
			document.removeEventListener("keydown", openSearch);
		});
	},
});

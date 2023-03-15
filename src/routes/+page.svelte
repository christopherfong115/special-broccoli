<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-white">Hello Home Page</h1>
{#if data.session}
	<div class="text-white">Hello welcome back {data.session.user.email}</div>
	<form action="/logout" method="POST">
		<button class="bg-amber-400 font-bold text-white p-3" type="submit">Get Out</button>
	</form>
{/if}

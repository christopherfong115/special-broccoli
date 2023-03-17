<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ user, tempdata } = data);
	console.log(tempdata);
</script>

<h1>Find Friends</h1>
<form>
	<input type="text" placeholder="Search friends" />
</form>
<div class="text-white">
	{#each tempdata as piece}
		<div>{piece.datax}</div>
	{/each}
</div>
{#if user}
	<div class="text-white">Current User: {user.email}</div>
{/if}

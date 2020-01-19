<script src="./loading-state.ts" lang="ts"></script>
<style src="./loading-state.scss" lang="scss" scoped></style>

<template>
	<div id="loading-state" class="text-center">
		<v-progress-circular
			:size="150"
			color="primary"
			indeterminate></v-progress-circular>
		<h2>Loading</h2>
		<template v-if="showMessage">
			<p>Hmm... This seems like it is taking forever.</p>
			<p>Maybe refreshing the page and retrying the search could help.</p>
		</template>
	</div>
</template>

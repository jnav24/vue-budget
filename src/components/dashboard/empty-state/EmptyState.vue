<script src="./empty-state.ts" lang="ts"></script>
<style src="./empty-state.scss" lang="scss" scoped></style>

<template>
	<div class="empty-state">
		<v-icon class="empty-icon">hourglass_empty</v-icon>

		<p>{{ text }}</p>

		<v-btn
			@click="emitButtonClick()"
			:disabled="isDisabled"
			class="btn--add">
			<v-icon>add</v-icon>
			<span>{{ buttonText }}</span>
		</v-btn>
	</div>
</template>

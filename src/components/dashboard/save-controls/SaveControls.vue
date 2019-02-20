<script src="./save-controls.ts" lang="ts"></script>
<style src="./save-controls.scss" lang="scss" scoped></style>

<template>
	<div class="save-controls">
		<v-toolbar height="50" class="toolbar">
			<v-layout align-center justify-end>
				<v-btn @click="buttonClicked(false)">Cancel</v-btn>
				<v-btn
					@click="buttonClicked(true)"
					color="success"
					:disabled="!canSave"
					class="save-btn">
					<v-icon class="save-btn__icon">save</v-icon>
					<span class="save-btn__text">Save</span>
				</v-btn>
			</v-layout>
		</v-toolbar>
	</div>
</template>

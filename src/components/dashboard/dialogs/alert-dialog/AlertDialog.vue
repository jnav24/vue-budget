<script src="./alert-dialog.ts" lang="ts"></script>
<style src="./alert-dialog.scss" lang="scss" module></style>

<template>
	<v-dialog
		:class="[$style['alert-dialog'], $style.dialogs]"
		max-width="500px"
		v-model="showDialog">
		<v-card :class="[$style['confirm-card']]">
			<v-card-text>Hello</v-card-text>
		</v-card>
	</v-dialog>
</template>

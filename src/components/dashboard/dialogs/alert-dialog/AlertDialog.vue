<script src="./alert-dialog.ts" lang="ts"></script>
<style src="./alert-dialog.scss" lang="scss" module></style>

<template>
	<v-dialog
		:class="[$style['alert-dialog'], $style.dialogs]"
		max-width="500px"
		v-model="showDialog">
		<v-card :class="[$style[data.type]]">
			<v-card-text>
				<v-layout align-center justify-center>
					<v-icon v-if="data.type === 'success'" :class="[$style['icon-size'], $style['icon-' + data.type]]">check_circle</v-icon>
					<v-icon v-if="data.type === 'danger'" :class="[$style['icon-size'], $style['icon-' + data.type]]">error</v-icon>
					<v-icon v-if="data.type === 'warn'" :class="[$style['icon-size'], $style['icon-' + data.type]]">warning</v-icon>
					<span :class="$style['text-size']">{{ data.text }}</span>
				</v-layout>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

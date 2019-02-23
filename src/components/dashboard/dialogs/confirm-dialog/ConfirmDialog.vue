<script src="./confirm-dialog.ts" lang="ts"></script>
<style src="./confirm-dialog.scss" lang="scss" module></style>

<template>
	<v-dialog
		:class="[$style['confirm-dialog'], $style.dialogs]"
		max-width="500px"
		v-model="showDialog">
		<v-card :class="[$style['confirm-card']]">
			<v-card-text>
				<v-icon v-if="hasIcon()" :class="[$style['confirm-icon'], $style[currentData.icon.color]]">
					{{ currentData.icon.text }}
				</v-icon>
				<v-icon v-if="!hasIcon()" :class="[$style['confirm-icon'], $style['danger']]">error_outline</v-icon>

				<p v-if="hasText()" :class="$style['confirm-text']">{{ currentData.text }}</p>
				<p v-if="!hasText()" :class="$style['confirm-text']">Are you sure?</p>
			</v-card-text>

			<v-card-actions>
				<v-layout justify-center>
					<v-btn
						@click="submitDialog(0)">
						<span v-if="hasButtonCancel()">{{ currentData.button.cancel }}</span>
						<span v-if="!hasButtonCancel()">Cancel</span>
					</v-btn>
					<v-btn
						v-if="hasButtonText()"
						@click="submitDialog(1)"
						:class="[$style['btn-' + currentData.button.color]]"
						dark>
						<span>{{ currentData.button.text }}</span>
					</v-btn>

					<v-btn
						v-if="!hasButtonText()"
						@click="submitDialog(1)"
						:class="[$style['btn-danger']]"
						dark>
						<span>Confirm</span>
					</v-btn>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

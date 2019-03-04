<script src="./confirm-dialog.ts" lang="ts"></script>
<style src="./confirm-dialog.scss" lang="scss" module></style>

<template>
	<v-dialog
		:class="[$style['confirm-dialog'], $style.dialogs]"
		max-width="500px"
		v-model="showDialog">
		<v-card :class="[$style['confirm-card']]">
			<v-card-text>
				<v-icon :class="[$style['confirm-icon'], $style[iconColor]]">{{ iconType }}</v-icon>
				<p :class="$style['confirm-text']">{{ message }}</p>
			</v-card-text>

			<v-card-actions>
				<v-layout justify-center>
					<v-btn
						@click="submitDialog(0)">
						<span>{{ cancelText }}</span>
					</v-btn>

					<v-btn
						@click="submitDialog(1)"
						:class="[$style['btn-' + submitColor]]"
						dark>
						<span>{{ submitText }}</span>
					</v-btn>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

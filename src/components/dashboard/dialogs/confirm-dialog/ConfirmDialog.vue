<script src="./confirm-dialog.ts" lang="ts"></script>
<style src="./confirm-dialog.scss" lang="scss" module></style>

<template>
	<v-dialog
		:class="[$style['confirm-dialog'], $style.dialogs]"
		max-width="500px"
		v-model="showDialog">
		<v-card :class="[$style['confirm-card']]">
			<v-card-text>
				<v-icon :class="$style['warning-icon']">error_outline</v-icon>
				<p :class="$style['confirm-text']">Are you sure?</p>
			</v-card-text>

			<v-card-actions>
				<v-layout justify-center>
					<v-btn
						@click="closeDialog()">Cancel</v-btn>
					<v-btn
						@click="closeDialog()"
						color="danger"
						dark>Confirm</v-btn>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

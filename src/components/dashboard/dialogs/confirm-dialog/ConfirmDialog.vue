<script src="./confirm-dialog.ts" lang="ts"></script>

<template>
	<v-dialog
		class="confirm-dialog dialogs"
		max-width="500px"
		v-model="showDialog">
		<v-card>
			<v-card-text>
				This is a confirmation box
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

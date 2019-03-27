<script src="./edit-vehicle-dialog.ts" lang="ts"></script>
<style src="./edit-vehicle-dialog.scss" lang="scss" scoped></style>

<template>
	<v-dialog
		class="dialogs edit-vehicle"
		max-width="500px"
		v-model="showDialog">
		<v-card>
			<v-card-text>
				Edit your vehicle
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

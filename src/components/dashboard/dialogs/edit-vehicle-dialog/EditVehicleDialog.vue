<script src="./edit-vehicle-dialog.ts" lang="ts"></script>
<style src="./edit-vehicle-dialog.scss" lang="scss" scoped></style>

<template>
	<v-dialog
		class="dialogs edit-vehicle"
		max-width="500px"
		v-model="showDialog">
		<v-card>
			<v-card-title class="dialog--title">Edit Vehicle</v-card-title>

			<v-card-text>
				<EditVehicleForm></EditVehicleForm>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

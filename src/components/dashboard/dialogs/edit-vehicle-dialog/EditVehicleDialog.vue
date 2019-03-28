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
				<EditVehicleForm
					v-if="showDialog"
					:data="currentData"
					@updateData="emitVehicleData($event)"></EditVehicleForm>
			</v-card-text>

			<v-card-actions>
				<v-layout justify-end>
					<v-btn>Cancel</v-btn>
					<v-btn
						:disabled="!formValid"
						color="success">Update Vehicle</v-btn>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

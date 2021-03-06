<script src="./user-profile.ts" lang="ts"></script>
<style src="./user-profile.scss" lang="scss" scoped></style>

<template>
	<div class="profile user-profile">
		<ConfirmDialog
			:dialog="deleteVehicleDialog"
			:submit-text="deleteVehicle.submitText"
			:message="deleteVehicle.message"
			@updateData="emitDeleteVehicle($event)"
			@updateDialog="updateDeleteVehicleDialog($event)"></ConfirmDialog>

		<EditVehicleDialog
			:data="selectedVehicle"
			:dialog="editVehicleDialog"
			@updateData="updateVehicleData($event)"
			@updateDialog="updateEditVehicleDialog($event)"></EditVehicleDialog>

		<v-alert
			:value="alert.display"
			transition="slide-y-transition"
			:type="alert.type">
			{{ alert.msg }}
		</v-alert>

		<h3 class="header__h3 mt20">Basic Details</h3>

		<v-form v-model="profileValid">
			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						@input="profileChanged = true"
						:rules="form.first_name.rules"
						v-model="form.first_name.value"
						label="First Name"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg5 xl5>
					<v-text-field
						@input="profileChanged = true"
						:rules="form.last_name.rules"
						v-model="form.last_name.value"
						label="Last Name"></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						disabled
						:rules="form.email.rules"
						v-model="form.email.value"
						label="Email"></v-text-field>
				</v-flex>
			</v-layout>
		</v-form>

		<v-divider style="margin: 30px 0;"></v-divider>

		<h2 class="header__h3">Vehicles</h2>

		<v-layout>
			<v-flex sm5 md5 lg5 xl5 class="vehicle-form">
				<EditVehicleForm
					:data="vehicleData"
					:reset="resetVehicle"
					@updateData="emitVehicleData($event)"></EditVehicleForm>

				<v-btn
					:disabled="!vehicleValid"
					@click="addVehicle()"
					color="success">Add Vehicle</v-btn>
			</v-flex>

			<v-spacer></v-spacer>

			<v-flex sm6 md6 lg6 xl6 class="vehicle-list">
				<div v-if="!vehicles.length" class="vehicle-list__empty">
					<v-icon class="empty-icon">hourglass_empty</v-icon>
					<p>You have no vehicles saved. Add some vehicles on the left.</p>
				</div>

				<div v-if="vehicles.length">
					<v-list>
						<div v-for="(item, index) in vehicles" :key="item.id" v-if="item.active">
							<v-list-tile>
								<v-list-tile-content>
									<v-list-tile-title>{{item.year }} {{ item.make }} {{ item.model }}</v-list-tile-title>
								</v-list-tile-content>

								<v-list-tile-action>
									<v-layout>
										<v-btn
											fab
											@click="showEditVehicleDialog(item)"
											class="btn--details__icon">
											<v-icon>edit</v-icon>
										</v-btn>
										<v-btn
											fab
											@click="showDeleteVehicleDialog(item)"
											class="btn--details__icon">
											<v-icon>delete</v-icon>
										</v-btn>
									</v-layout>
								</v-list-tile-action>
							</v-list-tile>

							<v-divider
								v-if="index + 1 < vehicles.length"
								:key="index"
							></v-divider>
						</div>
					</v-list>
				</div>
			</v-flex>
		</v-layout>

		<div class="actions">
			<v-btn
				:disabled="(!profileValid || !profileChanged) && !vehicleChanged"
				@click="submit()"
				color="success">Save</v-btn>
		</div>
	</div>
</template>

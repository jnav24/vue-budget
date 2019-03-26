<script src="./user-profile.ts" lang="ts"></script>
<style src="./user-profile.scss" lang="scss" scoped></style>

<template>
	<div class="profile user-profile">
		<h3 class="header__h3 mt20">Basic Details</h3>

		<v-layout>
			<v-flex lg5 xl5>
				<v-text-field
					v-model="form.first_name.value"
					label="First Name"></v-text-field>
			</v-flex>

			<v-spacer></v-spacer>

			<v-flex lg5 xl5>
				<v-text-field
					v-model="form.last_name.value"
					label="Last Name"></v-text-field>
			</v-flex>
		</v-layout>

		<v-layout>
			<v-flex lg5 xl5>
				<v-text-field
					disabled
					v-model="form.email.value"
					label="Email"></v-text-field>
			</v-flex>
		</v-layout>

		<v-divider style="margin: 30px 0;"></v-divider>

		<h2 class="header__h3">Vehicles</h2>

		<v-layout>
			<v-flex sm5 md5 lg5 xl5 class="vehicle-form">
				<v-layout>
					<v-flex>
						<v-text-field
							v-model="form.make.value"
							label="Make"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex>
						<v-text-field
							v-model="form.model.value"
							label="Model"></v-text-field>
					</v-flex>
				</v-layout>

				<v-layout>
					<v-flex sm3 md3 lg3 xl3>
						<v-text-field
							v-model="form.color.value"
							label="Color"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex sm3 md3 lg3 xl3>
						<v-text-field
							v-model="form.year.value"
							label="Year"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex>
						<v-text-field
							label="License Plate Number"></v-text-field>
					</v-flex>
				</v-layout>

				<v-btn
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
						<v-list-tile v-for="(item, index) in vehicles" :key="item.id">
							<v-list-tile-content>
								<v-list-tile-title>{{ item.make }} {{ item.model }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</div>
			</v-flex>
		</v-layout>

		<div class="actions">
			<v-btn
				color="success">Save</v-btn>
		</div>
	</div>
</template>

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
							label="Make"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex>
						<v-text-field
							label="Model"></v-text-field>
					</v-flex>
				</v-layout>

				<v-layout>
					<v-flex sm3 md3 lg3 xl3>
						<v-text-field
							label="Color"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex sm3 md3 lg3 xl3>
						<v-text-field
							label="Year"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex>
						<v-text-field
							label="License Plate Number"></v-text-field>
					</v-flex>
				</v-layout>

				<v-btn
					color="success">Add Vehicle</v-btn>
			</v-flex>

			<v-spacer></v-spacer>

			<v-flex sm6 md6 lg6 xl6 class="vehicle-list">
				<div class="vehicle-list__empty">
					<v-icon class="empty-icon">hourglass_empty</v-icon>
					<p>You have no vehicles saved. Add some vehicles on the left.</p>
				</div>
			</v-flex>
		</v-layout>

		<div class="actions">
			<v-btn
				color="success">Save</v-btn>
		</div>
	</div>
</template>

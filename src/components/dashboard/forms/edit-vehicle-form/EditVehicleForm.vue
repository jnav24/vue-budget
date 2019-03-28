<script src="./edit-vehicle-form.ts" lang="ts"></script>
<style src="./edit-vehicle-form.scss" lang="scss" scoped></style>

<template>
	<v-form v-model="vehicleValid" ref="vehicleForm">
		<v-layout>
			<v-flex>
				<v-text-field
					@input="updateFormData()"
					:rules="form.make.rules"
					v-model="form.make.value"
					label="Make"></v-text-field>
			</v-flex>

			<v-spacer></v-spacer>

			<v-flex>
				<v-text-field
					:rules="form.model.rules"
					v-model="form.model.value"
					label="Model"></v-text-field>
			</v-flex>
		</v-layout>

		<v-layout>
			<v-flex sm3 md3 lg3 xl3>
				<v-text-field
					:rules="form.color.rules"
					v-model="form.color.value"
					label="Color"></v-text-field>
			</v-flex>

			<v-spacer></v-spacer>

			<v-flex sm3 md3 lg3 xl3>
				<v-text-field
					:rules="form.year.rules"
					v-model="form.year.value"
					label="Year"></v-text-field>
			</v-flex>

			<v-spacer></v-spacer>

			<v-flex>
				<v-text-field
					:rules="form.license.rules"
					v-model="form.license.value"
					label="License Plate Number"></v-text-field>
			</v-flex>
		</v-layout>
	</v-form>
</template>

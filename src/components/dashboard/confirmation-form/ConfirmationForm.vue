<script src="./confirmation-form.ts" lang="ts"></script>
<style src="./confirmation-form.scss" lang="scss" scoped></style>

<template>
	<v-layout class="pay-info">
		<v-flex lg6 xl6>
			<v-text-field
				@input="updateData()"
				v-model="form.confirmation.value"
				label="Confirmation Number"></v-text-field>
		</v-flex>

		<v-spacer></v-spacer>

		<v-flex>
			<v-menu
				:close-on-content-click="false"
				v-model="menu"
				:nudge-right="40"
				lazy
				transition="scale-transition"
				offset-y
				full-width
				min-width="290px">
				<v-text-field
					slot="activator"
					v-model="form.paid.value"
					label="Select Paid Date"
					prepend-icon="event"
					readonly
				></v-text-field>
				<v-date-picker
					no-title
					v-model="form.paid.value"
					@input="menu = false; updateData()"></v-date-picker>
			</v-menu>
		</v-flex>
	</v-layout>
</template>

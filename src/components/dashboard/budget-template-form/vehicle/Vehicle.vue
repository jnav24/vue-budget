<script src="./vehicle.ts" lang="ts"></script>
<style src="./vehicle.scss" lang="scss" scoped></style>

<template>
	<div class="vehicle budget-template">
		<BudgetTemplateComponent
			:edit-mode="editMode"
			:reset="resetForm"
			@buttonClicked="validateForm($event)">
			<v-layout>
				<v-flex lg3 xl3>
					<v-text-field
						label="Make"
						v-model="form.make.value"
						:rules="form.make.rules"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg3 xl3>
					<v-text-field
						label="Model"
						v-model="form.model.value"
						:rules="form.model.rules"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg3 xl3>
					<v-text-field
						label="Year"
						v-model="form.year.value"
						:rules="form.year.rules"></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg5 xl5>
					<v-select
						v-model="form.type.value"
						:rules="form.type.rules"
						:items="types"
						item-value="id"
						item-text="name"
						label="Account type"></v-select>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg6 xl6>
					<v-select
						v-model="form.due.value"
						:rules="form.due.rules"
						:items="dates"
						label="Due Date"></v-select>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						v-model="form.mileage.value"
						:rules="form.mileage.rules"
						label="Mileage"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg6 xl6>
					<v-text-field
						v-model="form.amount.value"
						:rules="form.amount.rules"
						label="Amount"></v-text-field>
				</v-flex>
			</v-layout>

			<ConfirmationForm
				v-if="showPaidForm"
				:data="form"
				@updateFormData="updateForm($event)"></ConfirmationForm>
		</BudgetTemplateComponent>
	</div>
</template>

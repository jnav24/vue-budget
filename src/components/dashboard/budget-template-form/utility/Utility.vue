<script src="./utility.ts" lang="ts"></script>
<style src="./utility.scss" lang="scss" scoped></style>

<template>
	<div class="budget-template utility">
		<BudgetTemplateComponent
			:edit-mode="editMode"
			:reset="resetForm"
			@buttonClicked="validateForm($event)">
			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						v-model="form.name.value"
						:rules="form.name.rules"
						label="Name"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg6 xl6>
					<v-text-field
						v-model="form.amount.value"
						:rules="form.amount.rules"
						label="Amount"></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg5 xl5>
					<v-select
						v-model="form.type.value"
						:rules="form.type.rules"
						:items="types"
						item-value="value"
						item-text="label"
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
		</BudgetTemplateComponent>
	</div>
</template>

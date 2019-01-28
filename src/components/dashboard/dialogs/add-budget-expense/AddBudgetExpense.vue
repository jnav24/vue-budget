<script src="./add-budget-expense.ts" lang="ts"></script>
<style src="./add-budget-expense.scss" lang="scss" scoped></style>

<template>
	<v-dialog
		class="dialog add-expense"
		v-model="showDialog"
		max-width="800px">
		<v-card>
			<v-card-title class="dialog--title">Add Expense to Budget</v-card-title>

			<v-card-text>
				<v-form ref="expenseForm" v-model="expenseValid">
					<v-select
						v-model="form.type.value"
						:rules="form.type.rules"
						:items="billTypes"
						item-value="id"
						item-text="name"
						label="Select Expense Type"></v-select>

					<CreditCard></CreditCard>
				</v-form>
			</v-card-text>

			<v-card-actions style="padding-bottom: 15px;">
				<v-layout justify-end>
					<v-btn
						@click="closeDialog()">Cancel</v-btn>

					<v-btn
						color="secondary"
						:disabled="!expenseValid"
						@click="submit()">Add Expense</v-btn>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

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
						@change="updateSelectedType()"
						v-model="form.type.value"
						:rules="form.type.rules"
						:items="billTypes"
						item-value="id"
						item-text="name"
						label="Select Expense Type"></v-select>

					<Bank
						v-if="showTypeForm('bank')"
						@submitForm="closeDialog()"></Bank>
					<CreditCard
						v-if="showTypeForm('credit_card')"
						@submitForm="closeDialog()"></CreditCard>
					<Investment
						v-if="showTypeForm('investment')"
						@submitForm="closeDialog()"></Investment>
					<Medical
						v-if="showTypeForm('medical')"
						@submitForm="closeDialog()"></Medical>
					<Misc
						v-if="showTypeForm('miscellaneous')"
						@submitForm="closeDialog()"></Misc>
					<Utility
						v-if="showTypeForm('utility')"
						@submitForm="closeDialog()"></Utility>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

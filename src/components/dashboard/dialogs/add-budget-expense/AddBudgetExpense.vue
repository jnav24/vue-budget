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
						:data="currentData"
						:dialog="showDialog"
						@submitForm="closeDialog()"></Bank>
					<CreditCard
						v-if="showTypeForm('credit_card')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="closeDialog()"></CreditCard>
					<Investment
						v-if="showTypeForm('investment')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="closeDialog()"></Investment>
					<Medical
						v-if="showTypeForm('medical')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="closeDialog()"></Medical>
					<Misc
						v-if="showTypeForm('miscellaneous')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="closeDialog()"></Misc>
					<Utility
						v-if="showTypeForm('utility')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="closeDialog()"></Utility>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

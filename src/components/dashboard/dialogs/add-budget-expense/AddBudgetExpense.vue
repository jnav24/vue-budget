<script src="./add-budget-expense.ts" lang="ts"></script>
<style src="./add-budget-expense.scss" lang="scss" scoped></style>

<template>
	<v-dialog
		class="dialog add-expense"
		v-model="showDialog"
		max-width="800px">
		<v-card>
			<v-card-title class="dialog--title">
				<span v-if="!editMode">Add Expense to Budget</span>
				<span v-if="editMode">Update Expense</span>
			</v-card-title>

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
						v-if="showTypeForm('banks')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="submitAndCloseDialog($event)"></Bank>
					<CreditCard
						v-if="showTypeForm('credit_cards')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="submitAndCloseDialog($event)"></CreditCard>
					<Investment
						v-if="showTypeForm('investments')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="submitAndCloseDialog($event)"></Investment>
					<Job
						v-if="showTypeForm('jobs')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="submitAndCloseDialog($event)"></Job>
					<Medical
						v-if="showTypeForm('medical')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="submitAndCloseDialog($event)"></Medical>
					<Misc
						v-if="showTypeForm('miscellaneous')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="submitAndCloseDialog($event)"></Misc>
					<Utility
						v-if="showTypeForm('utilities')"
						:data="currentData"
						:dialog="showDialog"
						@submitForm="submitAndCloseDialog($event)"></Utility>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script src="./template.ts" lang="ts"></script>
<style src="./template.scss" lang="scss" scoped></style>

<template>
	<div class="page template">
		<SaveControls
			:canSave="canSaveTemplates"
			@buttonClicked="saveControls($event)"></SaveControls>

		<AlertDialog
			:data="alertData"
			:dialog="alertDialog"
			@updateDialog="emitAlertDialog($event)"></AlertDialog>

		<AddBudgetExpense
			:dialog="expenseDialog"
			:type="expenseType"
			:data="expenseData"
			:showPaidForm="showPaidForm"
			@submitBudget="updateExpenses($event)"
			@updateDialog="closeEditBudgetDialog($event)"></AddBudgetExpense>

		<v-layout justify-center>
			<v-flex lg8 xl6>
				<v-layout align-center style="margin-bottom: 5rem;">
					<v-flex lg7 xl7>
						<h1 class="header__h1">Budget Template</h1>
						<p>Add all your monthly expenses here! Whenever you create a new budget, the expenses here will automatically show in your new monthly budget. The idea is to not to manually enter the same info more than once.</p>
						<p>All you have to do is click on the 'Add Expense' button, select the type of expense, enter the details and save your changes.</p>
						<p>If you were to delete an item on this page, all already existing budgets will be unaffected.</p>
					</v-flex>

					<v-flex>
						<v-layout justify-end>
							<v-btn
								@click="expenseDialog = true"
								color="success">
								<v-icon class="prepend-icon">add</v-icon>
								<span>Expense</span>
							</v-btn>
						</v-layout>
					</v-flex>
				</v-layout>

				<EmptyState
					v-if="isTemplateEmpty()"
					text="You haven't set up your template set. Click the add button below to get started."
					button-text="Template"
					@buttonClicked="expenseDialog = true"></EmptyState>

				<div v-if="typeof expenses !== 'undefined'">
					<BudgetTemplate
						v-for="(templateKey, index) in Object.keys(expenses)"
						v-show="expenses[templateKey].length"
						:key="index"
						:type="templateKey"
						:name="getTemplateName(templateKey)"
						:headers="getTemplateHeaders(templateKey)"
						:data="getTemplateList(templateKey)"
						@emitRemoveBudget="openAlertDialog($event)"
						@emitEditBudget="openEditBudgetDialog($event)"></BudgetTemplate>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script src="./template.ts" lang="ts"></script>
<style src="./template.scss" lang="scss" scoped></style>

<template>
	<div class="page template">
		<AddBudgetExpense
			:dialog="expenseDialog"
			@updateDialog="expenseDialog = $event"></AddBudgetExpense>

		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex lg7 xl7>
						<h1 class="header__h1">Budget Template</h1>
						<p>You can add all your bank, credit cards and other monthly expenses, you would like to track on this page. Everything entered on this page, will show when you add a new monthly budget.</p>
						<p>If you were to delete an item, it will still show on your already existing budgets but it will not show on new budgets.</p>
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
					v-if="!Object.keys(budget.budgetTemplate).length"
					text="You haven't set up your template set. Click the add button below to get started."
					button-text="Template"
					@buttonClicked="expenseDialog = true"></EmptyState>

				<BudgetTemplate
					v-for="(templateKey, index) in Object.keys(budget.budgetTemplate)"
					:key="index"
					:type="templateKey"
					:name="getTemplateName(templateKey)"
					:headers="getTemplateHeaders(templateKey)"
					:data="getTemplateList(templateKey)"></BudgetTemplate>
			</v-flex>
		</v-layout>
	</div>
</template>

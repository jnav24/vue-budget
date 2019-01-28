<script src="./template.ts" lang="ts"></script>
<style src="./template.scss" lang="scss" scoped></style>

<template>
	<div class="page budget-template">
		<AddBudgetExpense
			:dialog="expenseDialog"
			@updateDialog="expenseDialog = $event"></AddBudgetExpense>

		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex>
						<h1 class="header__h1">Budget Template</h1>
						<p>You can add all your bank, credit cards and other monthly expenses, you would like to track on this page. Everything entered on this page, will show when you add a new monthly budget.</p>
						<p>If you were to delete an item, it will still show on your already existing budgets but it will not show on new budgets.</p>
					</v-flex>
				</v-layout>

				<EmptyState
					v-if="!Object.keys(budget.budgetTemplate).length"
					text="You haven't set up your template set. Click the add button below to get started."
					button-text="Template"
					@buttonClicked="expenseDialog = true"></EmptyState>

				<v-card>
					<v-card-title>
						<div>
							<h3>Bank</h3>
							<ul>
								<li>id</li>
								<li>user_id</li>
								<li>name</li>
								<li>amount</li>
								<li>type; checking, savings</li>
							</ul>

							<h3>Credit Cards</h3>
							<ul>
								<li>id</li>
								<li>user_id</li>
								<li>name</li>
								<li>limit</li>
								<li>apr</li>
								<li>last 4</li>
								<li>exp month</li>
								<li>exp year</li>
								<li>due date</li>
								<li>type; master, visa, etc</li>
							</ul>

							<h3>Investments</h3>
							<ul>
								<li>id</li>
								<li>user_id</li>
								<li>name</li>
								<li>amount</li>
								<li>type; stocks, crypto, 401k, ira</li>
							</ul>

							<h3>Medical</h3>
							<ul>
								<li>id</li>
								<li>user_id</li>
								<li>name</li>
								<li>amount</li>
								<li>due date</li>
							</ul>

							<h3>Miscellaneous</h3>
							<ul>
								<li>id</li>
								<li>user_id</li>
								<li>name</li>
								<li>amount</li>
								<li>due date</li>
							</ul>

							<h3>Utility</h3>
							<ul>
								<li>id</li>
								<li>user_id</li>
								<li>name</li>
								<li>amount</li>
								<li>type; electric, gas, etc</li>
								<li>due date</li>
							</ul>
						</div>
					</v-card-title>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

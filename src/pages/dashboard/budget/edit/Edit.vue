<script src="./edit.ts" lang="ts"></script>
<style src="./edit.scss" lang="scss" scoped></style>

<template>
	<div class="budget-edit page">
		<AddBudgetExpense
			:dialog="expenseDialog"
			:type="expenseType"
			:data="expenseData"
			:cycle="expenseCycle"
			:showPaidForm="showPaidForm"
			@submitBudget="saveLocalBudgetState($event)"
			@updateDialog="closeEditBudgetDialog($event)"></AddBudgetExpense>

		<SaveControls
			:canSave="canSaveBudget"
			@buttonClicked="saveControls($event)"></SaveControls>

		<ConfirmDialog
			:submit-text="confirmSubmitText"
			:message="confirmMessage"
			:dialog="confirmCancelDialog"
			@updateDialog="emitConfirmCancelDialog($event)"
			@updateData="emitConfirmCancelData($event)"></ConfirmDialog>

		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-alert
					:value="alert.display"
					transition="slide-y-transition"
					:type="alert.type">
					{{ alert.msg }}
				</v-alert>

				<EmptyState
					v-if="!Object.keys(budget).length"
					title="This budget is empty"
					text="Click on the button below to add an expense"
					button-text="Expense"
					@buttonClicked="expenseDialog = true"
				></EmptyState>

				<v-layout align-center>
					<v-flex>
						<h1 class="header__h1">Budget: {{ budget.name }}</h1>
						<p class="cycle-title">{{ formatCycle(budget.budget_cycle) }}</p>
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

				<v-layout>
					<v-flex lg3 xl3 class="sidebar">
						<Totals
							:total-amount="totalEarned"
							total-title="Earned"></Totals>

						<Totals
							amount-color="danger"
							:total-amount="totalSpent"
							total-title="Spent"
							:trending="false"></Totals>

						<Totals
							:dynamic-background="true"
							:total-amount="totalSavings"
							:total-title="totalSavings < 1 ? 'Lost' : 'Saved'"></Totals>

						<v-divider style="margin: 30px 0;"></v-divider>

						<Totals
							:total-amount="totalInBanks"
							total-title="in Banks"></Totals>

						<Totals
							:total-amount="totalInvestments"
							total-title="Investments"></Totals>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex lg8 xl8>
						<v-card>
							<v-card-title>
								<div v-if="isLoading">Loading...</div>
								<v-tabs
									v-if="!isLoading"
									style="width: 100%;"
									slider-color="success"
									v-model="activeTab">
									<v-tab
										v-for="(expense, name) in budget.expenses"
										v-if="expense.length"
										:key="name"
										active-class="active-tab">{{ setTabName(name) }}</v-tab>

									<v-tab-item
										style="width: 100%;"
										v-for="(expense, name) in budget.expenses"
										:key="name"
										v-if="expense.length">
										<component
											:is="getComponentName(name)"
											:cycle="budget.budget_cycle"
											:data="expense"
											@openEditBudget="openEditBudgetDialog($event)"></component>
									</v-tab-item>
								</v-tabs>
							</v-card-title>
						</v-card>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

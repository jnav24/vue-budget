<script src="./edit.ts" lang="ts"></script>
<style src="./edit.scss" lang="scss" scoped></style>

<template>
	<div class="budget-edit page">
		<AddBudgetExpense
			:dialog="expenseDialog"
			:type="expenseType"
			:data="expenseData"
			:showPaidForm="showPaidForm"
			@submitBudget="saveLocalBudgetState($event)"
			@updateDialog="closeEditBudgetDialog($event)"></AddBudgetExpense>

		<SaveControls
			:canSave="canSaveBudget"
			@buttonClicked="saveControls($event)"></SaveControls>

		<ConfirmDialog
			:data="confirmCancelData"
			:dialog="confirmCancelDialog"
			@updateDialog="emitConfirmCancelDialog($event)"
			@updateData="emitConfirmCancelData($event)"></ConfirmDialog>

		<v-layout justify-center>
			<v-flex lg8 xl8>
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

				<!--<pre>{{ budget }}</pre>-->

				<v-layout>
					<v-flex lg3 xl3 class="sidebar">
						<v-card>
							<v-card-title>
								<div>
									<p class="amount-text">Total Earned <v-icon color="success">trending_up</v-icon></p>
									<p class="amount amount-success">{{ formatDollar(this.totalEarned) }}</p>
								</div>
							</v-card-title>
						</v-card>

						<v-card>
							<v-card-title>
								<div>
									<p class="amount-text">Total Spent <v-icon color="danger">trending_down</v-icon></p>
									<p class="amount amount-danger">{{ formatDollar(this.totalSpent) }}</p>
								</div>
							</v-card-title>
						</v-card>

						<v-card>
							<v-card-title>
								<div>
									<p class="amount-text">Total Savings <v-icon color="success">trending_up</v-icon></p>
									<p class="amount amount-danger" v-if="this.totalSavings < 1">{{ formatDollar(this.totalSavings) }}</p>
									<p class="amount amount-success" v-if="this.totalSavings > 1">{{ formatDollar(this.totalSavings) }}</p>
								</div>
							</v-card-title>
						</v-card>
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

<script src="./edit.ts" lang="ts"></script>
<style src="./edit.scss" lang="scss" scoped></style>

<template>
	<div class="budget-edit page">
		<v-toolbar height="50" style="background: #474747; position: absolute; top: 0px; left: 0;">
			<v-layout align-center justify-end>
				<v-btn :to="{ name: 'budget-list' }">Cancel</v-btn>
				<v-btn
					color="success"
					:disabled="!canSaveBudget"
					style="color: #fff;">
					<v-icon>save</v-icon>
					<span style="display: inline-block; margin-left: 7px;">Save</span>
				</v-btn>
			</v-layout>
		</v-toolbar>

		<v-layout justify-center>
			<v-flex lg8 xl8>
				<h1 class="header__h1">Budget: {{ budget.name }}</h1>
				<p class="cycle-title">{{ formatCycle(budget.budget_cycle) }}</p>

				<!--<pre>{{ budget }}</pre>-->

				<v-layout>
					<v-flex lg3 xl3 class="sidebar">
						<v-card>
							<v-card-title>
								<div>
									<p class="amount-text">Total Earned <v-icon color="success">trending_up</v-icon></p>
									<p class="amount amount-success">{{ formatDollar('12346579.129') }}</p>
								</div>
							</v-card-title>
						</v-card>

						<v-card>
							<v-card-title>
								<div>
									<p class="amount-text">Total Spent <v-icon color="danger">trending_down</v-icon></p>
									<p class="amount amount-danger">{{ formatDollar('46579.129') }}</p>
								</div>
							</v-card-title>
						</v-card>

						<v-card>
							<v-card-title>
								<div>
									<p class="amount-text">Total Savings <v-icon color="success">trending_up</v-icon></p>
									<p class="amount amount-success">{{ formatDollar('46579.129') }}</p>
								</div>
							</v-card-title>
						</v-card>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex lg7 xl7>
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
											:data="expense"></component>
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

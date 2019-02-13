<script src="./edit.ts" lang="ts"></script>
<style src="./edit.scss" lang="scss" scoped></style>

<template>
	<div class="budget-edit page">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<h1 class="header__h1">Budget: {{ budget.name }}</h1>
				<p class="cycle-title">{{ formatCycle(budget.budget_cycle) }}</p>

				<!--<pre>{{ budget }}</pre>-->

				<v-layout>
					<v-flex lg3 xl3 class="sidebar">
						<v-card>
							<v-card-title>12356.78</v-card-title>
						</v-card>

						<v-card>
							<v-card-title>12356.78</v-card-title>
						</v-card>

						<v-card>
							<v-card-title>12356.78</v-card-title>
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
										active-class="active-tab">{{ name }}</v-tab>

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

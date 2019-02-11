<script src="./edit.ts" lang="ts"></script>
<style src="./edit.scss" lang="scss" scoped></style>

<template>
	<div class="budget-edit page">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<h1 class="header__h1">Budget Edit</h1>
				<pre>{{ budget }}</pre>

				<v-card>
					<v-card-title>
						<div v-if="isLoading">Loading...</div>
						<v-tabs
							v-if="!isLoading"
							fixed-tabs
							slider-color="success"
							v-model="activeTab">
							<v-tab
								v-for="(expense, name) in budget.expenses"
								v-if="expense.length"
								:key="name"
								active-class="active-tab">{{ name }}</v-tab>

							<v-tab-item
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
	</div>
</template>

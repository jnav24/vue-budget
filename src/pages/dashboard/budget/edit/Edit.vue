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
						<!--<pre>{{ $route.params.id }}</pre>-->
						<v-tabs
							fixed-tabs
							slider-color="success"
							v-model="activeTab">
							<!--<v-tab-->
								<!--v-for="(expense, index) in expenses"-->
								<!--:key="expense.id"-->
								<!--active-class="active-tab">Hello</v-tab>-->
						</v-tabs>
					</v-card-title>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script src="./list.ts" lang="ts"></script>
<style src="./list.scss" lang="scss" scoped></style>

<template>
	<div class="page budget">
		<AlertDialog
			:data="alertData"
			:dialog="alertDialog"
			@updateDialog="emitAlertDialog($event)"></AlertDialog>

		<ConfirmDialog
			:message="confirmMessage"
			:dialog="confirmDialog"
			@updateDialog="emitConfirmDialog($event)"
			@updateData="emitConfirmData($event)"></ConfirmDialog>

		<AddBudgetDialog
			:dialog="addBudgetDialog"
			@updateDialog="emitAddBudgetDialog($event)"></AddBudgetDialog>

		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex>
						<h1 class="header__h1">Budget</h1>
						<p>List of monthly budget. Add, update, or remove budgets and you can go to the budget template on this page.</p>
					</v-flex>

					<v-flex>
						<v-layout justify-end>
							<v-btn
								:disabled="canAddBudget()"
								@click="addBudgetDialog = true"
								color="success">
								<v-icon class="prepend-icon">add</v-icon>
								<span>Budget</span>
							</v-btn>

							<router-link
								tag="v-btn"
								class="v-btn secondary"
								:to="{ name: 'budget-template'}"
								exact>
								<v-icon class="prepend-icon">edit</v-icon>
								<span>Template</span>
							</router-link>
						</v-layout>
					</v-flex>
				</v-layout>

				<EmptyState
					v-if="!tableItems.length && !canAddBudget()"
					text="You have no monthly budgets. Click on the button below to add one."
					button-text="Budget"
					:disableButton="canAddBudget()"
					@buttonClicked="addBudgetDialog = true"></EmptyState>

				<EmptyState
					v-if="canAddBudget()"
					text="You have not set up your monthly templates yet. Adding a template for your reoccurring bills makes it easier to manage your budget and it is easy to setup. Click on the button below to add one."
					button-text="Template"
					@buttonClicked="goToBudgetTemplate()"></EmptyState>

				<v-card v-if="tableItems.length">
					<v-card-title>
						<v-text-field
							label="Search"
							prepend-icon="search"
							v-model="search"
							single-line></v-text-field>
					</v-card-title>

					<v-card-text>
						<v-data-table
							:search="search"
							:rows-per-page-items="tableInfo.rowsPerPageItems"
							:items="tableItems"
							:headers="tableHeaders">
							<template slot="items" slot-scope="props">
								<td class="text-xs-center">{{ props.item.name }}</td>
								<td class="text-xs-center">{{ formatBudget(props.item.budget_cycle)}}</td>
								<td class="text-xs-center">
									<router-link
										slot="activator"
										tag="v-btn"
										class="btn--details__icon v-btn v-btn--floating v-btn--small"
										:to="{ name: 'budget-edit', params: { id: props.item.id } }"
										exact>
										<v-icon>edit</v-icon>
									</router-link>

									<v-btn
										fab
										small
										@click="deleteBudget(props.item.id)"
										class="btn--details__icon">
										<v-icon>delete</v-icon>
									</v-btn>
								</td>
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

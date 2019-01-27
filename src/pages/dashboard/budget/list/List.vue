<script src="./list.ts" lang="ts"></script>
<style src="./list.scss" lang="scss" scoped></style>

<template>
	<div class="page budget">
		<ConfirmDialog
			:data="confirmData"
			:dialog="confirmDialog"
			@updateDialog="emitConfimDialog($event)"
			@updateData="emitConfirmData($event)"></ConfirmDialog>

		<AddBudgetDialog
			:dialog="addBudgetDialog"
			@updateDialog="emitAddBudgetDialog($event)"></AddBudgetDialog>

		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex>
						<h1 class="header__h1">Budget</h1>
						add:
						filter for list
						page to edit/add budget template
						add budget functionality (params, id, prolly not need for this page)
					</v-flex>

					<v-flex>
						<v-layout justify-end>
							<v-btn
								@click="addBudgetDialog = true"
								color="success">
								<v-icon class="prepend-icon">add</v-icon>
								<span>Budget</span>
							</v-btn>

							<v-btn color="secondary">
								<v-icon class="prepend-icon">edit</v-icon>
								<span>Template</span>
							</v-btn>
						</v-layout>
					</v-flex>
				</v-layout>

				<EmptyState
					v-if="!tableItems.length"
					text="You have no monthly budgets. Click on the button below to add one."
					button-text="Template"
					@buttonClicked="goToBudgetTemplate()"></EmptyState>

				<v-card v-if="tableItems.length">
					<v-card-text>
						<v-data-table
							:pagination.sync="tableInfo"
							:total-items="tableInfo.totalItems"
							:rows-per-page-items="tableInfo.rowsPerPageItems"
							:items="tableItems"
							:headers="tableHeaders">
							<template slot="items" slot-scope="props">
								<td class="text-xs-center">{{ props.item.name }}</td>
								<td class="text-xs-center">Jan. 2019</td>
								<td class="text-xs-center">
									<router-link
										slot="activator"
										tag="v-btn"
										class="btn--details__icon v-btn v-btn--floating v-btn--small"
										:to="{ name: 'budget-edit', params: { id: 1 } }"
										exact>
										<v-icon>edit</v-icon>
									</router-link>

									<v-btn
										fab
										small
										@click="deleteBudget(props.item.id)"
										class="btn--details__icon">
										<v-icon>cancel</v-icon>
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

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
			<v-flex lg8 xl6>
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
					v-if="tableItems[selectedYear] && !tableItems[selectedYear].length && !canAddBudget()"
					title="You have no monthly budgets"
					text="Click on the button below to add one."
					button-text="Budget"
					:disableButton="canAddBudget()"
					@buttonClicked="addBudgetDialog = true"></EmptyState>

				<EmptyState
					v-if="canAddBudget()"
					title="You have not set up your monthly templates yet"
					text="Adding a template for your reoccurring bills makes it easier to manage your budget and it is easy to setup. Click on the button below to add one."
					button-text="Template"
					@buttonClicked="goToBudgetTemplate()"></EmptyState>

				<template v-if="tableItems[selectedYear] && tableItems[selectedYear].length">
					<v-card style="margin-bottom: 30px;">
						<v-card-title>
							<v-flex lg3>
								<v-select
									v-model="selectedYear"
									:items="years"
									item-value="value"
									item-text="label"
									label="Select Year"></v-select>
							</v-flex>
						</v-card-title>
					</v-card>

					<v-card style="margin-bottom: 30px;">
						<v-card-text>
							<template v-for="(item, index) in tableItems[selectedYear]">
								<v-layout align-center style="padding: 25px 0;">
									<v-flex lg1 class="text-center">
										<div v-if="Number(item.saved) >= 0" class="round-icon success">
											<v-icon>trending_up</v-icon>
										</div>

										<div v-if="Number(item.saved) < 0" class="round-icon danger">
											<v-icon>trending_down</v-icon>
										</div>
									</v-flex>

									<v-flex lg9>
										<h3 class="list-header">{{ item.name }}</h3>
										<p class="list-text">
											<span
												:class="{
													'success-text': Number(item.saved) >= 0,
													'danger-text': Number(item.saved) < 0,
												}"
											>
												You've {{ Number(item.saved) >= 0 ? 'saved' : 'lost' }}
												<span>${{ item.saved.replace('-','') }}</span>
											</span>
										</p>
									</v-flex>

									<v-flex lg2>
										<router-link
											tag="v-btn"
											class="v-btn v-btn--floating v-btn--depressed v-btn--small"
											:to="{ name: 'budget-edit', params: { id: item.id } }">
											<v-icon>edit</v-icon>
										</router-link>

										<v-btn fab depressed small @click="deleteBudget(item.id)">
											<v-icon>delete</v-icon>
										</v-btn>
									</v-flex>
								</v-layout>

								<v-divider v-if="tableItems[selectedYear] && index < (tableItems[selectedYear].length - 1)"></v-divider>
							</template>
						</v-card-text>
					</v-card>
				</template>
			</v-flex>
		</v-layout>
	</div>
</template>

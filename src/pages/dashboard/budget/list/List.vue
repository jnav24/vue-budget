<script src="./list.ts" lang="ts"></script>
<style src="./list.scss" lang="scss" scoped></style>

<template>
	<div class="page budget">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex>
						<h1 class="header__h1">Budget</h1>
					</v-flex>

					<v-flex>
						<v-layout justify-end>
							<v-btn color="success">
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
					text="You have no monthly budgets. Click on the button below to add one."
					button-text="Template"
					@buttonClicked="goToBudgetTemplate()"></EmptyState>

				<v-card>
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
									<v-btn
										fab
										small
										class="btn--details__icon">
										<v-icon>edit</v-icon>
									</v-btn>

									<v-btn
										fab
										small
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
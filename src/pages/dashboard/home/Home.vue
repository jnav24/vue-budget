<script src="./home.ts" lang="ts"></script>
<style src="./home.scss" lang="scss" scoped></style>

<template>
	<div class="page home">
		<v-layout justify-center>
			<v-flex lg8 xl6>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex lg10 xl10>
						<h1 class="header__h1">Dashboard</h1>
					</v-flex>

					<v-flex lg2 xl2>
						<v-layout justify-end>
							<v-btn
								v-if="totalUnpaid"
								:to="{ name: 'budget-edit', params: { id: aggregationState.unpaid.id } }"
								color="danger"
								dark>
								<v-icon>error</v-icon>
								<span style="margin-left: 5px;">Bills unpaid: {{ totalUnpaid }}</span>
							</v-btn>
							<v-btn
								v-if="!totalUnpaid && budget.length"
								:to="{ name: 'budget-edit', params: { id: aggregationState.unpaid.id } }"
								color="success"
								dark>
								<v-icon>check_circle</v-icon>
								<span style="margin-left: 5px;">All Bills Paid</span>
							</v-btn>
						</v-layout>
					</v-flex>
				</v-layout>

				<v-card style="margin-bottom: 50px;">
					<v-card-title>
						<v-layout align-center>
							<v-flex lg10 xl10>
								<h2 class="chart-title">Year to Date</h2>
							</v-flex>

							<v-flex lg2 xl2>
								<v-layout justify-end>
									<v-select
										v-model="selectedYear"
										:items="years"
										item-value="value"
										item-text="label"
										label="Select Year"></v-select>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-card-title>
					<v-card-text>
						<ChartLine :options="chartOptions" :data="chartData"></ChartLine>
					</v-card-text>
				</v-card>

				<div class="summary-cards">
					<div class="col summary-card__earned">
						<v-card>
							<v-card-text class="content">
								<p class="icon"><v-icon>trending_up</v-icon></p>
								<p class="total">Total Earned {{ selectedYear }}</p>
								<p class="amount">{{ totalEarned }}</p>
								<p class="average">Monthly Average {{ averageEarned }}</p>
							</v-card-text>
						</v-card>
					</div>

					<div class="col summary-card__spent">
						<v-card>
							<v-card-text class="content">
								<p class="icon"><v-icon>trending_down</v-icon></p>
								<p class="total">Total Spent {{ selectedYear }}</p>
								<p class="amount">{{ totalSpent }}</p>
								<p class="average">Monthly Average {{ averageSpent }}</p>
							</v-card-text>
						</v-card>
					</div>

					<div class="col summary-card__saved">
						<v-card>
							<v-card-text class="content">
								<p class="icon"><v-icon>attach_money</v-icon></p>
								<p class="total">Total Saved {{ selectedYear }}</p>
								<p class="amount">{{ totalSaved }}</p>
								<p class="average">Monthly Average {{ averageSaved }}</p>
							</v-card-text>
						</v-card>
					</div>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

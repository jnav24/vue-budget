<script src="./home.ts" lang="ts"></script>
<style src="./home.scss" lang="scss" scoped></style>

<template>
	<div class="page home">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center>
					<v-flex lg10 xl10>
						<h1 class="header__h1">Dashboard</h1>
					</v-flex>

					<v-flex lg2 xl2>
						<v-layout justify-end>
							<v-btn color="danger" dark>Bills unpaid: 2</v-btn>
						</v-layout>
					</v-flex>
				</v-layout>

				<v-card style="margin-bottom: 50px;">
					<v-card-title>
						<v-layout align-center style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">
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
								<p class="total">Total Earned {{ currentYear }}</p>
								<p class="amount">$38561.97</p>
								<p class="average">Monthly Average $1287.43</p>
							</v-card-text>
						</v-card>
					</div>

					<div class="col summary-card__spent">
						<v-card>
							<v-card-text class="content">
								<p class="icon"><v-icon>trending_down</v-icon></p>
								<p class="total">Total Spent {{ currentYear }}</p>
								<p class="amount">$38561.97</p>
								<p class="average">Monthly Average $1287.43</p>
							</v-card-text>
						</v-card>
					</div>

					<div class="col summary-card__saved">
						<v-card>
							<v-card-text class="content">
								<p class="icon"><v-icon>attach_money</v-icon></p>
								<p class="total">Total Saved {{ currentYear }}</p>
								<p class="amount">$38561.97</p>
								<p class="average">Monthly Average $1287.43</p>
							</v-card-text>
						</v-card>
					</div>
				</div>
			</v-flex>
		</v-layout>

		<ul>
			<li>Year to date spent</li>
			<li>Year to date saved</li>
			<li>Year to date earned</li>
			<li>add drop down for year for chart</li>
			<li>show unpaid bills for current cycle; maybe right of the page title with a link to the budget page</li>
			<li>make an aggregate table that gets updated everytime budget is saved. id, user_id, budget_id, spent | saved | earned, and value</li>
			<li>on the bottom three boxes, put the average value as well as the total</li>
		</ul>

		<pre style="text-align: left;">
			example of data:
			[
				2019: {
					earned: [],
					saved: [],
					spent: [],
				}
			]
		</pre>
	</div>
</template>

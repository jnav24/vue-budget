<script src="./search-card-totals.ts" lang="ts"></script>
<style src="./search-card-totals.scss" lang="scss" scoped></style>

<template>
	<div id="search-card-totals">
		<h2>YTD Summary</h2>
		<v-layout align-center>
			<v-flex sm4>
				<p>Beginning Balance <span>{{ startBalance.month }} {{ startBalance.amount }}</span></p>
				<p>Ending Balance <span>{{ endBalance.month }} {{ endBalance.amount }}</span></p>
				<p>Average Saved/Spent <span>{{ averageBalance }}</span></p>
			</v-flex>

			<v-flex sm4>
				<p>Lowest <span>{{ lowestBalance.month }} {{ lowestBalance.amount }}</span></p>
				<p>Highest <span>{{ highestBalance.month }} {{ highestBalance.amount }}</span></p>
				<p>YTD Percentage <span>{{ percentage }}</span></p>
			</v-flex>

			<v-flex sm4>
				<span>Total Saved/Spent</span>
				<p class="total-amount">{{ total || '$--'}}</p>
			</v-flex>
		</v-layout>
	</div>
</template>

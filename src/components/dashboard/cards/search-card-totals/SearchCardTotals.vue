<script src="./search-card-totals.ts" lang="ts"></script>
<style src="./search-card-totals.scss" lang="scss" scoped></style>

<template>
	<div id="search-card-totals">
		<v-layout align-center>
			<v-flex sm6>
				<p>Beginning Balance</p>
				<p>Ending Balance</p>
				<p>Lowest</p>
				<p>Highest</p>
				<p>Average Saved/Spent</p>
			</v-flex>

			<v-flex sm6>
				<span>Total</span>
				<p class="total-amount">$24,000,000.00</p>
			</v-flex>
		</v-layout>
	</div>
</template>

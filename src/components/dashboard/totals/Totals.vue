<script src="./totals.ts" lang="ts"></script>
<style src="./totals.scss" lang="scss" scoped></style>

<template>
	<div class="totals">
		<v-card>
			<v-card-title>
				<div>
					<p class="amount-text">
						Total {{ totalTitle }}
						<v-icon color="success" v-if="trending">trending_up</v-icon>
						<v-icon color="danger" v-if="!trending">trending_down</v-icon>
					</p>

					<p class="amount" :class="['amount-' + amountColor]" v-if="!dynamicColor">{{ formatDollar }}</p>

					<p class="amount amount-danger" v-if="dynamicColor && totalAmount < 1">{{ formatDollar }}</p>
					<p class="amount amount-success" v-if="dynamicColor && totalAmount >= 1">{{ formatDollar }}</p>
				</div>
			</v-card-title>
		</v-card>
	</div>
</template>

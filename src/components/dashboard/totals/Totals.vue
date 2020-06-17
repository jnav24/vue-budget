<script src="./totals.ts" lang="ts"></script>
<style src="./totals.scss" lang="scss" scoped></style>

<template>
	<div
		class="totals"
		:class="{
			'bg-danger': dynamicBackground && totalAmount < 1,
			'bg-success': dynamicBackground && totalAmount >= 1
		}">
		<v-card>
			<v-card-title>
				<div>
					<p class="amount-text">
						Total {{ totalTitle }}
						<v-template v-if="!dynamicBackground">
							<v-icon color="success" v-if="trending">trending_up</v-icon>
							<v-icon color="danger" v-if="!trending">trending_down</v-icon>
						</v-template>
					</p>

					<p class="amount" v-if="dynamicBackground && !dynamicColor">{{ formatDollar }}</p>

					<p
						class="amount"
						:class="['amount-' + amountColor]"
						v-if="!dynamicBackground && !dynamicColor">
						{{ formatDollar }}
					</p>

					<v-template v-if="!dynamicBackground && dynamicColor">
						<p class="amount amount-danger" v-if="totalAmount < 1">{{ formatDollar }}</p>
						<p class="amount amount-success" v-if="totalAmount >= 1">{{ formatDollar }}</p>
					</v-template>
				</div>
			</v-card-title>
		</v-card>
	</div>
</template>

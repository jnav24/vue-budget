<script src="./investments.ts" lang="ts"></script>
<style src="./investments.scss" lang="scss" scoped></style>

<template>
	<div class="budget investments">
		<v-layout
			align-center
			class="budget__row"
			v-for="(item, index) in budgetData"
			:key="item.id">
			<v-flex lg6 xl6>
				<h3 class="budget__title">{{ item.name }}</h3>
				<p class="budget__type">{{ getType(item.investment_type_id) }}</p>
			</v-flex>

			<v-flex lg4 xl4>
				<p class="budget__price price-success">{{ getDollarAmount(item.amount) }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<v-layout justify-end>
					<v-btn
						fab
						class="btn--details__icon">
						<v-icon>edit</v-icon>
					</v-btn>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

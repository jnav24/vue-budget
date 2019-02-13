<script src="./credit-cards.ts" lang="ts"></script>
<style src="./credit-cards.scss" lang="scss" scoped></style>

<template>
	<div class="credit-cards budget">
		<v-layout
			align-center
			class="budget__row"
			v-for="(item, index) of budgetData"
			:key="item.id">
			<v-flex lg1 xl1>
				<v-icon v-if="isPaid(item)" class="paid-icon">check</v-icon>
			</v-flex>

			<v-flex lg4 xl4>
				<h3 class="budget__title">{{ item.name }}</h3>
				<p class="budget__type">{{ getType(item.credit_card_type_id) }}</p>
				<p class="budget__type">********{{ item.last_4 }} {{ item.exp_month }}/{{ item.exp_year }}</p>
			</v-flex>

			<v-flex lg3 xl3>
				<p class="budget__price price-danger price-tac">{{ getDollarAmount('1000') }}</p>
				<p class="budget__price-details">(Out of {{ getDollarAmount(item.limit) }})</p>
			</v-flex>

			<v-flex lg2 xl2>
				<p class="budget__due" v-if="!isPaid(item)">Due {{ getDueDate(item.due_date) }}</p>
				<p class="budget__paid" v-if="isPaid(item)">Paid {{ getDueDate(item.due_date) }}</p>
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

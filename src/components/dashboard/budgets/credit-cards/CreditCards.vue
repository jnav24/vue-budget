<script src="./credit-cards.ts" lang="ts"></script>
<style src="./credit-cards.scss" lang="scss" scoped></style>

<template>
	<div class="credit-cards budget">
		<v-layout
			align-center
			class="budget__row"
			v-for="(item, index) in budgetData"
			:key="item.id">
			<v-flex lg1 xl1>
				<v-icon v-if="isBillPaid(item)" class="budget__paid-icon">check</v-icon>
			</v-flex>

			<v-flex lg4 xl4>
				<h3 class="budget__title">{{ item.name }}</h3>
				<p class="budget__type">{{ getType(item.credit_card_type_id) }}</p>
				<p class="budget__type">
					<span v-if="hasLast4(item)">********{{ item.last_4 }}</span>
					<span v-if="hasExpiration(item)">{{ item.exp_month }}/{{ item.exp_year }}</span>
				</p>
			</v-flex>

			<v-flex lg3 xl3>
				<p class="budget__price price-danger price-tac">{{ getDollarAmount(item.amount) }}</p>
				<p class="budget__price-details">Balance {{ getDollarAmount(item.balance) }}</p>
				<p class="budget__price-details">Limit {{ getDollarAmount(item.limit) }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<p class="budget__due" v-if="!isBillPaid(item)">Due {{ getDueDate(item.due_date) }}</p>
				<p class="budget__paid" v-if="isBillPaid(item)">Paid {{setPaidDate(item.paid_date) }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<v-layout justify-end>
					<v-btn
						fab
						@click="openEditBudget({ type: typeId, data: item })"
						class="btn--details__icon">
						<v-icon>edit</v-icon>
					</v-btn>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

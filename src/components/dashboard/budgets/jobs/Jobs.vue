<script src="./jobs.ts" lang="ts"></script>
<style src="./jobs.scss" lang="scss" scoped></style>

<template>
	<div class="budget jobs">
		<v-layout
			align-center
			class="budget__row"
			v-for="(item, index) in budgetData"
			:key="item.id">
			<v-flex lg6 xl6>
				<h3 class="budget__title">{{ item.name }}</h3>
				<p class="budget__type">{{ getType(item.job_type_id) }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<p class="budget__price price-success">{{ getDollarAmount(item.amount) }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<p style="margin: 0;text-align: center" v-if="!isPaid(item)">Pay on {{ getPaidDate(item.initial_pay_date) }}</p>
				<p class="budget__paid" v-if="isPaid(item)">Paid {{ getPaidDate(item.initial_pay_date) }}</p>
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

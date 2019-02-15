<script src="./medical.ts" lang="ts"></script>
<style src="./medical.scss" lang="scss" scoped></style>

<template>
	<div class="medical budget">
		<v-layout
			align-center
			class="budget__row"
			v-for="(item, index) in budgetData"
			:key="item.id">
			<v-flex lg1 xl1>
				<v-icon v-if="isBillPaid(item)" class="budget__paid-icon">check</v-icon>
			</v-flex>

			<v-flex lg5 xl5>
				<h3 class="budget__title">{{ item.name }}</h3>
				<p class="budget__type">{{ getType(item.medical_type_id) }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<p class="budget__price price-success">{{ getDollarAmount(item.amount) }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<p class="budget__due" v-if="!isBillPaid(item)">Due {{ getDueDate(item.due_date) }}</p>
				<p class="budget__paid" v-if="isBillPaid(item)">Paid {{ getDueDate(item.due_date) }}</p>
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

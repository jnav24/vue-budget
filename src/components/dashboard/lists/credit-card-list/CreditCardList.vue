<script src="./credit-card-list.ts" lang="ts"></script>
<style src="./credit-card-list.scss" lang="scss" scoped></style>

<template>
	<div id="credit-card-list" class="search-list">
		<v-layout class="list-row" :class="{'divider': showDivider }"align-center>
			<v-flex sm4 class="col-name">{{ data.name }}</v-flex>
			<v-flex sm2>{{ getValueFromType(data) }}</v-flex>
			<v-flex sm2 class="text-center">{{ setPaidDate(data.paid_date) }}</v-flex>
			<v-flex sm2 class="col-price">{{ setCurrency(data.balance) }}</v-flex>
			<v-flex sm2 class="col-price">{{ setCurrency(data.amount) }}</v-flex>
		</v-layout>
	</div>
</template>

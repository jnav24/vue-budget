<script src="./four-column-list.ts" lang="ts"></script>
<style src="./four-column-list.scss" lang="scss" scoped></style>

<template>
	<div id="four-column-list" class="search-list">
		<v-layout class="list-row" :class="{'hide-row': hideHead }"align-center>
			<v-flex sm5 class="col-name">Name</v-flex>
			<v-flex sm3>{{ type === 'miscellaneous' ? '' : 'Type'}}</v-flex>
			<v-flex sm2>Paid Date</v-flex>
			<v-flex sm2 class="col-price">Amount Paid</v-flex>
		</v-layout>

		<v-layout class="list-row" :class="{'divider': showDivider }"align-center>
			<v-flex sm5 class="col-name">{{ data.name }}</v-flex>
			<v-flex sm3>{{ getValueFromType(data) }}</v-flex>
			<v-flex sm2>{{ setPaidDate(data.paid_date) }}</v-flex>
			<v-flex sm2 class="col-price">{{ setCurrency(data.amount) }}</v-flex>
		</v-layout>
	</div>
</template>

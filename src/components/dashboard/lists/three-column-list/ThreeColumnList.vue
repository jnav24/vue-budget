<script src="./three-column-list.ts" lang="ts"></script>
<style src="./three-column-list.scss" lang="scss" scoped></style>

<template>
	<div id="three-column-list" class="search-list">
		<v-layout class="list-row" :class="{'hide-row': hideHead }"align-center>
			<v-flex sm5 class="col-name">Name</v-flex>
			<v-flex sm3>Type</v-flex>
			<v-flex sm4 class="col-price">Amount Paid</v-flex>
		</v-layout>

		<v-layout class="list-row" :class="{'divider': showDivider }"align-center>
			<v-flex sm5 class="col-name">{{ data.name }}</v-flex>
			<v-flex sm3>{{ getValueFromType(data) }}</v-flex>
			<v-flex sm4 class="col-price">{{ setCurrency(data.amount) }}</v-flex>
		</v-layout>
	</div>
</template>

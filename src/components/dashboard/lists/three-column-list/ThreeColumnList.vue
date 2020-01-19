<script src="./three-column-list.ts" lang="ts"></script>
<style src="./three-column-list.scss" lang="scss" scoped></style>

<template>
	<div id="three-column-list" class="search-list">
		<v-layout class="list-row" :class="{'divider': showDivider }"align-center>
			<v-flex sm5 class="col-name">{{ data.name }}</v-flex>
			<v-flex sm3>{{ getValueFromType(data) }}</v-flex>
			<v-flex sm4 class="col-price">{{ setCurrency(data.amount) }}</v-flex>
		</v-layout>
	</div>
</template>

<script src="./utilities.ts" lang="ts"></script>
<style src="./utilities.scss" lang="scss" scoped></style>

<template>
	<div class="budget utilities">
		<v-layout
			align-center
			class="budget__row"
			v-for="(item, index) in budgetData"
			:key="item.id">
		</v-layout>
	</div>
</template>

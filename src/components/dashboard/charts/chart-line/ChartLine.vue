<script src="./chart-line.ts" lang="ts"></script>
<style src="./chart-line.scss" lang="scss" scoped></style>

<template>
	<div class="charts chart-line">
		<InternalLineChart
			:chart-data="currentData"
			:options="options"></InternalLineChart>
	</div>
</template>

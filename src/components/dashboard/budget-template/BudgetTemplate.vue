<script src="./budget-template.ts" lang="ts"></script>
<style src="./budget-template.scss" lang="scss" scoped></style>

<template>
	<div class="budget-template">
		<h3 class="header__h3">Example Name</h3>

		<v-data-table
			:rows-per-page-items="tableInfo.rowsPerPageItems"
			:headers="tableHeaders"
			:items="tableList">
			<template slot="items" slot-scope="props">
				<td></td>
			</template>
		</v-data-table>
	</div>
</template>

<script src="./budget-template.ts" lang="ts"></script>
<style src="./budget-template.scss" lang="scss" scoped></style>

<template>
	<div class="budget-template">
		<h3 class="header__h3">{{ name }}</h3>

		<v-card>
			<v-card-text>
				<v-data-table
					:rows-per-page-items="tableInfo.rowsPerPageItems"
					:headers="tableHeaders"
					:items="tableList">
					<template slot="items" slot-scope="props">
						<td v-for="(element, int) in Object.keys(tableList[0])" :key="int">
							{{ props.item[element] }}
						</td>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

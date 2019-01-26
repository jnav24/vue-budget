<script src="./list.ts" lang="ts"></script>
<style src="./list.scss" lang="scss" scoped></style>

<template>
	<div class="page budget">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<h1 class="header__h1">Budget</h1>

				<v-card>
					<v-card-text>
						<v-data-table
							:pagination.sync="tableInfo"
							:total-items="tableInfo.totalItems"
							:rows-per-page-items="tableInfo.rowsPerPageItems"
							:items="tableItems"
							:headers="tableHeaders">
							<template slot="items" slot-scope="props">
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

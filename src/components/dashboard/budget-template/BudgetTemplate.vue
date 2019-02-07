<script src="./budget-template.ts" lang="ts"></script>
<style src="./budget-template.scss" lang="scss" scoped></style>

<template>
	<div class="budget-template">
		<ConfirmDialog
			:data="confirmData"
			:dialog="confirmDialog"
			@updateDialog="emitConfimDialog($event)"
			@updateData="emitConfirmData($event)"></ConfirmDialog>

		<h3 class="header__h3">{{ name }}</h3>

		<v-card>
			<v-card-text>
				<v-data-table
					:rows-per-page-items="tableInfo.rowsPerPageItems"
					:headers="tableHeaders"
					:items="tableList">
					<template slot="items" slot-scope="props">
						<td v-for="(element, int) in headerKeys" :key="int">
							{{ element.indexOf('type_id') > -1 ? getType(props.item[element]) : props.item[element] }}
						</td>
						<td>
							<v-btn
								fab
								@click="emitEditBudget({ type: currentType.id, data: props.item })"
								class="btn--details__icon">
								<v-icon>edit</v-icon>
							</v-btn>

							<v-btn
								fab
								@click="markForDeletion(props.item)"
								class="btn--details__icon">
								<v-icon>cancel</v-icon>
							</v-btn>
						</td>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

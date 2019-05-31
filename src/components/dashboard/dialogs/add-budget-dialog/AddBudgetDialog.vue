<script src="./add-budget-dialog.ts" lang="ts"></script>
<style src="./add-budget-dialog.scss" lang="scss" scoped></style>

<template>
	<v-dialog
		class="dialogs add-budget"
		max-width="500px"
		v-model="showDialog">
		<v-card>
			<v-card-title class="dialog--title">Add Budget</v-card-title>

			<v-card-text>
				<v-alert
					transition="slide-y-transition"
					:value="alert.display"
					:type="alert.type">
					{{ alert.msg }}
				</v-alert>

				<v-form ref="addBudgetForm" v-model="addBudgetValid">
					<v-layout>
						<v-text-field
							v-model="form.name.value"
							:rules="form.name.rules"
							label="Budget Name"></v-text-field>
					</v-layout>

					<v-layout>
						<v-flex lg3 xl3>
							<v-select
								v-model="form.month.value"
								:rules="form.month.rules"
								:items="months"
								item-text="month_int"
								item-value="value"
								label="Month"></v-select>
						</v-flex>

						<v-spacer></v-spacer>

						<v-flex>
							<v-select
								v-model="form.year.value"
								:rules="form.year.rules"
								:items="years"
								item-text="label"
								item-value="value"
								label="Year"></v-select>
						</v-flex>
					</v-layout>
				</v-form>
			</v-card-text>

			<v-card-actions class="actions">
				<v-btn
					@click="closeDialog()">Cancel</v-btn>
				<v-btn
					@click="addBudget()"
					color="success"
					:disabled="!addBudgetValid">Add Budget</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

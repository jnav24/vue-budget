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
				<v-form ref="addBudgetForm" v-model="addBudgetValid">
					<v-text-field
						v-model="form.name.value"
						:rules="form.name.rules"
						label="Budget Name"></v-text-field>
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

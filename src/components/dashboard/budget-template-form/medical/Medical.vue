<script src="./medical.ts" lang="ts"></script>
<style src="./medical.scss" lang="scss" scoped></style>

<template>
	<div class="budget-template medical">
		<v-form ref="templateForm" v-model="templateValid">
			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						v-model="form.name.value"
						:rules="form.name.rules"
						label="Name"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg6 xl6>
					<v-text-field
						v-model="form.amount.value"
						:rules="form.amount.rules"
						label="Amount"></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg6 xl6>
					<v-select
						v-model="form.due.value"
						:rules="form.due.rules"
						:items="dates"
						label="Due Date"></v-select>
				</v-flex>
			</v-layout>

			<v-layout justify-end>
				<v-btn
					@click="submit()">Cancel</v-btn>

				<v-btn
					color="secondary"
					:disabled="!templateValid"
					@click="submit()">Add Expense</v-btn>
			</v-layout>
		</v-form>
	</div>
</template>

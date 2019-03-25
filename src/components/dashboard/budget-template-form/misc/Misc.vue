<script src="./misc.ts" lang="ts"></script>
<style src="./misc.scss" lang="scss" scoped></style>

<template>
	<div class="budget-template misc">
		<BudgetTemplateComponent
			:edit-mode="editMode"
			:reset="resetForm"
			@buttonClicked="validateForm($event)">
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

			<v-layout v-if="showPaidForm" align-center>
				<v-tooltip bottom>
					<template slot="activator">
						<v-icon style="margin-top: -5px; margin-right: 10px; font-size: 22px;">help</v-icon>
					</template>
					<span style="display: block;max-width: 300px">
						When calculating the totals, this payment will not be apart of that calculation.
						One reason could be, this payment was made with a credit card and you're just tracking this for tax purposes.
					</span>
				</v-tooltip>

				<v-checkbox
					color="primary"
					v-model="form.not_track_amount.value"
					label="Do not calculate this payment in the total?"></v-checkbox>
			</v-layout>

			<ConfirmationForm
				v-if="showPaidForm"
				:data="form"
				@updateFormData="updateForm($event)"></ConfirmationForm>
		</BudgetTemplateComponent>
	</div>
</template>

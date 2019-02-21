<script src="./credit-card.ts" lang="ts"></script>
<style src="./credit-card.scss" lang="scss" scoped></style>

<template>
	<div class="credit-card budget-template">
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
					<v-select
						v-model="form.type.value"
						:rules="form.type.rules"
						:items="types"
						item-value="id"
						item-text="name"
						label="Card Type"></v-select>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						v-model="form.limit.value"
						:rules="form.limit.rules"
						label="Credit Limit"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg6 xl6>
					<v-select
						v-model="form.due.value"
						:rules="form.due.rules"
						:items="dates"
						label="Due Date"></v-select>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						v-model="form.amount.value"
						:rules="form.amount.rules"
						label="Amount Due"></v-text-field>
				</v-flex>
			</v-layout>

			<h3 style="margin: 30px 0;text-align: left;">Optional</h3>

			<v-layout>
				<v-flex lg5 xl5>
					<v-text-field
						v-model="form.apr.value"
						:rules="form.apr.rules"
						label="APR (percentage)"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg6 xl6>
					<v-text-field
						v-model="form.last4.value"
						:rules="form.last4.rules"
						label="Last 4 Digits of Credit Card"></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex lg5 xl5>
					<v-autocomplete
						@change="setYear()"
						v-model="form.expMonth.value"
						:items="months"
						item-text="month_int"
						item-value="value"
						label="Exp. Month"></v-autocomplete>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex lg6 xl6>
					<v-autocomplete
						@change="setMonth()"
						v-model="form.expYear.value"
						:items="years"
						item-text="label"
						item-value="value"
						label="Exp. Year"></v-autocomplete>
				</v-flex>
			</v-layout>

			<ConfirmationForm
				v-if="showPaidForm"
				:data="form"
				@updateFormData="updateForm($event)"></ConfirmationForm>
		</BudgetTemplateComponent>
	</div>
</template>

<script src="./job.ts" lang="ts"></script>
<style src="./job.scss" lang="scss" scoped></style>

<template>
	<div class="budget-template job">
		<BudgetTemplateComponent
			:reset="resetForm"
			@buttonClicked="validateForm($event)">
			<v-layout>
				<v-flex>
					<v-text-field
						v-model="form.name.value"
						:rules="form.name.rules"
						label="Name"></v-text-field>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex>
					<v-text-field
						v-model="form.amount.value"
						:rules="form.amount.rules"
						label="Pay Amount"></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-flex>
					<v-select
						v-model="form.pay_period.value"
						:rules="form.pay_period.rules"
						:items="payPeriods"
						item-value="value"
						item-text="text"
						label="Pay Period"></v-select>
				</v-flex>

				<v-spacer></v-spacer>

				<v-flex>
					<v-menu
						:close-on-content-click="false"
						v-model="picker"
						:nudge-right="40"
						lazy
						transition="scale-transition"
						offset-y
						full-width
						min-width="290px">
						<v-text-field
							slot="activator"
							v-model="form.initial_pay_date.value"
							label="Next Paydate"
							prepend-icon="event"
							readonly></v-text-field>
						<v-date-picker
							v-model="form.initial_pay_date.value"
							@input="picker = false"></v-date-picker>
					</v-menu>
				</v-flex>
			</v-layout>
		</BudgetTemplateComponent>
	</div>
</template>

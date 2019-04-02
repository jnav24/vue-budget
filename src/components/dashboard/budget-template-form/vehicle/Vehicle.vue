<script src="./vehicle.ts" lang="ts"></script>
<style src="./vehicle.scss" lang="scss" scoped></style>

<template>
	<div class="vehicle budget-template">
		<BudgetTemplateComponent
			:edit-mode="editMode"
			:reset="resetForm"
			@buttonClicked="validateForm($event)">
			<div v-if="!Object.keys(vehicles).length">
				<!--<EmptyState text="test" button-text="whoa!"></EmptyState>-->
				<v-layout justify-center>
					<div class="icon-container__empty">
						<img src="@/assets/images/empty_state_bino.jpg" alt="" class="icon">
					</div>
				</v-layout>
				<h3 class="header__h3">Empty Vehicles</h3>
				<p class="empty-text">Looks like you haven't added vehicles yet.</p>
				<v-btn
					color="success">
					Settings Page
				</v-btn>
			</div>

			<div v-if="Object.keys(vehicles).length">
				<v-layout>
					<v-flex lg5 xl5>
						<v-select
							v-model="form.vehicle.value"
							:rules="form.vehicle.rules"
							:items="vehicles"
							item-value="id"
							item-text="value"
							label="Pick Vehicle"></v-select>
					</v-flex>
				</v-layout>

				<v-layout>
					<v-flex lg5 xl5>
						<v-select
							v-model="form.type.value"
							:rules="form.type.rules"
							:items="types"
							item-value="id"
							item-text="name"
							label="Account type"></v-select>
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
							label="Amount"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex lg6 xl6>
						<v-text-field
							v-if="getTypeId('gas') === form.type.value"
							v-model="form.mileage.value"
							:rules="form.mileage.rules"
							label="Mileage"></v-text-field>
					</v-flex>
				</v-layout>

				<ConfirmationForm
					v-if="showPaidForm"
					:data="form"
					@updateFormData="updateForm($event)"></ConfirmationForm>
			</div>
		</BudgetTemplateComponent>
	</div>
</template>

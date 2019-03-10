<script src="./vehicle.ts" lang="ts"></script>
<style src="./vehicle.scss" lang="scss" scoped></style>

<template>
	<div class="vehicle budget-template">
		<BudgetTemplateComponent
			:edit-mode="editMode"
			:reset="resetForm"
			@buttonClicked="validateForm($event)">
			<v-layout>
				<v-flex>
					<h1>Vehicle Budget Template</h1>
					<p>In case a user has multiple vehicles, need for them to be able to add all of them.</p>
					<p>Once added, user can select which vehicle to add expense to.</p>

					<p>Vehicles and Vehicle_Templates</p>

					<ul>
						<li>id</li>
						<li>budget_id</li>
						<li>amount</li>
						<li>due_date</li>
						<li>user_vehicle_id</li>
						<li>vehicle_type_id</li>
						<li>confirmation</li>
						<li>paid_date</li>
						<li>created_at</li>
						<li>updated_at</li>
					</ul>

					<p>User Vehicles</p>

					<ul>
						<li>id</li>
						<li>user_id</li>
						<li>make</li>
						<li>model</li>
						<li>year</li>
						<li>mileage</li>
						<li>created_at</li>
						<li>updated_at</li>
					</ul>

					<p>Vehicle_Types</p>

					<ul>
						<li>id</li>
						<li>name</li>
						<li>slug</li>
						<li>created_at</li>
						<li>updated_at</li>
					</ul>
				</v-flex>
			</v-layout>

			<ConfirmationForm
				v-if="showPaidForm"
				:data="form"
				@updateFormData="updateForm($event)"></ConfirmationForm>
		</BudgetTemplateComponent>
	</div>
</template>

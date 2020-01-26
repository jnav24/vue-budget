<script src="./vehicle-list.ts" lang="ts"></script>
<style src="./vehicle-list.scss" lang="scss" scoped></style>

<template>
	<div id="vehicle-list" class="search-list">
		<v-layout class="list-row" :class="{'hide-row': hideHead }" align-center>
			<v-flex sm3 class="col-name">Vehicle</v-flex>
			<v-flex sm2>Type</v-flex>
			<v-flex sm1 class="text-center">Mileage</v-flex>
			<v-flex sm2 class="text-center">Paid Date</v-flex>
			<v-flex sm2 class="col-price">Balance</v-flex>
			<v-flex sm2 class="col-price">Amount Paid</v-flex>
		</v-layout>

		<v-layout
			class="list-row list-content"
			:class="{
				'divider': showDivider,
				'list-saved': !isSpentList,
				'list-spent': isSpentList
			}"
			align-center>
			<v-flex>
				<v-layout align-center>
					<v-flex sm3 class="col-name">{{ getSelectedVehicle(data.user_vehicle_id) }}</v-flex>
					<v-flex sm2>{{ getValueFromType(data) }}</v-flex>
					<v-flex sm1 class="text-center">{{ data.mileage }}</v-flex>
					<v-flex sm2 class="text-center">{{ setPaidDate(data.paid_date) }}</v-flex>
					<v-flex sm2 class="col-price">{{ setCurrency(data.balance) }}</v-flex>
					<v-flex sm2 class="col-price">{{ setCurrency(data.amount) }}</v-flex>
				</v-layout>

				<v-layout v-if="!!data.notes" align-start>
					<v-flex sm1 style="font-weight: bold;">
						Notes
					</v-flex>

					<v-flex sm11>
						{{ data.notes }}
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

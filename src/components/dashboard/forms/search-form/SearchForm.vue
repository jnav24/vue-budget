<script src="./search-form.ts" lang="ts"></script>
<style src="./search-form.scss" lang="scss" scoped></style>

<template>
	<div id="search-form">
		<v-card>
			<v-card-text>
				<v-form v-model="formValid">
					<v-select
						v-model="form.billType.value"
						:rules="form.billType.rules"
						@change="resetFields()"
						:items="billTypes"
						item-value="slug"
						item-text="name"
						label="Select Budget Type"></v-select>

					<v-select
						v-model="form.year.value"
						:rules="form.year.rules"
						:items="allYears"
						item-value="label"
						item-text="value"
						label="Select Year"></v-select>

					<v-divider></v-divider>

					<v-select
						v-if="form.billType.value === 'vehicles'"
						v-model="form.vehicle.value"
						:rules="form.vehicle.rules"
						:items="userVehicles"
						item-value="value"
						item-text="label"
						label="Select Vehicle"></v-select>

					<v-text-field
						v-if="!!form.billType.value.trim() && showNames"
						v-model="form.name.value"
						:rules="form.name.rules"
						label="Search by name"></v-text-field>

					<v-select
						v-if="!!form.billType.value.trim() && showTypes"
						v-model="form.type.value"
						:rules="form.type.rules"
						:items="getTypes"
						item-value="slug"
						item-text="name"
						:label="typeLabel"></v-select>

					<v-text-field
						v-if="showNotes"
						v-model="form.notes.value"
						:rules="form.notes.rules"
						label="Search Notes"></v-text-field>

					<v-btn @click="runSearch(form)" block color="success" :disabled="!formValid">
						<v-icon>search</v-icon>
						<span style="display:inline-block; margin-left: 5px;">Search</span>
					</v-btn>
				</v-form>

				<pre>{{ form }}</pre>
			</v-card-text>
		</v-card>
	</div>
</template>

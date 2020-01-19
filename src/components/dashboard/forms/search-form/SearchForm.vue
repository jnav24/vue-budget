<script src="./search-form.ts" lang="ts"></script>
<style src="./search-form.scss" lang="scss" scoped></style>

<template>
	<div id="search-form">
		<v-card>
			<v-card-text>
				<v-form v-model="formValid">
					<v-layout align-end>
						<v-flex sm10>
							<v-layout>
								<v-flex>
									<v-select
										v-model="form.billType.value"
										:rules="form.billType.rules"
										@change="resetFields()"
										:items="billTypes"
										item-value="slug"
										item-text="name"
										label="Select Budget Type"></v-select>
								</v-flex>

								<v-flex class="pl-5">
									<v-select
										v-model="form.year.value"
										:rules="form.year.rules"
										:items="allYears"
										item-value="label"
										item-text="value"
										label="Select Year"></v-select>
								</v-flex>

								<v-flex class="pl-5 pr-5">
									<v-select
										v-model="form.startMonth.value"
										:rules="form.startMonth.rules"
										:items="months"
										item-value="value"
										item-text="label"
										label="Select Start Month"></v-select>
								</v-flex>

								<v-flex>
									<v-select
										v-model="form.endMonth.value"
										:rules="form.endMonth.rules"
										:items="months"
										item-value="value"
										item-text="label"
										label="Select End Month"></v-select>
								</v-flex>
							</v-layout>

							<template v-if="!!form.billType.value.trim()">
								<v-divider></v-divider>

								<v-layout>
									<v-flex sm4>
										<v-text-field
											v-if="!!form.billType.value.trim() && showNames"
											v-model="form.name.value"
											:rules="form.name.rules"
											label="Search by name"></v-text-field>

										<v-text-field
											v-if="showNotes"
											v-model="form.notes.value"
											:rules="form.notes.rules"
											label="Search Notes"></v-text-field>
									</v-flex>

									<v-flex class="pl-5 pr-5">
										<v-select
											v-if="!!form.billType.value.trim() && showTypes"
											v-model="form.type.value"
											:rules="form.type.rules"
											:items="getTypes"
											item-value="slug"
											item-text="name"
											:label="typeLabel"></v-select>
									</v-flex>

									<v-flex>
										<v-select
											v-if="form.billType.value === 'vehicles'"
											v-model="form.vehicle.value"
											:rules="form.vehicle.rules"
											:items="userVehicles"
											item-value="value"
											item-text="label"
											label="Select Vehicle"></v-select>
									</v-flex>
								</v-layout>
							</template>
						</v-flex>

						<v-flex sm2 pl-4 pb-3>
							<v-btn @click="runSearch(form)" block color="success" :disabled="!formValid">
								<v-icon>search</v-icon>
								<span style="display:inline-block; margin-left: 5px;">Search</span>
							</v-btn>
						</v-flex>
					</v-layout>
				</v-form>

<!--				<pre>{{ form }}</pre>-->
			</v-card-text>
		</v-card>
	</div>
</template>

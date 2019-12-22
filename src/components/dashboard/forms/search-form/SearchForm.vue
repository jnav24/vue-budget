<script src="./search-form.ts" lang="ts"></script>
<style src="./search-form.scss" lang="scss" scoped></style>

<template>
	<div id="search-form">
		<v-card>
			<v-card-text>
				<v-layout align-center justify-space-between>
					<v-flex sm4>
						<v-text-field
							v-model="form.search.value"
							:rules="form.search.rules"
							label="Search by keyword or name"></v-text-field>
					</v-flex>

					<v-flex sm3>
						<v-select
							v-model="form.type.value"
							:rules="form.type.rules"
							:items="billTypes"
							item-value="slug"
							item-text="name"
							label="Select Budget Type"></v-select>
					</v-flex>

					<v-flex sm2>
						<v-select
							v-model="form.year.value"
							:rules="form.year.rules"
							:items="allYears"
							item-value="label"
							item-text="value"
							label="Select Year"></v-select>
					</v-flex>

					<v-flex sm2>
						<v-btn @click="runSearch()" block color="success">
							<v-icon>search</v-icon>
							<span style="display:inline-block; margin-left: 5px;">Search</span>
						</v-btn>
					</v-flex>
				</v-layout>
			</v-card-text>
		</v-card>
	</div>
</template>

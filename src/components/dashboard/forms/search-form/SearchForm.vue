<script src="./search-form.ts" lang="ts"></script>
<style src="./search-form.scss" lang="scss" scoped></style>

<template>
	<div id="search-form">
		<v-card>
			<v-card-text>
				<v-layout align-center>
					<v-flex>
						<v-text-field
							v-model="form.search.value"
							:rules="form.search.rules"
							label="Search by keyword or name"></v-text-field>
					</v-flex>

					<v-flex>
						<v-select
							v-model="form.type.value"
							:rules="form.type.rules"
							:items="types"
							item-value="id"
							item-text="value"
							label="Select Budget Type"></v-select>
					</v-flex>

					<v-flex>
						<v-select
							v-model="form.year.value"
							:rules="form.year.rules"
							:items="years"
							item-value="id"
							item-text="value"
							label="Select Year"></v-select>
					</v-flex>

					<v-flex>
						<v-btn color="success">
							<v-icon>search</v-icon>
							<span style="display:inline-block; margin-left: 5px;">Search</span>
						</v-btn>
					</v-flex>
				</v-layout>
			</v-card-text>
		</v-card>
	</div>
</template>

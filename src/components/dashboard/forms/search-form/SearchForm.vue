<script src="./search-form.ts" lang="ts"></script>
<style src="./search-form.scss" lang="scss" scoped></style>

<template>
	<div id="search-form">
		<v-card>
			<v-card-text>
				<v-select
					v-model="form.type.value"
					:rules="form.type.rules"
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

				<v-btn @click="runSearch(form)" block color="success">
					<v-icon>search</v-icon>
					<span style="display:inline-block; margin-left: 5px;">Search</span>
				</v-btn>
			</v-card-text>
		</v-card>
	</div>
</template>

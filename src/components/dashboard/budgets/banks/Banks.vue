<script src="./banks.ts" lang="ts"></script>
<style src="./banks.scss" lang="scss" scoped></style>

<template>
	<div class="budget banks">
		<v-layout
			class="bank-row"
			v-for="(item, index) in budgetData"
			:key="item.id">
			<v-flex lg6 xl6>
				<h3 class="title">{{ item.name }}</h3>
				<p class="type">{{ getType(item.bank_type_id) }}</p>
			</v-flex>

			<v-flex lg4 xl4>
				<p class="price">${{ item.amount }}</p>
			</v-flex>

			<v-flex lg2 xl2>
				<v-layout justify-end>
					<v-btn
						fab
						class="edit-button"
						color="secondary">
						<v-icon>edit</v-icon>
					</v-btn>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

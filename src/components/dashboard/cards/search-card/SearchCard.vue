<script src="./search-card.ts" lang="ts"></script>
<style src="./search-card.scss" lang="scss" scoped></style>

<template>
	<div id="search-card">
		<v-card v-if="card[type].length" class="search-card">
			<v-card-title >
				<h2>{{ formatMonth(card.budget_cycle) }}</h2>
			</v-card-title>

			<v-card-text>
<!--				<pre>{{ getComponentName(type) }}</pre>-->
				<component
					v-for="(item, index) in card[type]"
					:key="item.id"
					:data="item"
					:type="type"
					:hide-head="!!index"
					:show-divider="index + 1 < card[type].length"
					:is="getComponentName(type)"></component>

<!--				<v-list>-->
<!--					<template v-for="(item, index) in card[type]">-->
<!--						<v-list-tile :key="item.id">-->
<!--							{{ item.name }}-->
<!--							{{ item.paid_date }}-->
<!--							{{ item.amount }}-->
<!--						</v-list-tile>-->

<!--						<v-divider-->
<!--							v-if="index + 1 < card[type].length"-->
<!--							:key="(index * 10000)"></v-divider>-->
<!--					</template>-->
<!--				</v-list>-->
			</v-card-text>

			<v-card-actions
				:class="{
					'spent': ['banks', 'investments', 'jobs'].indexOf(type) === -1
				}"
				class="search-card__actions">
				<v-flex>
					<span>total </span>
					{{ totalAmount }}
				</v-flex>
			</v-card-actions>
		</v-card>
	</div>
</template>

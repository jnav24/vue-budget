<script src="./search.ts" lang="ts"></script>
<style src="./search.scss" lang="scss" scoped></style>

<template>
	<div id="search" class="page">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex>
						<h1 class="header__h1">Search</h1>
						<p>List of monthly budget. Add, update, or remove budgets and you can go to the budget template on this page.</p>
					</v-flex>
				</v-layout>

				<v-layout>
					<v-flex sm3>
						<SearchForm @runSearch="runSearch($event)"></SearchForm>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex sm8>
						<EmptyState
							v-if="!searchResults.length && showEmptyState && !loading"
							title="Search Results"
							text="Your search results will appear here"
							:hide-button="true"></EmptyState>

						<EmptyState
							v-if="!searchResults.length && !showEmptyState && !loading"
							title="No Results Found"
							text="Try adjusting your search criteria to find what you are looking for."
							:hide-button="true"></EmptyState>

						<div v-if="!searchResults.length && loading">Loading...</div>

						<template v-if="searchResults.length && !loading">
							<template v-for="result in searchResults">
								<v-card v-if="result[type].length" class="search-card">
									<v-card-title >
										<h2>{{ formatMonth(result.budget_cycle) }}</h2>
									</v-card-title>

									<v-card-text>
										<v-list>
											<template v-for="(item, index) in result[type]">
												<v-list-tile :key="item.id">
													{{ item.name }}
													{{ item.paid_date }}
													{{ item.amount }}
												</v-list-tile>

												<v-divider
													v-if="index + 1 < result[type].length"
													:key="index"></v-divider>
											</template>
										</v-list>
									</v-card-text>

									<v-card-actions
										:class="{
										'spent': ['banks', 'investments'].indexOf(type) === -1
									}"
										class="search-card__actions">
										<v-flex>
											<span>total </span>
											$34,560,941.00
										</v-flex>
									</v-card-actions>
								</v-card>
							</template>
						</template>

						<pre>{{ searchResults }}</pre>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

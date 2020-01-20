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

				<SearchForm @runSearch="runSearch($event)"></SearchForm>

				<v-layout>
					<v-flex>
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

						<LoadingState v-if="!searchResults.length && loading"></LoadingState>

						<template v-if="searchResults.length && !loading">
							<SearchCardTotals></SearchCardTotals>

							<SearchCard
								v-for="result in searchResults"
								:key="result.id"
								:type="type"
								:card="result"></SearchCard>
						</template>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

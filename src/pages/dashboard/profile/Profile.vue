<script src="./profile.ts" lang="ts"></script>
<style src="./profile.scss" lang="scss" scoped></style>

<template>
	<div class="profile page">
		<v-layout justify-center>
			<v-flex lg8 xl8>
				<h1 class="header__h1">Profile</h1>

				<v-card>
					<v-card-text>
						<v-tabs
							slider-color="success"
							v-model="activeTab">
							<v-tab>User Profile</v-tab>
							<v-tab>Security</v-tab>

							<v-tab-item>
								<UserProfile></UserProfile>
							</v-tab-item>

							<v-tab-item>
								hello security
							</v-tab-item>
						</v-tabs>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

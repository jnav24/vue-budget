<script src="./profile.ts" lang="ts"></script>
<style src="./profile.scss" lang="scss" scoped></style>

<template>
	<div class="profile page">
		<div class="banner-container">
			<div class="banner-bkgd"></div>
			<img src="@/assets/images/banner_user_profile.jpg" class="banner-image">
		</div>

		<v-layout style="position: relative;z-index: 2;" justify-center>
			<v-flex lg8 xl6>
				<h1 class="header__h1 invert">Profile</h1>

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
								<UserSecurity></UserSecurity>
							</v-tab-item>
						</v-tabs>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script src="./dashboard.ts" lang="ts"></script>
<style src="./dashboard.scss" lang="scss" scoped></style>

<template>
	<div class="dashboard">
		<MainNavMobile :menu="menu" :show-menu="mobileMenu" @updateMenu="updateMenu($event)"></MainNavMobile>

		<v-toolbar class="toolbar">
			<v-layout justify-center>
				<v-flex lg8 xl6>
					<v-layout>
						<v-btn
							class="menu-btn"
							color="primary"
							@click.stop="mobileMenu = !mobileMenu">
							<v-icon>menu</v-icon>
						</v-btn>

						<v-layout align-center>
							<v-flex lg2 xl2>
								<v-layout justify-start>
									<v-toolbar-title>
										<v-layout align-center>
											<img src="@/assets/images/logo_1.png" alt="Dime Budget" style="width: 5em">
										</v-layout>
									</v-toolbar-title>
								</v-layout>
							</v-flex>

							<v-flex lg8 xl8>
								<v-layout justify-center>
									<MainNavDesktop :menu="menu"></MainNavDesktop>
								</v-layout>
							</v-flex>

							<v-flex lg2 xl2>
								<v-layout justify-end>
									<v-menu bottom left offset-y>
										<v-btn slot="activator" dark icon>
											<v-icon>account_circle</v-icon>
										</v-btn>

										<v-list>
											<v-list-tile @click="goToProfile()">
												<v-list-tile-title>Profile</v-list-tile-title>
											</v-list-tile>

											<v-list-tile @click="logout()">
												<v-list-tile-title>Logout</v-list-tile-title>
											</v-list-tile>
										</v-list>
									</v-menu>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-toolbar>

		<LoginDialog :dialog="showLogin"></LoginDialog>

		<transition name="dashboard-transition"
					enter-active-class="animated fadeInRight"
					leave-active-class="animated fadeOutLeft">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script src="./onboard.ts" lang="ts"></script>
<style src="./onboard.scss" lang="scss" scoped></style>

<template>
	<div class="onboard">
		<div class="bg-color"></div>
		<div class="bg-image"></div>

		<div class="onboard--content">
			<router-link :to="{ name: 'login' }">
				<img src="@/assets/images/logo_1.png" alt="Dime Budget" class="logo">
			</router-link>

			<transition name="onboard-transition"
						enter-active-class="animated fadeInUp"
						leave-active-class="animated fadeOutLeft">
				<router-view></router-view>
			</transition>
		</div>

		<v-footer absolute class="onboard--footer">
			<v-layout justify-center>
				&copy; {{ currentYear }} All Rights Reserved
			</v-layout>
		</v-footer>
	</div>
</template>

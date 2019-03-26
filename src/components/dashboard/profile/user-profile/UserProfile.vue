<script src="./user-profile.ts" lang="ts"></script>
<style src="./user-profile.scss" lang="scss" scoped></style>

<template>
	<div class="profile user-profile">
		<h3 class="header__h3 mt20">Basic Details</h3>

		<v-layout>
			<v-flex lg5 xl5>
				<v-text-field
					label="First Name"></v-text-field>
			</v-flex>

			<v-spacer></v-spacer>

			<v-flex lg5 xl5>
				<v-text-field
					label="Last Name"></v-text-field>
			</v-flex>
		</v-layout>

		<v-layout>
			<v-flex lg5 xl5>
				<v-text-field
					disabled
					label="Email"></v-text-field>
			</v-flex>
		</v-layout>

		<v-divider style="margin: 30px 0;"></v-divider>

		<h2 class="header__h3">Vehicles</h2>
	</div>
</template>

<script src="./404.ts" lang="ts"></script>
<style src="./404.scss" lang="scss" scoped></style>

<template>
	<div class="page error-404">
		<v-layout style="position: relative;z-index: 2;" justify-center>
			<v-flex lg8 xl6>
				<div class="img-container">
					<img src="@/assets/images/404.jpg" alt="">
				</div>

				This page does not exist, bitch!

				<v-btn
					color="success">
					<span>Go to Home</span>
				</v-btn>
			</v-flex>
		</v-layout>
	</div>
</template>

<script src="./404.ts" lang="ts"></script>
<style src="./404.scss" lang="scss" scoped></style>

<template>
	<div class="page error-404">
		<v-layout style="position: relative;z-index: 2;" justify-center>
			<v-flex lg6 xl4>
				<div class="img-container">
					<img src="@/assets/images/404-2.png" alt="">
				</div>

				<div style="text-align: center">
					<h2>Oops! We can't seem to find the page you are looking for.</h2>

					<v-btn
						:to="{ name: 'dashboard' }"
						color="success">
						<span>Go Home</span>
					</v-btn>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

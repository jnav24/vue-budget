<script src="./empty-state.ts" lang="ts"></script>
<style src="./empty-state.scss" lang="scss" scoped></style>

<template>
	<div class="empty-state" :class="{'empty-fill': fill}">
		<v-layout justify-center>
			<div class="icon-container__empty">
				<img src="@/assets/images/empty_state_bino.jpg" alt="" class="icon">
			</div>
		</v-layout>

		<h3 class="header__h3">{{ title }}</h3>
		<p class="empty-text">{{ text }}</p>

		<v-btn
			@click="emitButtonClick()"
			:disabled="isDisabled"
			class="empty-button"
			:class="{'button-fill': fill}">
			<v-icon>add</v-icon>
			<span>{{ buttonText }}</span>
		</v-btn>
	</div>
</template>

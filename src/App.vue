<template>
	<div id="app" :class="{'dialog-mode': $store.state.Controls.isDialogOpened }">
		<v-app>
			<router-view/>
		</v-app>
	</div>
</template>

<style lang="scss">
	.v-toolbar {
		position: relative;
		z-index: 10;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		@include font;

		&.dialog-mode {
			overflow: hidden;
		}
	}

	#nav {
		padding: 30px;

		a {
			color: map_get($colors, link_dark);
			font-weight: bold;

			&.router-link-exact-active {
				color: map_get($colors, link_dark_active);
			}
		}
	}
</style>

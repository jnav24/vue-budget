<script src="./login-dialog.ts" lang="ts"></script>
<style src="./login-dialog.scss" lang="scss" scoped></style>

<template>
	<v-dialog
		class="dialogs login"
		persistent
		max-width="500px"
		v-model="showDialog">
		<v-card>
			<v-card-title class="dialog--title">Login Error</v-card-title>

			<v-card-text>
				<v-alert
					:value="alert.display"
					:type="alert.type">
					{{ alert.msg }}
				</v-alert>

				<v-alert
					style="margin-bottom: 30px;"
					:value="true"
					outline
					type="error">
					Your session has timed out. Please re-enter your password to continue or sign into another account
				</v-alert>

				<v-form ref="loginDialogForm" v-model="loginDialogValid">
					<v-text-field
						type="password"
						v-model="form.password.value"
						:rules="form.password.rules"
						label="Password"></v-text-field>
				</v-form>
			</v-card-text>

			<v-card-actions style="padding-bottom: 15px;">
				<v-btn
					@click="logout()">
					Sign Into Another Account
				</v-btn>

				<v-btn
					@click="login()"
					color="success"
					:disabled="!loginDialogValid">
					Login
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script src="./login-dialog.ts" lang="ts"></script>
<style src="./login-dialog.scss" lang="scss" scoped></style>

<template>
	<v-dialog
		class="dialogs login"
		max-width="500px"
		v-model="showDialog">
		<v-card>
			<v-card-title class="dialog--title">Login Error</v-card-title>

			<v-card-text>
				<v-alert
					style="margin-bottom: 30px;"
					:value="true"
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

			<v-card-actions>
				<v-btn>Sign Into Another Account</v-btn>

				<v-btn
					color="success"
					:disabled="!loginDialogValid">
					Login
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

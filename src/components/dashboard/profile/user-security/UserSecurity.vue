<script src="./user-security.ts" lang="ts"></script>
<style src="./user-security.scss" lang="scss" scoped></style>

<template>
	<div class="profile user-security">
		<v-form ref="form" v-model="formValid">
			<div class="content">
				<v-alert
					style="margin-bottom: 30px;"
					:value="alert.display"
					transition="slide-y-transition"
					:type="alert.type">
					{{ alert.msg }}
				</v-alert>

				<h3 class="header__h3 mt20">Reset Password</h3>

				<v-layout>
					<v-flex lg5 xl5>
						<v-text-field
							type="password"
							v-model="form.current_password.value"
							:rules="form.current_password.rules"
							label="Current Password"></v-text-field>

						<v-text-field
							@input="validatePassword()"
							type="password"
							v-model="form.new_password.value"
							:rules="form.new_password.rules"
							label="New Password"></v-text-field>

						<v-text-field
							@input="validateConfirmPassword()"
							type="password"
							v-model="form.confirm_password.value"
							:rules="form.confirm_password.rules"
							label="Confirm New Password"></v-text-field>
					</v-flex>

					<v-spacer></v-spacer>

					<v-flex lg6 xl6>
						<div class="password-checker">
							<h3>Password must have</h3>

							<ul>
								<li>
									<v-icon v-if="!validLength" class="default-color">radio_button_unchecked</v-icon>
									<v-icon v-if="validLength" dark>check_circle</v-icon>
									<span>Password must be at least 8 characters</span>
								</li>
								<li>
									<v-icon v-if="!validUppercase" class="default-color">radio_button_unchecked</v-icon>
									<v-icon v-if="validUppercase" dark>check_circle</v-icon>
									<span>Password must contain at least 1 uppercase</span>
								</li>
								<li>
									<v-icon v-if="!validLowercase" class="default-color">radio_button_unchecked</v-icon>
									<v-icon v-if="validLowercase" dark>check_circle</v-icon>
									<span>Password must contain at least 1 lowercase</span>
								</li>
								<li>
									<v-icon v-if="!validNumber" class="default-color">radio_button_unchecked</v-icon>
									<v-icon v-if="validNumber" dark>check_circle</v-icon>
									<span>Password must contain at least 1 number</span>
								</li>
								<li>
									<v-icon v-if="!validMatch" class="default-color">radio_button_unchecked</v-icon>
									<v-icon v-if="validMatch" dark>check_circle</v-icon>
									<span>Passwords must match</span>
								</li>
							</ul>
						</div>
					</v-flex>
				</v-layout>
			</div>

			<div class="actions">
				<v-btn
					@click="submit()"
					:disabled="!formValid"
					class="btn--save"
					color="success">Save</v-btn>
			</div>
		</v-form>
	</div>
</template>

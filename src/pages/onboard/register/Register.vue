<script src="./register.ts" lang="ts"></script>
<style src="./register.scss" lang="scss" module></style>

<template>
	<div :class="[$style['page-sub'], $style.register]">
		<v-layout justify-center>
			<v-flex xs12 sm10 md6 lg4 xl3>
				<v-form ref="registerForm" v-model="registerValid">
					<v-card :class="[$style['onboard--flex']]">
						<v-card-title :class="[$style.header]">Register</v-card-title>

						<v-alert
							:value="alert.display"
							transition="slide-y-transition"
							:type="alert.type">
							{{ alert.msg }}
						</v-alert>

						<v-card-text v-if="!showRegisterForm">
							<p style="font-size: 24px;margin-bottom: 0;">Sorry, registration is closed.</p>
							<p style="font-size: 18px;">Please try again later.</p>
						</v-card-text>

						<v-card-text v-if="showRegisterForm">
							<v-layout>
								<v-flex xs12 sm5 md5 lg5>
									<v-text-field
										v-model="form.first_name.value"
										:rules="form.first_name.rules"
										label="First Name"
										required></v-text-field>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm6 md6 lg6>
									<v-text-field
										v-model="form.last_name.value"
										:rules="form.last_name.rules"
										label="Last Name"
										required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout>
								<v-flex>
									<v-text-field
										v-model="form.username.value"
										:rules="form.username.rules"
										label="Email"
										required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout>
								<v-flex xs12 sm5 md5 lg5>
									<v-text-field
										@input="validateAll()"
										v-model="form.password.value"
										:rules="form.password.rules"
										label="Password"
										type="password"
										required></v-text-field>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm6 md6 lg6>
									<v-text-field
										@input="validateAll()"
										v-model="form.confirm_password.value"
										:rules="form.confirm_password.rules"
										label="Confirm Password"
										type="password"
										required></v-text-field>
								</v-flex>
							</v-layout>
						</v-card-text>

						<v-card-actions v-if="showRegisterForm">
							<v-btn
								color="button"
								@click="submit"
								:disabled="!registerValid"
								block>
								Register
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>

				<v-layout :class="[$style['register-details']]">
					<p>
						Already have an account? <router-link :to="{ name: 'login' }">Login</router-link>
					</p>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

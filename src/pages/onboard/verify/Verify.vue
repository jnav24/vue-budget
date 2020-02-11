<script src="./verify.ts" lang="ts"></script>
<style src="./verify.scss" lang="scss" scoped></style>

<template>
	<div id="verify" class="page-sub">
		<v-layout justify-center>
			<v-flex xs12 sm10 md6 lg4 xl3>
				<v-form ref="form" v-model="formValid">
					<v-card>
						<v-card-title>
							<v-flex sm2>
								<v-icon style="font-size: 73px;">security</v-icon>
							</v-flex>
							<v-flex style="padding-left: 10px;text-align: left;" sm10>
								<h1>Verify your device</h1>
								<p v-if="!isExpired">This device isn't recognized. We have sent you an email to your email address on file. For your security, enter the your verification code, from the email, in order to continue.</p>
								<p v-if="isExpired">It still looks like you need to verify your current device. Unfortunately, this page has expired. Click on the button below and we will send you a new verification code to the email on file.</p>
							</v-flex>
						</v-card-title>

						<v-alert
							class="alert"
							:value="alert.display"
							transition="slide-y-transition"
							:type="alert.type">
							{{ alert.msg }}
						</v-alert>

						<v-card-text>
							<v-text-field
								v-if="!isExpired"
								v-model="form.verify.value"
								:rules="form.verify.rules"
								label="Enter Your Verification Code"></v-text-field>
						</v-card-text>

						<v-card-actions v-if="!emailSent">
							<v-btn
								v-if="!isExpired"
								color="button"
								@click="submit"
								:disabled="!formValid || loading"
								block>
								<v-progress-circular
									:size="15"
									color="accent"
									v-if="loading"
									indeterminate></v-progress-circular>
								<span v-if="!loading">Submit</span>
							</v-btn>
							<v-btn
								v-if="isExpired"
								block
								color="button"
								@click="resendEmail"
								:disabled="loading">
								<v-progress-circular
									:size="15"
									color="accent"
									v-if="loading"
									indeterminate></v-progress-circular>
								<span v-if="!loading">Resend Email</span>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-flex>
		</v-layout>
	</div>
</template>

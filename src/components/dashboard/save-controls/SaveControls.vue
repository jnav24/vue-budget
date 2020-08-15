<script src="./save-controls.ts" lang="ts"></script>
<style src="./save-controls.scss" lang="scss" scoped></style>

<template>
	<div class="save-controls">
		<v-toolbar height="50" class="toolbar">
			<v-layout align-center justify-center>
				<v-flex lg8 xl6>
					<v-layout justify-end>
						<v-btn @click="buttonClicked({ save: false, exit: true })">Cancel</v-btn>
						<v-btn
							@click="buttonClicked({ save: true, exit: false })"
							color="success"
							:disabled="!canSave"
							class="save-btn">
							<v-icon class="save-btn__icon">save</v-icon>
							<span class="save-btn__text">Save</span>
						</v-btn>
						<v-btn
							@click="buttonClicked({ save: true, exit: true })"
							color="success"
							:disabled="!canSave"
							class="save-btn">
							<v-icon class="save-btn__icon">exit_to_app</v-icon>
							<span class="save-btn__text">Save &amp; Exit</span>
						</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-toolbar>
	</div>
</template>

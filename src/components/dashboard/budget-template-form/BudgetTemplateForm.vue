<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: ['reset', 'editMode'],
	watch: {
		reset(value: boolean) {
			if (value) {
				this.resetForm();
			}
		},
	},
	data() {
		return {
			templateValid: false,
		};
	},
	methods: {
		resetForm() {
			const ref: any = this.$refs.templateForm;
			ref.reset();
		},
		cancel() {
			this.$emit('buttonClicked', { valid: false, update: false });
		},
		submit() {
			this.$emit('buttonClicked', { valid: this.templateValid, update: false });
		},
		update() {
			this.$emit('buttonClicked', { valid: this.templateValid, update: true });
		},
	},
});
</script>

<template>
	<v-form ref="templateForm" v-model="templateValid">
		<slot></slot>

		<v-layout justify-end>
			<v-btn
				@click="cancel()">Cancel</v-btn>

			<v-btn
				color="secondary"
				v-if="!editMode"
				:disabled="!templateValid"
				@click="submit()">Add Expense</v-btn>

			<v-btn
				color="secondary"
				v-if="editMode"
				:disabled="!templateValid"
				@click="update()">Update Expense</v-btn>
		</v-layout>
	</v-form>
</template>

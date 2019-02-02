<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: ['reset'],
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
			console.log(this.reset);
			const ref: any = this.$refs.templateForm;
			ref.reset();
		},
		submit() {
			this.$emit('buttonClicked', { valid: this.templateValid });
		},
	},
});
</script>

<template>
	<v-form ref="templateForm" v-model="templateValid">
		<slot></slot>

		<v-layout justify-end>
			<v-btn
				@click="submit()">Cancel</v-btn>

			<v-btn
				color="secondary"
				:disabled="!templateValid"
				@click="submit()">Add Expense</v-btn>
		</v-layout>
	</v-form>
</template>

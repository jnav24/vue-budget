<script src="./template.ts" lang="ts"></script>
<style src="./template.scss" lang="scss" scoped></style>

<template>
	<div class="page template">
		<v-toolbar height="50" style="background: #474747; position: absolute; top: 0px; left: 0;">
			<v-layout align-center justify-end>
				<v-btn :to="{ name: 'budget-list' }">Cancel</v-btn>
				<v-btn
					@click="saveTemplate()"
					color="success"
					:disabled="canSaveTemplates()"
					style="color: #fff;">
					<v-icon>save</v-icon>
					<span style="display: inline-block; margin-left: 7px;">Save</span>
				</v-btn>
			</v-layout>
		</v-toolbar>

		<AlertDialog
			:data="alertData"
			:dialog="alertDialog"
			@updateDialog="emitAlertDialog($event)"></AlertDialog>

		<AddBudgetExpense
			:dialog="expenseDialog"
			:type="expenseType"
			:data="expenseData"
			@updateDialog="closeEditBudgetDialog($event)"></AddBudgetExpense>

		<v-btn @click="alertDialog = true">Test alert</v-btn>

		<v-layout justify-center>
			<v-flex lg8 xl8>
				<v-layout align-center style="margin-bottom: 25px;">
					<v-flex lg7 xl7>
						<h1 class="header__h1">Budget Template</h1>
						<p>You can add all your bank, credit cards and other monthly expenses, you would like to track on this page. Everything entered on this page, will show when you add a new monthly budget.</p>
						<p>If you were to delete an item, it will still show on your already existing budgets but it will not show on new budgets.</p>
					</v-flex>

					<v-flex>
						<v-layout justify-end>
							<v-btn
								@click="expenseDialog = true"
								color="success">
								<v-icon class="prepend-icon">add</v-icon>
								<span>Expense</span>
							</v-btn>
						</v-layout>
					</v-flex>
				</v-layout>

				<EmptyState
					v-if="isTemplateEmpty()"
					text="You haven't set up your template set. Click the add button below to get started."
					button-text="Template"
					@buttonClicked="expenseDialog = true"></EmptyState>

				<BudgetTemplate
					v-for="(templateKey, index) in Object.keys(expenses)"
					v-if="expenses[templateKey].length"
					:key="index"
					:type="templateKey"
					:name="getTemplateName(templateKey)"
					:headers="getTemplateHeaders(templateKey)"
					:data="getTemplateList(templateKey)"
					@emitEditBudget="openEditBudgetDialog($event)"></BudgetTemplate>
			</v-flex>
		</v-layout>
	</div>
</template>

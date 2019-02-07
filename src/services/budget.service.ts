class BudgetService {
    /**
     * Loops through list of expenses by type; returns true if empty
     *
     * @param expensesList
     * @returns {boolean}
     */
    public isExpenseListEmpty(expensesList: any): boolean {
        let totalEmpty = 0;
        if (typeof expensesList !== 'undefined') {
            const expenses: string[] = Object.keys(expensesList);
            const totalExpenses = expenses.length;

            for (const template of expenses) {
                if (!(expensesList as any)[template].length) {
                    totalEmpty = totalEmpty + 1;
                }
            }

            return totalEmpty === totalExpenses;
        }

        return true;
    }
}

export default BudgetService;

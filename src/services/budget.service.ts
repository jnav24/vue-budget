import store from '@/store/index';

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

    /**
     * Gets the type name from type id from the types store
     *
     * @param {string} value
     * @param {string} type
     * @returns {string}
     */
    public getType(value: string, type: string): string {
        let result = value;

        if (typeof (store.state.Types as any)[type] !== 'undefined') {
            const index = (store.state.Types as any)[type].findIndex((obj: any) => obj.id === Number(value));

            if (index > -1) {
                result = (store.state.Types as any)[type][index].name;
            }
        }

        return result;
    }
}

export default BudgetService;

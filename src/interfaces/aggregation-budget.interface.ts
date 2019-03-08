export interface AggregationBudgetInterface {
    [key: string]: {
        earned: string[];
        saved: string[];
        spent: string[];
    };
}

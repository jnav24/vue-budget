export interface AggregationUnpaidInterface {
    id: number;
    totals: {
        credit_cards: number;
        medical: number;
        miscellaneous: number;
        utilities: number;
    };
}

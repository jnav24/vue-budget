class CurrencyService {
    /**
     * Returns the amount to desired dollar format
     *
     * @param {string} amount
     * @param {string} currency
     * @returns {string}
     */
    public setCurrency(amount: string, currency: string = 'usd'): string {
        if (typeof amount !== 'string' || amount.trim() === '' || currency.trim() === '') {
            return 'No value entered';
        }

        const func = 'set' + currency.charAt(0).toUpperCase() + currency.slice(1) + 'Currency';

        if (typeof (this as any)[func] !== 'function') {
            return 'Error occurred';
        }

        return (this as any)[func](amount);
    }

    /**
     * Called from setCurrency() dynamically
     *
     * @param {string} amount
     * @returns {string}
     */
    private setUsdCurrency(amount: string): string {
        let cents: string = '00';
        const dollarList = amount.split('.');

        if (dollarList.length > 1) {
            cents = dollarList[dollarList.length - 1].substring(0, 2);
        }

        const dollar = dollarList[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return '$' + dollar + '.' + cents;
    }
}

export default CurrencyService;

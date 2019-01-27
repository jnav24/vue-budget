export interface FormInterface {
    [key: string]: {
        value: any;
        rules: Array<( (v: string | boolean | number) => string | boolean | number)>;
    };
}

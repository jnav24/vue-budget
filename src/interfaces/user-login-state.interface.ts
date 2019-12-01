export interface UserLoginStateInterface {
    csrf: string;
    timeout: boolean;
    throttle: {
        attempts: number;
        allowed: number
    };
}

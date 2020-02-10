export interface UserLoginStateInterface {
    timeout: boolean;
    throttle: {
        attempts: number;
        allowed: number;
    };
    verify: {
        expires_at: string;
    };
}

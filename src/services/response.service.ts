import {ResponseInterface} from '@/interfaces/response.interface';
import {ResponseDataInterface} from '@/interfaces/response-data.interface';

class ResponseService {
    private msg: string = 'Something unexpected happened. Please try again later.';

    public getSuccessResponse(msg: string = '', data: any[] | {} = {}): ResponseInterface {
        return { success: true, msg, data};
    }

    public getFailedResponse(msg: string = this.msg): ResponseInterface {
        if (msg.trim() === '') {
            msg = this.msg;
        }

        return { success: false, msg };
    }

    public isSuccessResponse(code: number): boolean {
        return code >= 200 && code <= 299;
    }

    public isFailedResponse(code: number): boolean {
        return code >= 400 && code <= 499;
    }

    public getDataFromResponse(response: ResponseDataInterface) {
        const data = response.data.data;
        return data[Object.keys(data)[0]];
    }
}

export default ResponseService;

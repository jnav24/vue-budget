import axios, {AxiosResponse} from 'axios';
import {UrlInterface} from '@/interfaces/url.interface';
import CookieService from '@/services/cookies.service';
import {ResponseDataInterface} from '@/interfaces/response-data.interface';

const userCookieName: any = process.env.VUE_APP_TOKEN;
const domain: any = process.env.VUE_APP_API_DOMAIN;

class HttpService {
    constructor(private cookieService: CookieService) {
        // ...
    }

    public async get(data: UrlInterface): Promise<AxiosResponse> {
        return await axios({
            method: 'GET',
            url: domain + data.url,
            params: data.params || {},
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': 'hello',
            },
        });
    }

    public async post(data: UrlInterface): Promise<AxiosResponse> {
        return await axios({
            method: 'POST',
            url: domain + data.url,
            data: data.params || {},
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': 'hello',
            },
        });
    }

    public async authGet(data: UrlInterface): Promise<AxiosResponse> {
        return await axios({
            method: 'GET',
            url: domain + data.url,
            params: data.params || {},
            headers: {
                Authorization: `Bearer ${this.cookieService.getCookie(userCookieName)}`,
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': 'hello',
            },
        });
    }

    public async authPost(data: UrlInterface): Promise<AxiosResponse> {
        return await axios({
            method: 'POST',
            url: domain + data.url,
            data: data.params || {},
            headers: {
                Authorization: `Bearer ${this.cookieService.getCookie(userCookieName)}`,
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': 'hello',
            },
        });
    }

    public async authDelete(data: UrlInterface): Promise<AxiosResponse> {
        return await axios({
            method: 'DELETE',
            url: domain + data.url,
            data: data.params || {},
            headers: {
                Authorization: `Bearer ${this.cookieService.getCookie(userCookieName)}`,
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': 'hello',
            },
        });
    }

    public async authGetCallOrGetLocal(
        store: string, state: string, data: UrlInterface,
    ): Promise<AxiosResponse | ResponseDataInterface> {
        const storedData = this.cookieService.checkStorage(store, state);

        if (storedData) {
            return await new Promise<ResponseDataInterface>((resolve: any) => {
                resolve({
                    status: 200,
                    data: {
                        data: {
                            stored: storedData,
                        },
                    },
                });
            });
        }

        return await this.authGet(data);
    }
}

export default HttpService;

import {ActionTree} from 'vuex';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {cookiesService, httpService, responseService, userService} from '@/module';
import {UserLoginInterface} from '@/interfaces/user-login.interface';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {UserRegisterInterface} from '@/interfaces/user-register.interface';
import {ProfileInterface} from '@/interfaces/profile.interface';

const userCookieName: any = process.env.VUE_APP_TOKEN;

const actions: ActionTree<UserStateInterface, RootStateInterface> = {
    async isLoggedIn({ commit, dispatch }): Promise<ResponseInterface> {
        try {
            const cookie = cookiesService.getCookie(userCookieName);

            if (cookie !== null) {
                const response = await httpService.authGet({ url: 'auth/user' });

                if (responseService.isSuccessResponse(response.status)) {
                    commit('ADD_USER_VEHICLES', response.data.data.vehicles);
                    commit('ADD_USER', response.data.data.user);
                    return responseService.getSuccessResponse();
                }
            }

            dispatch('logUserOut');
            return responseService.getFailedResponse();
        } catch (error) {
            dispatch('logUserOut');
            return responseService.getFailedResponse();
        }
    },

    async logUserIn({ commit, dispatch }, userData: {}): Promise<ResponseInterface> {
        try {
            const loginData: UserLoginInterface = userService.setUserDataFromForm(userData);
            const data: UrlInterface = {
                url: 'auth/login',
                params: loginData,
            };
            const res: AxiosResponse = await httpService.post(data);

            if (responseService.isSuccessResponse(res.status)) {
                commit('TOKEN_EXPIRED', false);
                commit('ADD_USER_VEHICLES', res.data.data.vehicles);
                commit('ADD_USER', res.data.data.user);
                cookiesService.setCookie(userCookieName, res.data.data.token);
                return responseService.getSuccessResponse();
            }

            dispatch('logUserOut');
            return responseService.getFailedResponse();
        } catch (error) {
            const err = error.response;

            if (typeof err !== 'undefined' && responseService.isFailedResponse(err.status)) {
                let message: string = '';

                if (typeof err.data.data.email !== 'undefined') {
                    message = 'Please enter your email';
                } else if (typeof err.data.data.password !== 'undefined') {
                    message = 'Please enter your password';
                } else if (typeof err.data.message !== 'undefined') {
                    message = err.data.message;
                }

                return responseService.getFailedResponse(message);
            } else {
                return responseService.getFailedResponse();
            }
        }
    },

    async registerUser({ commit, dispatch }, userData: {}): Promise<ResponseInterface> {
        try {
            const registerData: UserRegisterInterface = userService.setUserDataFromForm(userData);
            const data: UrlInterface = {
                url: 'register',
                params: registerData,
            };
            const response: AxiosResponse = await httpService.post(data);

            if (responseService.isSuccessResponse(response.status)) {
                return await dispatch('logUserIn', {
                    username: registerData.username,
                    password: registerData.password,
                });
            }

            return responseService.getFailedResponse();
        } catch (error) {
            const err = error.response;

            if (typeof err !== 'undefined' && responseService.isFailedResponse(err.status)) {
                let message: string = '';
                const errorMessages = Object.keys(err.data.data);

                for (const msg of errorMessages) {
                    if (msg === 'password') {
                        message = 'Password is not valid.';
                    } else {
                        message = err.data.data[msg].shift();
                    }
                }

                return responseService.getFailedResponse(message);
            } else {
                return responseService.getFailedResponse();
            }
        }
    },

    async updateUserProfile({ commit }, payload: ProfileInterface): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'user-profile',
                params: payload,
            };

            const response: AxiosResponse = await httpService.authPost(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('ADD_USER', response.data.data.profile);
                commit('ADD_USER_VEHICLES', response.data.data.vehicles);
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            if (responseService.isTokenExpired(error.response.data.message)) {
                commit('TOKEN_EXPIRED', true);
            }

            return responseService.getFailedResponse();
        }
    },

    async updatePassword({ commit }, payload: { newPassword: string, oldPassword: string }) {
        try {
            const data: UrlInterface = {
                url: 'auth/update-password',
                params: {
                    newPassword: payload.newPassword,
                    oldPassword: payload.oldPassword,
                },
            };
            const response: AxiosResponse = await httpService.authPost(data);

            if (responseService.isSuccessResponse(response.status)) {
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            if (responseService.isTokenExpired(error.response.data.message)) {
                commit('TOKEN_EXPIRED', true);
            }

            return responseService.getFailedResponse();
        }
    },
};

export default actions;

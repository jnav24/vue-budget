import {UserInterface} from '@/interfaces/user.interface';
import {UserLoginInterface} from '@/interfaces/user-login.interface';
import {UserRegisterInterface} from '@/interfaces/user-register.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import { AxiosResponse } from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import { cookiesService, responseService, httpService, userService } from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/interfaces/user-state.interface';

const user: UserInterface = {} as UserInterface;
const userCookieName: any = process.env.VUE_APP_TOKEN;

const currentState: UserStateInterface = {
    user,
};

const getters: GetterTree<UserStateInterface, RootStateInterface> = {};

const actions: ActionTree<UserStateInterface, RootStateInterface> = {
    async isLoggedIn({ commit, dispatch }): Promise<ResponseInterface> {
        try {
            const cookie = cookiesService.getCookie(userCookieName);

            if (cookie !== null) {
                const response = await httpService.authGet({ url: 'auth/user' });

                if (responseService.isSuccessResponse(response.status)) {
                    commit('addUser', response.data.data.user);
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
                commit('addUser', res.data.data.user);
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
};

const mutations: MutationTree<UserStateInterface> = {
    addUser(state, usr: UserInterface) {
        state.user = usr;
    },
};

const User: Module<UserStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default User;

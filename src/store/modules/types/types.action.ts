import {ActionTree} from 'vuex';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {globalService, httpService, responseService} from '@/module';

const actions: ActionTree<TypesStateInterface, RootStateInterface> = {
    async getAllBillTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'types/bill',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                const {bill_types, types} = response.data.data;
                commit('ADD_BILL_TYPES', bill_types);

                for (const [typeName, typeList] of Object.entries(types)) {
                    commit('ADD_TYPE', {
                        type: globalService.camelCase(typeName),
                        typeList,
                    });
                }
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
};

export default actions;

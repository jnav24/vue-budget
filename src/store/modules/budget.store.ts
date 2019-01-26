import {ActionContext, Module} from 'vuex';
import {ResponseInterface} from '@/interfaces/response.interface';
import {responseService} from '@/module';

const budgetList: any[] = [];

const Budget: Module<any, any> = {
    state: {
        budgetList,
    },
    getters: {},
    actions: {
        async getAllBudgets({ commit }: ActionContext<any, any>): Promise<ResponseInterface> {
            try {
                setTimeout(() => {
                    const data: any[] = [
                        { user_id: 1, name: 'January Budget', created_at: '2019-01-01 00:00:00' },
                    ];
                    commit('addBudget', data);
                    return responseService.getSuccessResponse();
                }, 1000);

                return responseService.getFailedResponse();
            } catch (error) {
                return responseService.getFailedResponse();
            }
        },
    },
    mutations: {
        addBudget(state: any, payload: any) {
            state.budgetList = payload;
        },
    },
};

export default Budget;

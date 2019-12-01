import Vue from 'vue';
import {MutationTree} from 'vuex';
import {BudgetTemplateStateInterface} from '@/store/modules/budget-template/budget-template-state.interface';
import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';
import {globalService} from '@/module';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {BudgetTemplateRemoveInterface} from '@/interfaces/budget-template-remove.interface';

const mutations: MutationTree<BudgetTemplateStateInterface> = {
    ADD_ALL_BUDGET_TEMPLATES(state, payload: BudgetTemplateInterface) {
        state.templates = { id: payload.id, expenses: { ...globalService.sortObject(payload.expenses) } };
    },

    /**
     * @deprecated
     * @param state
     * @param {BudgetListAddInterface} payload
     */
    addBudgetTemplate(state, payload: BudgetListAddInterface) {
        const tempData = { ...state.templates };

        (tempData.expenses as any)[payload.type] = [...(tempData.expenses as any)[payload.type], payload.data];

        state.templates = {
            id: state.templates.id,
            expenses: {
                ...globalService.sortObject(tempData.expenses),
            },
        };
    },

    /**
     * @deprecated
     * @param state
     * @param {BudgetListAddInterface} payload
     */
    updateBudgetTemplate(state, payload: BudgetListAddInterface) {
        const tempData = { ...state.templates };
        const index = (tempData.expenses as any)[payload.type]
            .findIndex((obj: any) => {
                console.log(obj);
                return obj.id === payload.data.id;
            });

        Vue.set((tempData.expenses as any)[payload.type], index, payload.data);
    },

    RESET_BUDGET_TEMPLATE_STATE(state) {
        state.canSave = false;
        state.templates = {} as BudgetTemplateInterface;
    },

    REMOVE_TEMPLATE_ELEMENT(state, payload: BudgetTemplateRemoveInterface) {
        const tempData = [...(state.templates.expenses as any)[payload.type]];
        const index = tempData.findIndex((obj: any) => obj.id === payload.id);
        tempData.splice(index, 1);

        state.templates = {
            id: state.templates.id,
            expenses: globalService.sortObject({
                ...state.templates.expenses,
                [payload.type]: tempData,
            }),
        };
    },
};

export default mutations;

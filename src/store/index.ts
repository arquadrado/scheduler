import { Field } from '@/models/field';
import { createStore } from 'vuex';

interface StateModel {
  fields: Field[];
  user: string;
}

export default createStore({
  state: {
    user: 'Sopa de Urso',
    fields: [],
  },
  getters: {
    fields(state) {
      return state.fields;
    },
  },
  mutations: {
    SET_FIELDS(state: StateModel, value: Field[]) {
      state.fields = value;
    },
    BOOK_SLOT(state: StateModel, data: { fieldId: string; slotIndex: number }) {
      const field = state.fields.find(
        (field: Field) => field.id === data.fieldId
      );

      if (field) {
        const slot = field.slots.find(slot => slot.index === data.slotIndex);

        if (slot) {
          slot.owner = state.user;
        }
      }
    },
  },
  actions: {
    setFields({ commit }, value: Field[]) {
      commit('SET_FIELDS', value);
    },
    bookSlot({ commit }, data: { fieldId: string; slotIndex: number }) {
      commit('BOOK_SLOT', data);
    },
  },
  modules: {},
});

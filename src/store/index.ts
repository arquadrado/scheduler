import { Field } from '@/models/field';
import { ScheduleSlot } from '@/models/schedule-slot';
import { createStore } from 'vuex';

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
    SET_FIELDS(state, value) {
      state.fields = value;
    },
    BOOK_SLOT(state, data) {
      const field = state.fields.find(
        (field: Field) => field.id === data.fieldId
      );

      console.log(state, data);

      if (typeof field !== 'undefined') {
        const slot = (field as Field).slots?.find(
          slot => slot.index === data.slotIndex
        );

        (slot as ScheduleSlot).owner = state.user;
      }
    },
  },
  actions: {
    setFields({ commit }, value) {
      commit('SET_FIELDS', value);
    },
    bookSlot({ commit }, data) {
      commit('BOOK_SLOT', data);
    },
  },
  modules: {},
});

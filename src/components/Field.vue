<template>
  <div class="field" :class="{ show: state.displaySlots }">
    <div class="slots">
      <!-- <div class="slot" v-for="slot in field.slots" :key="slot.index">
        <button>Schedule</button>
      </div> -->
    </div>
    <div class="info">
      {{ field.name }}

      <button @click="toggleSlots()">{{ toggleButtonMessage }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Field } from '@/models/field';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Field',
  props: {
    field: Field
  },
  setup() {
    const state = reactive({
      displaySlots: false
    });

    const toggleButtonMessage = computed(() => {
      return state.displaySlots ? 'Hide slots' : 'Display slots';
    });

    const toggleSlots = () => {
      state.displaySlots = !state.displaySlots;
    };

    return { state, toggleSlots, toggleButtonMessage };
  }
});
</script>

<style scoped lang="stylus">
.field {
  * {
    box-sizing: border-box;
  }
  width: calc((100vw - 16px) / 2);
  height: 100%;
  background: yellowgreen;
  display: flex;
  transition: width 200ms ease-out;
  padding: 2% 5%;
  .info {
    background: red;
    width: 100%;
    transition: width 200ms ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    button {
      // width: 100px;
    }
  }

  .slots {
    background: cyan;
    transition: width 200ms ease-out;
    width: 0;
  }

  &.show {
    transition: width 200ms ease-in;
    width: calc(100vw - 16px);
    .info {
      transition: width 200ms ease-in;
      background: red;
      width: 50%;
    }

    .slots {
      background: cyan;
      transition: width 200ms ease-in;
      width: 50%;
    }
  }
}
</style>

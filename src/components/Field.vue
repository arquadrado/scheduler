<template>
  <div
    class="field"
    :class="{ mobile: state.isMobile, show: state.displaySlots }"
  >
    <div class="card">
      <div class="info">
        {{ field.name }}
      </div>
      <div class="slots">
        <div class="slot" v-for="slot in field.slots" :key="slot.index">
          <button>Schedule</button>
        </div>
      </div>
      <div class="actions">
        <button @click="toggleSlots()">{{ toggleButtonMessage }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Field } from '@/models/field';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Field',
  props: {
    field: Field,
    mobile: Boolean
  },
  setup(props) {
    const state = reactive({
      isMobile: props.mobile,
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
  height: 100%;
  padding: 2% 5%;
  width: calc((100vw) / 2);
  font-size: 14px;
  .card {
    background: white;
    width: 100%;
    height: 100%;
    display: flex;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.3);
    border-radius: 20px;
    overflow: hidden;
    flex-direction: column;

    .info {
      font-size: 16px
      height: 100%;
      transition: all 200ms ease-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }


    .slots {
      transition: all 200ms ease-out;
      height: 0;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      .slot {
        border: 1px solid red;
        height: 100%;
      }
    }

    .actions {
      flex-shrink: 0;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        height: 40px;
        min-width: 100px;
        color: darkgray;
        border: 2px solid darkgray;
        background: transparent;
        border-radius: 20px;
        outline: none;
      }

    }
  }

  &.mobile {
    padding: 20px;
    width: calc(100vw);
  }

  &.show {
    .card {
      .info {
        transition: all 200ms ease-in;
        height: 80px;
        flex-shrink: 0;
      }

      .slots {
        transition: all 200ms ease-in;
        height: 100%;
        padding: 5px;
      }
    }
  }
}
</style>

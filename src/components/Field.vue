<template>
  <div
    class="field"
    :class="{ mobile: state.isMobile, show: state.displaySlots }"
  >
    <div class="card">
      <div class="info">
        {{ field.name }}
        <OccupationDisplay
          :expanded="!state.displaySlots"
          :occupation="occupation"
        ></OccupationDisplay>
      </div>
      <div class="slots">
        <Slot
          v-for="slot in field.slots"
          :key="slot.index"
          @click="toggleSlot(slot)"
          :scheduleSlot="slot"
          :selected="isSelected(slot)"
          :startTime="props.field.startTime"
          :slotSize="props.field.slotSize"
        ></Slot>
      </div>
      <div class="actions">
        <button v-if="!isThereSelectedSlot" @click="toggleSlots()">
          {{ toggleButtonMessage }}
        </button>
        <button v-if="isThereSelectedSlot" @click="schedule()">Schedule</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Field } from '@/models/field';
import { ScheduleSlot } from '@/models/schedule-slot';
import Slot from '@/components/Slot.vue';
import OccupationDisplay from '@/components/OccupationDisplay.vue';
import { computed, defineComponent, reactive } from 'vue';

interface StateModel {
  isMobile: boolean;
  displaySlots: boolean;
  selectedSlot?: ScheduleSlot;
}
export default defineComponent({
  name: 'Field',
  components: { Slot, OccupationDisplay },
  props: {
    field: Field,
    mobile: Boolean
  },
  setup(props) {
    const state: StateModel = reactive({
      isMobile: props.mobile,
      displaySlots: false,
      selectedSlot: undefined
    });

    const isThereSelectedSlot = computed(() => {
      return !!state.selectedSlot;
    });

    const toggleButtonMessage = computed(() => {
      return state.displaySlots ? 'Hide slots' : 'Display slots';
    });

    const isSelected = (slot: ScheduleSlot): boolean => {
      return !!(state.selectedSlot && state.selectedSlot.index === slot.index);
    };

    const toggleSlots = () => {
      state.displaySlots = !state.displaySlots;
    };

    const schedule = () => {
      if (state.selectedSlot) {
        alert(`${state.selectedSlot.index} ${state.selectedSlot.duration}`);
      }
    };

    const toggleSlot = (slot: ScheduleSlot) => {
      if (slot.owner) {
        return;
      }
      if (state.selectedSlot === slot) {
        state.selectedSlot = undefined;
        return;
      }
      state.selectedSlot = slot;
    };

    const occupation = computed(() => {
      const slots = props.field?.slots || [];
      return Math.ceil(
        (slots.reduce((occ, slot) => {
          if (slot.owner) {
            occ++;
          }
          return occ;
        }, 0) /
          slots.length) *
          100
      );
    });

    return {
      state,
      props,

      // methods
      toggleSlots,
      toggleSlot,
      isSelected,
      schedule,

      // computed
      isThereSelectedSlot,
      toggleButtonMessage,
      occupation
    };
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

  button {
    height: 40px;
    min-width: 100px;
    color: darkgray;
    border: 2px solid darkgray;
    background: transparent;
    border-radius: 20px;
    outline: none;
  }


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

    }

    .actions {
      flex-shrink: 0;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;


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

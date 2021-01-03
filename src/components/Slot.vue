<template>
  <div
    v-if="props.scheduleSlot"
    class="slot"
    :class="{
      selected: props.selected,
      owned: props.scheduleSlot.owner
    }"
  >
    <span>{{ slotStartTime }}</span>
  </div>
</template>

<script lang="ts">
import { ScheduleSlot } from '@/models/schedule-slot';
import { computed, defineComponent } from 'vue';

const getDateFrom = (n: number): Date => {
  const date = new Date();
  const floor = Math.floor(n);
  date.setHours(floor);
  date.setMinutes((n - floor) * 60);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export default defineComponent({
  name: 'Slot',
  props: {
    scheduleSlot: ScheduleSlot,
    selected: Boolean,
    startTime: Number,
    slotSize: Number
  },
  setup(props) {
    const slotStartTime = computed(() => {
      const index = props.scheduleSlot?.index;
      const startTime = props.startTime;
      const slotSize = props.slotSize || 60;
      if (index != undefined && startTime != undefined) {
        return getDateFrom(startTime + index / (60 / slotSize));
      }
    });
    return { props, slotStartTime };
  }
});
</script>

<style scoped lang="stylus">
.slot {
  border: 1px solid white;
  height: 100%;
  border-radius: 5px;
  background: #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 100ms ease-out;
  span {

  }
  &.selected {
    transition: background 100ms ease-in;
    background: yellowgreen;
  }

  &.owned {
    background: crimson;
  }
}
</style>

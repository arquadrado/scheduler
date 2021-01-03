<template>
  <div
    class="occupation-display"
    :class="{ expanded: props.expanded }"
    :style="{ background: getColor(props.occupation / 100) }"
  >
    <span v-if="props.expanded">{{ props.occupation }}%</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

function getColor(ratio: number) {
  if (isNaN(ratio)) {
    return 'rgba(100, 100, 100, 1)';
  }

  let r = 255;
  let g = 255;
  const b = 0;

  if (ratio === 0.5) {
    r = 255;
    g = 255;
  }

  if (ratio > 0.5) {
    g = 100;
    g += g * (1 - ratio);
  }

  if (ratio < 0.5) {
    r = 150;
    r += r * ratio;
  }

  console.log(r, g, b);

  return `rgba(${r},${g},${b},1)`;
}

export default defineComponent({
  name: 'OccupationDisplay',
  props: {
    expanded: Boolean,
    occupation: Number
  },
  setup(props) {
    return { props, getColor };
  }
});
</script>

<style scoped lang="stylus">
.occupation-display {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 32px;
  transition: all 300ms ease-out;

  &.expanded {
    transition: all 300ms ease-in;
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
}
</style>

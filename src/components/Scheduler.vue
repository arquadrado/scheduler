<template>
  <div id="scheduler" :class="{ mobile: state.isMobile }">
    <div class="slider">
      <div class="container">
        <Field v-for="field in fields" :key="field.name" :field="field" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Field from '@/components/Field.vue';
import isMobile from '@/helpers/mobile';

export default defineComponent({
  name: 'Scheduler',
  components: { Field },
  props: {
    fields: Array
  },
  setup() {
    const state = reactive({
      isMobile: isMobile()
    });
    return { state };
  }
});
</script>

<style scoped lang="stylus">
#scheduler {

  * {
    box-sizing: border-box;
  }

  height: calc(100vh - 86px);
  width: 100%;
  overflow: auto;
  display: grid;
  grid-template-rows: repeat(auto-fill, 100px) 600px;

  .slider {
    grid-row: 2 / 3;
    height: 100%;

    .container {
      height: 100%;
      display: flex;
    }
  }

  &.mobile {
    grid-template-rows: 100%;

    .slider {
      grid-row: 1 / 1;
    }
  }
}
</style>

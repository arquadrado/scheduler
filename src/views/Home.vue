<template>
  <div class="home">
    <Scheduler v-if="fields.length" :fields="fields" />
    <span v-else>Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import Scheduler from '@/components/Scheduler.vue'; // @ is an alias to /src
import { Field } from '@/models/field';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

function fetchFields(): Observable<Field[]> {
  return of([
    { name: 'Field 1' },
    { name: 'Field 2' },
    { name: 'Field 3', slotNumber: 6 },
    { name: 'Field 4' }
  ]).pipe(
    delay(Math.random() * 3000),
    map(fields => fields.map((field: Field) => new Field(field)))
  );
}

export default defineComponent({
  name: 'Home',
  components: {
    Scheduler
  },
  setup() {
    const fields = ref([] as Field[]);
    fetchFields().subscribe(data => {
      fields.value = [...data];
    });
    return { fields };
  }
});
</script>

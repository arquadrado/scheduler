<template>
  <div class="home">
    <Scheduler v-if="fields.length" :fields="fields" />
    <span v-else>Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Scheduler from '@/components/Scheduler.vue'; // @ is an alias to /src
import { Field } from '@/models/field';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ScheduleSlot } from '@/models/schedule-slot';

// With a Field Prototype concept one can create a Field instance for each day
// Thus allowing for accurate history of bookings
function fetchFields(): Observable<Field[]> {
  return of([
    {
      id: '1',
      name: 'Field 1',
      slotNumber: 14,
      startTime: 8,
      slots: [
        new ScheduleSlot({
          index: 0,
          owner: 'Zé Galhé'
        }),
        new ScheduleSlot({
          index: 1,
          owner: 'Zé Galhé'
        }),
        new ScheduleSlot({
          index: 2,
          owner: 'Zé Galhé'
        }),
        new ScheduleSlot({
          index: 3
          // owner: 'Zé Galhé'
        }),
        new ScheduleSlot({
          index: 4
          // owner: 'Zé Galhé'
        })
      ]
    },
    { id: '2', name: 'Field 2' },
    { id: '3', name: 'Field 3', slotNumber: 6 },
    { id: '4', name: 'Field 4' }
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

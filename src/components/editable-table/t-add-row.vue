<template>
  <div class="tr">
    <t-data
      v-for="field in fields"
      :key="field.name"
      :width="field.width"
      :empty="field.id !== firstColumnId"
    >
      <b-button
        v-if="field.id === firstColumnId"
        class="text-decoration-none"
        size="sm"
        variant="link"
        @click="$emit('add-row')"
      >
        <b-icon icon="plus" font-scale="2"/>
      </b-button>
    </t-data>

    <t-data empty/>
  </div>
</template>

<script>
import tData from './t-data.vue';

export default {
  name: 't-add-row',
  components: {
    tData
  },
  props: {
    fields: {type: Array, required: true},
    firstColumnId: {type: [String, Number], required: true},
  },
};
</script>

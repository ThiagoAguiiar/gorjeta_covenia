<template>
  <form class="form">
    <FormField
      type="switch"
      v-model="props.data.toggleCurrency"
      label="1. Selecionar moeda [ Dólar ou Euro ]"
      :hint="['Euro (EUR)', 'Dólar (USD)']"
    />

    <FormField
      type="number"
      v-model="props.data.paymentValue"
      class="form-input__value"
      :label="`2. Insira o valor da conta [ ${getCurrency} ]`"
      hint="O cálculo será realizado apenas com valores numéricos"
    />

    <FormField
      type="range"
      v-model="props.data.tip"
      :label="`Gorjeta (${props.data.tip}%)`"
      :hint="['10', '20']"
    />

    <FormField
      type="range"
      v-model="props.data.peopleCount"
      :label="`Pessoas (${props.data.peopleCount})`"
      :hint="['2', '16']"
      :range-min-max="[2, 16]"
      :range-step="1"
    />
  </form>
</template>

<script lang="ts" setup>
import FormField from "./FormField.vue";

import type { IModels } from "@/types/model";
import { computed, watch, type PropType } from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<IModels>,
    required: true,
  },
});

const getCurrency = computed(() => {
  return props.data.currency === "euro" ? "€" : "$";
});

watch(
  () => props.data.toggleCurrency,
  (value) => (props.data.currency = value ? "dollar" : "euro")
);
</script>

<style scoped>
.form-input__value {
  margin-top: 0px;
}
</style>

<template>
  <form class="form">
    <FormField
      type="switch"
      v-model="models.toggleCurrency"
      label="1. Selecionar moeda [ Dólar ou Euro ]"
      :hint="['Euro (EUR)', 'Dólar (USD)']"
    />

    <FormField
      type="number"
      v-model="models.paymentValue"
      class="form-input__value"
      :label="`2. Insira o valor da conta [ ${getCurrency} ]`"
      hint="O cálculo será realizado apenas com valores numéricos"
    />

    <FormField
      type="range"
      v-model="models.tip"
      :label="`Gorjeta (${models.tip}%)`"
      :hint="['10', '20']"
    />

    <FormField
      type="range"
      v-model="models.peopleCount"
      :label="`Pessoas (${models.peopleCount})`"
      :hint="['2', '16']"
      :range-min-max="[2, 16]"
      :range-step="1"
    />
  </form>
</template>

<script lang="ts" setup>
import FormField from "./FormField.vue";

import type { IModels } from "@/types/model";
import { computed, ref, watch, type PropType } from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<IModels>,
    required: true,
  },
});

const models = ref(props.data);

const getCurrency = computed(() => {
  return models.value.currency === "euro" ? "€" : "$";
});

watch(
  () => models.value.toggleCurrency,
  (value) => (models.value.currency = value ? "dollar" : "euro")
);

watch(
  () => props.data,
  (value) => (models.value = value)
);
</script>

<style scoped>
.form-input__value {
  margin-top: 0px;
}
</style>

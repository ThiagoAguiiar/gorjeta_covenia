<template>
  <div class="home">
    <VTabs v-model="tabs" align-tabs="center">
      <VTab value="calculator">Calculadora</VTab>
      <VTab value="results">Resultados</VTab>
    </VTabs>

    <VTabsWindow v-model="tabs">
      <VTabsWindowItem value="calculator">
        <FormCalculator :data />

        <div class="btn-tab__container">
          <Button direction="left" @click="navigateTab('results')" />
        </div>
      </VTabsWindowItem>

      <VTabsWindowItem value="results">
        <ResultPanel :data />

        <div class="btn-tab__container">
          <Button direction="right" @click="navigateTab('calculator')" />
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>

<script lang="ts" setup>
import type { IModels } from "@/types/model";
import { ref, type PropType } from "vue";

import Button from "./Button.vue";
import ResultPanel from "./forms/ResultPanel.vue";
import FormCalculator from "./forms/FormCalculator.vue";

defineProps({
  data: {
    type: Object as PropType<IModels>,
    required: true,
  },
});

const tabs = ref("calculator");

const navigateTab = (tab: "results" | "calculator") => {
  tabs.value = tab;
};
</script>

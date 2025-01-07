<template>
  <BaseLayout>
    <div class="home" v-if="!showMobile">
      <FormCalculator v-model="models" />
      <ResultPanel :data="models" />
    </div>

    <div class="home" v-else>
      <VTabs v-model="tabs" align-tabs="center">
        <VTab value="calculator">Calculadora</VTab>
        <VTab value="results">Resultados</VTab>
      </VTabs>

      <VTabsWindow v-model="tabs">
        <VTabsWindowItem value="calculator">
          <FormCalculator v-model="models" />

          <div class="btn-tab__container">
            <button class="btn-tab" @click="navigateTab('results')">
              <Icon
                icon="fluent:chevron-right-24-regular"
                width="22px"
                color="white"
              />
            </button>
          </div>
        </VTabsWindowItem>

        <VTabsWindowItem value="results">
          <ResultPanel :data="models" />

          <div class="btn-tab__container">
            <button class="btn-tab" @click="navigateTab('calculator')">
              <Icon
                icon="fluent:chevron-left-24-regular"
                width="22px"
                color="white"
              />
            </button>
          </div>
        </VTabsWindowItem>
      </VTabsWindow>
    </div>
  </BaseLayout>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import type { IModels } from "@/types/model";
import { useMediaQuery } from "@vueuse/core";
import { Icon } from "@iconify/vue";

import ResultPanel from "@/components/forms/result-panel.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormCalculator from "@/components/forms/form-calculator.vue";

// Responsividade (remover ou mostrar o elemento mobile)
const media = useMediaQuery("(max-width: 768px)");
const showMobile = ref(false);
const tabs = ref("calculator");

const models = reactive<IModels>({
  currency: "euro",
  paymentValue: 0,
  tip: 10,
  peopleCount: 2,
  toggleCurrency: false,
});

onMounted(() => {
  showMobile.value = media.value;
});

watch(media, (value) => {
  showMobile.value = value;
});

const navigateTab = (tab: "results" | "calculator") => {
  tabs.value = tab;
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.form {
  border-right: 1px solid var(--content-app);
}

.results,
.form {
  height: 100%;
  padding: 1rem 2rem;
}

.btn-tab {
  display: none;
}

@media (max-width: 1290px) {
  .home {
    grid-template-columns: 100%;
  }

  .form {
    border-right: 0px;
  }
}

@media (max-width: 768px) {
  .results,
  .form {
    padding: 1rem 0.5rem;
  }

  .btn-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: var(--content-app);
    border-radius: 2rem;
  }

  .btn-tab__container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

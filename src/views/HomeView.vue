<template>
  <BaseLayout>
    <div class="home" v-if="!showMobile">
      <FormCalculator :data="models" />
      <ResultPanel :data="models" />
    </div>

    <Mobile :data="models" v-else />
  </BaseLayout>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { IModels } from "@/types/model";
import { useMediaQuery } from "@vueuse/core";

import Mobile from "@/components/Mobile.vue";
import ResultPanel from "@/components/forms/ResultPanel.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormCalculator from "@/components/forms/FormCalculator.vue";

// Responsividade (remover ou mostrar o elemento mobile)
const showMobile = useMediaQuery("(max-width: 1290px)");

const models = reactive<IModels>({
  currency: "euro",
  paymentValue: 0,
  tip: 10,
  peopleCount: 2,
  toggleCurrency: false,
});
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

/* O DEEP Permite estilizar componentes profundos no DOM (principalmente componentes de bibliotecas externas) */
:deep(.v-btn__content) {
  text-transform: uppercase;
  letter-spacing: 0;
}

@media (max-width: 1290px) {
  .home {
    grid-template-columns: 100%;
  }

  .form {
    border-right: 0;
  }

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

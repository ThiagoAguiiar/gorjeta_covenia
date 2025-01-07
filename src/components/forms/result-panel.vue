<template>
  <div class="results">
    <h2 class="results-title">Conta</h2>

    <div class="results-wrapper">
      <div class="results-data">
        <p>Tipo da Moeda</p>
        <span class="results-item">
          {{ getCurrency.name }}
        </span>
      </div>

      <div class="results-data">
        <p>Valor da Conta ({{ getCurrency.symbol }})</p>
        <span class="results-item">
          {{ getCurrency.symbol }} {{ Number(data.paymentValue).toFixed(2) }}
        </span>
      </div>

      <div class="results-data">
        <p>Valor da Gorjeta ({{ getCurrency.symbol }})</p>
        <span class="results-item">
          {{ getCurrency.symbol }} {{ totalTip }}
        </span>
      </div>

      <div class="results-data">
        <p>Valor Total ({{ getCurrency.symbol }})</p>
        <span class="results-item">
          {{ getCurrency.symbol }} {{ totalPayment }}
        </span>
      </div>

      <div class="results-data">
        <p>Valor da conta por Pessoa ({{ getCurrency.symbol }})</p>
        <span class="results-item">
          {{ getCurrency.symbol }} {{ totalPerPerson }}
        </span>
      </div>

      <div class="results-data">
        <p>Valor da conta por Pessoa (R$)</p>
        <span class="results-item real">
          {{ loading ? "Carregando..." : totalBRL }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useMoney from "@/stores/useMoney";

import type { IModels } from "@/types/model";

import { computed, defineProps, ref, watch, type PropType } from "vue";
import { debounce } from "lodash";

const money = useMoney();

const totalBRL = ref("R$ 0,00");
const loading = ref(false);

const props = defineProps({
  data: {
    type: Object as PropType<IModels>,
    required: true,
  },
});

const getCurrency = computed(() => {
  if (props.data.currency === "euro") {
    return {
      symbol: "€",
      name: "Euro",
    };
  }

  return {
    symbol: "$",
    name: "Dólar",
  };
});

// Valor Total
const totalPayment = computed(() => {
  const valor = Number(props.data.paymentValue);
  return (valor + Number(totalTip.value)).toFixed(2);
});

// Gorjeta
const totalTip = computed(() => {
  const valor = Number(props.data.paymentValue * (props.data.tip / 100));
  return valor.toFixed(2);
});

const totalPerPerson = computed(() => {
  return (Number(totalPayment.value) / props.data.peopleCount).toFixed(2);
});

// Chama a API e busca o valor total em BRL de acordo com o valor total em USD ou EUR
const getTotalBRL = async () => {
  loading.value = true;

  const { data, error } = await money.convertMoney(
    totalPerPerson.value,
    props.data.currency
  );

  if (data.value) totalBRL.value = data.value;
  else totalBRL.value = "Valor não encontrado";

  if (error.value) totalBRL.value = "Erro ao buscar conversão";

  loading.value = false;
};

// Cria um atraso para a chamada da API reduzindo consumo de dados
const debouncedGetTotalBRL = debounce(getTotalBRL, 500);

/* Uso do immediate para chamar a função assim que a página é renderizada mesmo que não haja alteração de valores */
watch(
  () => [totalPerPerson.value, getCurrency.value],
  async () => await debouncedGetTotalBRL(),
  { immediate: true }
);
</script>

<style scoped>
.results-title {
  text-align: center;
  background: var(--content-app);
  color: #fff;
  padding: 0.5rem 0;
  border-radius: 2rem;
  font-size: 1.25rem;
}

.results-wrapper {
  margin-top: 2rem;
}

.results-item {
  font-weight: 700;
  font-size: 1.8rem;
}

.results-data {
  margin: 0.5rem 0;
}

.results-data p {
  color: var(--hint-app);
  font-size: 15px;
}

.real {
  color: #fca311;
}

@media (max-width: 1290px) {
  .results-item {
    font-size: 1.5rem;
  }

  .results-data p,
  .results-title {
    font-size: 1rem;
  }
}
</style>

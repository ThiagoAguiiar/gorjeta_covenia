<template>
  <div class="results">
    <h2 class="results-title">Conta</h2>

    <div class="results-wrapper">
      <ResultBox label="Tipo de Moeda" :result="getCurrency.name" />

      <ResultBox
        label="Valor da Conta"
        :result="Number(data.paymentValue).toFixed(2).toString()"
        :symbol="getCurrency.symbol"
      />

      <ResultBox
        label="Valor da Gorjeta"
        :result="totalTip"
        :symbol="getCurrency.symbol"
      />

      <ResultBox
        label="Valor Total"
        :result="totalPayment"
        :symbol="getCurrency.symbol"
      />

      <ResultBox
        label="Valor da Conta por Pessoa"
        :result="totalPerPerson"
        :symbol="getCurrency.symbol"
      />

      <ResultBox
        class="real"
        label="Valor da Conta por Pessoa"
        :result="loading ? 'Carregando...' : totalBRL"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useMoney from "@/stores/useMoney";
import ResultBox from "./ResultBox.vue";

import type { IModels } from "@/types/model";

import { computed, ref, watch, type PropType } from "vue";
import { debounce } from "lodash";

const money = useMoney();

const totalBRL = ref("R$ 0,00");
const loading = ref(false);

const props = defineProps({
  data: {
    type: Object as PropType<IModels>,
    required: true,
    default: () => ({
      currency: "euro",
      paymentValue: 0,
      peopleCount: 1,
      tip: 0,
    }),
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

.real {
  color: #fca311;
}
</style>

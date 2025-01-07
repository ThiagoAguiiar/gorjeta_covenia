import { type ISuccessResponse } from "@/types/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("useMoney", () => {
  const data = ref<string | null>("0");
  const error = ref<string | null>(null);

  const convertMoney = async (value: string, to: "euro" | "dollar") => {
    if (Number(value) === 0 || value.length === 0) {
      data.value = "0,00";

      return { data, error };
    }

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const baseURL = import.meta.env.VITE_API_URL;

      const getCurrency = to === "euro" ? "EUR" : "USD";
      const url = `${baseURL}/${apiKey}/pair/${getCurrency}/BRL/${value}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Falha na requisição");
      }

      const json: ISuccessResponse = await response.json();

      // Retorna o valor formatado para BRL
      data.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(json.conversion_result);

      return { data, error };
    } catch (err) {
      error.value =
        "Erro ao converter moeda. Verifique os dados e tente novamente";
      return { data, error };
    }
  };

  return {
    convertMoney,
  };
});

import { type ISuccessResponse } from "@/types/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("useMoney", () => {
  const data = ref<string | null>("R$ 0,00");
  const error = ref<string | null>(null);

  const convertMoney = async (value: string, to: "euro" | "dollar") => {
    if (Number(value) === 0 || value.length === 0 || isNaN(Number(value))) {
      data.value = "R$ 0,00";
      
      return { data, error };
    }

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const baseURL = import.meta.env.VITE_API_URL;

      const getCurrency = to === "euro" ? "EUR" : "USD";
      const url = `${baseURL}/${apiKey}/pair/${getCurrency}/BRL/${value}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error("Falha na requisição");

      const json: ISuccessResponse = await response.json();
      data.value = formatMoney(json.conversion_result);

      return { data, error };
    } catch (err: any) {
      error.value = err.toString();
      return { data, error };
    }
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return {
    convertMoney,
  };
});

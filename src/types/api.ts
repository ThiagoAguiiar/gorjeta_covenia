// Retorno da API de conversão
export interface ISuccessResponse {
  base_code: string;
  conversion_rate: number;
  conversion_result: number;
  documentation: string;
  result: string;
  target_code: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
}

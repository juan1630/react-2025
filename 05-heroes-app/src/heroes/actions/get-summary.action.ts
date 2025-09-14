import type { SummaryInformationResponse } from "../interfaces/summary-information.response";
import { heroApi } from "../pages/api/hero.api";

export const getSummaryAction =
  async (): Promise<SummaryInformationResponse | null> => {
    const response = await heroApi.get<SummaryInformationResponse>(`/summary`);
    if (response.status !== 200) return null;

    return response.data;
  };

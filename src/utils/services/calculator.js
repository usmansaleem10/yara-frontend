import { post } from "./api";

export const calculate = (crop, procote, yieldValue, dfRate) => {
  const url = "/calculate";
  const body = {
    crop,
    procote,
    yield_value: yieldValue,
    df_rate: dfRate,
    preferences: {
      state: "New Brunswick",
    },
  };

  return post(url, body);
};

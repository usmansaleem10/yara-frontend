import { post } from "./api";

export const calculate = (crop, procote, yieldValue, dfRate, state) => {
  const url = "/calculate";
  const body = {
    crop,
    procote,
    yield_value: yieldValue,
    df_rate: dfRate,
    preferences: {
      state: state,
    },
  };

  return post(url, body);
};

import { get } from "./api";

export const regionList = () => {
  const url = "/regions";

  return get(url);
};

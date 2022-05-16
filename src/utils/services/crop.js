import { get } from "./api";

export const cropList = () => {
  const url = "/crops";

  return get(url);
};

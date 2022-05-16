import { get } from "./api";

export const procoteList = () => {
  const url = "/procotes";

  return get(url);
};

import { get, patch } from "./api";

export const procoteList = () => {
  const url = "/procotes";

  return get(url);
};
export const updateProcote = (id, payload) => {
  const url = `/procotes/${id}`;

  return patch(url, payload);
};

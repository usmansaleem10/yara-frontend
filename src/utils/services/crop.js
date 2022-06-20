import { get, patch } from "./api";

export const cropList = () => {
  const url = "/crops";

  return get(url);
};

export const updateCrop = (id, payload) => {
  const url = `/crops/${id}`;

  return patch(url, payload);
};

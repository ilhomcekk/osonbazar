import $host from "../../../http";
import { packageData } from "../../../http/UserAPI";

export const signIn = async (params) => {
  const { data } = await $host.post("user/login/", packageData(params));
  return data;
};

import jwtDecode from "jwt-decode";
import $host from ".";
import { store } from "..";
import { getCookie } from "../helper";
import {
  createUser,
  deleteUser,
  fetchUserBasket,
  fetchUserWishLists,
} from "../redux/actions";

export const packageData = (data) => {
  const form = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const childKey in data[key]) {
        form.append(`${key}[${childKey}]`, data[key][childKey]);
      }
    } else {
      form.append(key, data[key]);
    }
  }
  return form;
};

export const getUserById = async () => {
  try {
    const data = $host.get(`user/profile/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (params) => {
  const { data } = await $host.post("user/signup/", packageData(params));
  return data;
};

export const signIn = async (number, password) => {
  const { data } = await $host.post("user/login/", {
    phone_number: number,
    code: password,
  });
  return data;
};

export const checkAuth = async () => {
  try {
    const refreshToken = getCookie("refreshToken");
    const { data } = await $host.post("user/api/v1/token/refresh/", {
      refresh: refreshToken,
    });
    const userDecoded = jwtDecode(data.access);
    const user = await getUserById();
    localStorage.setItem("accessToken", data.access);
    store.dispatch(createUser(user.data[0]));
    store.dispatch(fetchUserBasket(userDecoded.user_id));
    store.dispatch(fetchUserWishLists(userDecoded.user_id));
  } catch (error) {
    console.log(error);
    store.dispatch(deleteUser());
  } finally {
    // this.setLoading(false);
  }
};

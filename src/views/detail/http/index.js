import $host from "../../../http";
import { packageData } from "../../../http/UserAPI";

export const createRatingProduct = async (ratingData) => {
  const { data } = await $host.post("product/ratings/", ratingData);
  return data;
};

export const createOrder = async (params) => {
  const response = await $host.post(
    "product/product-order-create/",
    packageData(params)
  );
  console.log(response);
  return response.data;
};

export const createAdminOrder = async (code, params) => {
  const response = await $host.post(
    `product/product-order-create/${code}/`,
    packageData(params)
  );
  return response.data;
};

export const getProvinceList = async (params) => {
  const response = await $host.get(`product/province-list/`, { params });
  return response.data;
};

import $host from "../../../../http";

// export const deleteUserMapById = async (mapId) => {
//     const data = await $host.delete(`/user/map/${mapId}/`);
//     return data;
// }

export const fetchOrders = async () => {
  const data = await $host.get(`product/product-orders-by-user/`);
  return data;
};

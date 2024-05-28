import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import {
  addBasketsCartToCheckouts,
  addUSABasketsCartToCheckouts,
} from "./helper";
import { numberWithCommas } from "../../helper";
import moment from "moment-timezone";
import "moment/locale/ru";
import { fetchOrders } from "./components/http";
moment.locale("ru");

const Order = () => {
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket);
  const checkouts = useSelector((state) =>
    addBasketsCartToCheckouts(basket, state.user?.user?.checkout)
  );
  const exchangeRate = useSelector((state) => state.app.exchange);
  const location = useLocation();
  const pathName = location.pathname;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [orders, setOrders] = useState([]);
  const handleOrders = async () => {
    await fetchOrders()
      .then(({ data }) => {
        setOrders(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleOrders();
  }, []);

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div className="pages">
          <Link to="/">Магазин /</Link>
          <Link to="/profile">Личный кабинет /</Link>
          <div>Заказы</div>
        </div>
        <div className="grid xl:grid-cols-12 lg:grid-cols-4 gap-12 min-h-[400px]">
          {/* <div className="xl:col-span-4 lg:col-span-2">
            <div className="user-sidebar">
              <div
                onClick={() => navigate("/profile")}
                className={`item ${pathName === "/profile" && "active"}`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Персональные данные
              </div>
              <div
                onClick={() => navigate("/profile/order")}
                className={`item ${pathName === "/profile/order" && "active"}`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Мои заказы
              </div>
              <div
                onClick={() => navigate("/profile/addresses")}
                className={`item ${
                  pathName === "/profile/addresses" && "active"
                }`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Адреса
              </div>
              <div onClick={() => navigate("/favorites")} className="item">
                <CgFileDocument color="#2E3A59" size={24} />
                Избранные товары
              </div>
            </div>
          </div> */}
          <div className="xl:col-span-8 lg:col-span-4 order-section">
            {/* <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              className="!mb-6"
              aria-label="secondary tabs example"
            >
              <Tab value="1" label="ЗАКАЗЫ" />
              <Tab value="2" label="СПЕЦЗАКАЗ" />
              <Tab value="3" label="РАССРОЧКИ" />
            </Tabs> */}
            {value === "1" && (
              <>
                {orders?.map((item, i) => (
                  <div className="order-block" key={i}>
                    <div className="order-cart border-b md:flex gap-x-4 bg-gray md:p-6 p-2">
                      <div></div>
                      <div style={{ width: "-webkit-fill-available" }}>
                        <div className="grid lg:grid-cols-2 gap-2">
                          <div>
                            <strong>ID: </strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.id}
                            </span>
                          </div>
                          <div className="md:text-end text-lg">
                            <strong>
                              Status: {item?.status}
                              {/* {item?.NAXT_STATUS ? (
                                <span className="status-payment">
                                  Ожидает подтверждения
                                </span>
                              ) : (
                                <span className="text-green-700">
                                  Подтверждено
                                </span>
                              )} */}
                            </strong>
                          </div>
                        </div>
                        <div className="grid media-grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-y-2">
                            <div>
                              <strong>Soni:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                {item?.cart?.reduce(
                                  (acc, item) => acc + item.quantity,
                                  0
                                )}
                                1
                              </span>
                            </div>
                            <div>
                              <strong>Haridor ismi:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                {item?.user?.first_name}
                              </span>
                            </div>
                            {/* <div>
                              <strong>Регион/Область:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                {item.region}
                              </span>
                            </div> */}
                            {/* <div>
                              <strong>Город/Район:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                {item.town}
                              </span>
                            </div> */}
                          </div>
                          <div className="flex flex-col gap-y-2 media-pt">
                            <div>
                              <strong>Telefon raqami:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                {item.user?.phone_number}
                              </span>
                            </div>
                            {/* <div>
                              <strong>Вид оплаты:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                {item.NAXT_STATUS ? "Наличный" : "Онлайн"}
                              </span>
                            </div> */}
                          </div>
                          {/* <div className="md:col-span-2 media-pt">
                            <strong>Адрес покупателя:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.address}
                            </span>
                          </div> */}
                          <div className="md:col-span-2 media-pt">
                            <strong>Sana:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {moment(item.created_at).format(
                                "MMMM D YYYY, h:mm"
                              )}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/product/${item?.product?.slug}`}
                          className="department-box"
                          key={item?.product.id}
                        >
                          <div className="department-image relative">
                            {/*<div className="discount">-6%</div>*/}
                            <img src={item?.product?.front_image} alt="" />
                          </div>
                          <div className="department-text">
                            <div className="department-name">
                              <strong>{item?.product?.title_en}</strong>
                            </div>
                            {/* <div className="department-rassrochka">462 000 сум/ 12 мес</div> */}
                            {/* <div className="department-description">
                              {item?.product?.descriptions}
                            </div> */}
                            <div className="department-price">
                              <div className="price">
                                {numberWithCommas(
                                  item?.product?.price * exchangeRate
                                )}{" "}
                                so'm
                              </div>
                              {/* <div className="price_old">3 474 240 Сум</div> */}
                            </div>
                          </div>
                        </Link>
                        {/* <div className="text-end text-lg mt-6">
                          <strong>
                            Стоимость:{" "}
                            <span className="order-price">
                              {numberWithCommas(item.totalPrice * exchangeRate)}{" "}
                              so'm
                            </span>
                          </strong>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {value === "3" && <></>}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;

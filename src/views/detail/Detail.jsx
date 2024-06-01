import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/scss/_detail.scss";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Rating from "@mui/material/Rating";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { BiHeart, BiHeartCircle } from "react-icons/bi";
import ImageGallery from "./ImageGallery";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import {
  appendProductToUserCart,
  appendProductToWishList,
  fetchOneProduct,
  deleteProductFromWishList,
} from "../../http/ProductAPI";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  craeteWishListProduct,
  createBasketProduct,
  deleteWishList,
  fetchUserWishLists,
  showRightModal,
} from "../../redux/actions";
import Spinner from "../../UI/spinner/Spinner";
import { createOrder, createRatingProduct } from "./http";
import { numberWithCommas } from "../../helper";
import SimilarCarts from "../../components/similarCarts/SimilarCarts";
import HTMLReactParser from "html-react-parser";
import PhoneNumberInput from "../../components/phoneNumberInput/phoneNumberInput";
import { countrySource } from "../../helper/countryData";
import AlertError from "../../UI/Alert/AlertError";

const Detail = ({ products, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const favorite = useSelector((state) =>
    state?.wishLists.find((item) => item?.product?.id == productDetail?.id)
  );
  const hasInProduct = useSelector((state) =>
    state.basket?.find((item) => item?.product?.id == productDetail?.id)
  );
  const [counter, setCounter] = useState(1);
  const exchangeRate = useSelector((state) => state.app.exchange);
  const productPrice = +productDetail?.price * counter;
  const productInstallmentPrice = +productDetail?.installment_plan * counter;
  const category = useSelector((state) =>
    state.categories.find((item) => item.id === productDetail?.category)
  );
  const provinces = useSelector((state) => state.user.provinces);

  const [params, setParams] = useState({
    first_name: "",
    phone_number: "",
    product: productDetail?.id,
    province: "",
  });

  const handleChangeParams = (name, value) => {
    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const fetchProduct = async () => {
    const product = await fetchOneProduct(slug);
    setProductDetail(product);
    setLoading(false);
    setParams((prev) => {
      return {
        ...prev,
        product: product?.id,
      };
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const minusCounter = () => {
    if (counter > 1) {
      setCounter((count) => count - 1);
    }
  };

  const plusCounter = () => {
    setCounter((count) => count + 1);
  };

  // const [rassrochkaTab, setRassrochkaTab] = useState("");
  // const rassrochkaArray = [
  //   {
  //     id: 1,
  //     name: "6 месяц",
  //   },
  //   {
  //     id: 2,
  //     name: "9 месяц",
  //   },
  //   {
  //     id: 3,
  //     name: "12 месяц",
  //   },
  // ];

  const addProductToCart = async () => {
    if (!user.isAuth) {
      return dispatch(showRightModal());
    }
    if (hasInProduct) {
      return navigate("/basket");
    }
    try {
      const data = await appendProductToUserCart(
        user?.user?.id,
        slug,
        counter,
        productPrice
      );
      dispatch(createBasketProduct(data));
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToWishList = async () => {
    if (!user.isAuth) {
      return dispatch(showRightModal());
    }
    try {
      if (favorite) {
        return deleteProductFromWishList(favorite?.product?.id).then(() => {
          dispatch(deleteWishList(productDetail?.id));
          dispatch(fetchUserWishLists());
        });
      }
      return appendProductToWishList(productDetail?.id).then((data) => {
        dispatch(craeteWishListProduct(data));
        dispatch(fetchUserWishLists());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createRating = async (newValue) => {
    const data = await createRatingProduct({
      rating: Math.floor(newValue),
      product: productDetail.id,
    });
    return data;
  };

  const [orderLoading, setOrderLoading] = useState(false);
  const [orderErrors, setOrderErrors] = useState({});

  const handleSubmit = async () => {
    setOrderLoading(true);
    await createOrder(params)
      .then(({ data }) => {
        navigate("/order-success");
      })
      .catch(({ response }) => {
        setOrderErrors(response.data);
      });
    setOrderLoading(false);
  };
  console.log(orderErrors);

  useEffect(() => {
    setLoading(true);
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="detail">
      {/* <SecondNavbar /> */}
      <Container maxWidth="xl">
        {/* <div className="pages detail-page !pt-8">
          <Link to="/">Bosh sahifa /</Link>
          <Link to={`/category/${category?.id}`}>{category?.name} /</Link>
          <div>{productDetail?.title_en}</div>
        </div>
        <div className="laptop-detail-name text-2xl f-medium mb-4">
          {productDetail?.title_en}
        </div> */}
        <div className="flex items-center gap-4 border-b-2">
          {/* <Rating
            onChange={(event, newValue) => {
              createRating(newValue);
            }}
            name="half-rating"
            defaultValue={productDetail?.rating}
            precision={0.5}
            size="small"
          />
          <div
            className="detail-comment-length"
            style={{ color: "rgb(181, 238, 111)" }}
          >
            ({productDetail?.rating?.toFixed(1)})
          </div> */}
          {/* <Button
            className="!capitalize"
            size="large"
            color="error"
            startIcon={
              !favorite ? <BiHeart size={20} /> : <BiHeartCircle size={20} />
            }
            onClick={addProductToWishList}
          >
            {!favorite ? "Нравится" : "Не нравится"}
          </Button> */}
          <div>
            {/* {product.amount === 0 ? (
              <div className="text-red-600">Нет в наличии</div>
            ) : (
              <div>Есть в наличии: {product.amount}</div>
            )} */}
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 flex flex-col justify-between detail-box mt-8 lg:px-32">
          <div className="">
            <ImageGallery product={productDetail} />
          </div>
          <div className="character-box bg-white xl:pl-8 lg:pl-14 mb-6 lg:mt-0 mt-8">
            {/* <div className="mobile-detail-name text-2xl f-medium mb-4">
              {productDetail?.title_en}
            </div> */}
            <div className="flex items-center justify-between md:text-[32px] text-[24px] f-medium">
              {productDetail?.title_en}
              <Button
                className="!capitalize"
                size="large"
                color="error"
                startIcon={
                  !favorite ? (
                    <BiHeart size={20} />
                  ) : (
                    <BiHeartCircle size={20} />
                  )
                }
                onClick={addProductToWishList}
              >
                {/* {!favorite ? "Нравится" : "Не нравится"} */}
              </Button>
            </div>
            <div className="mt-2">
              Mahsulot narxi:{" "}
              <strong>{numberWithCommas(productDetail?.price)} so'm</strong>
            </div>
            <div className="mt-3 p-3 text-[#0c5460] bg-[#d1ecf1] border border-[#bee5eb] rounded-[0.25rem]">
              Yetqazib berish summasi manzilingizga ko'ra{" "}
              <strong>20000 so'm</strong>dan boshlanadi.
            </div>
            <TextField
              onChange={(e) => handleChangeParams("first_name", e.target.value)}
              value={params.first_name}
              placeholder="Ismingiz"
              className="w-full !mt-4"
              size="small"
            />
            <PhoneNumberInput
              onChange={(e) => handleChangeParams("phone_number", e)}
              value={params.phone_number}
              className="mt-4 rounded-[4px] [&>input]:!border [&>input]:!border-1 [&>input]:!border-[#0000003b] [&>input]:hover:!border-[#000] [&>input]:!duration-200 [&>input:focus]:!border-[#00ad00]"
              inputStyle={{
                height: "40px",
                fontSize: "16px",
                borderRadius: "4px",
                paddingLeft: "14px",
                paddingRight: "14px",
              }}
              // onChange={(phone) => setNumber(phone)}
              // withoutPlus={true}
            />
            {productDetail?.is_province_required && (
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  onChange={(e) =>
                    handleChangeParams("province", e.target.value)
                  }
                  value={params.province}
                  size="small"
                  className="w-full !mt-4 f-regular"
                  // onChange={(selectedOption) => setTown(selectedOption)}
                  // placeholder="Hududni tanlang"
                  // options={!region.id ? [] : countrySource[region.id]}
                >
                  <MenuItem value="">Hududni tanlang</MenuItem>
                  {provinces?.results?.map((item, idx) => (
                    <MenuItem className="f-regular" value={item?.id} key={idx}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {orderErrors !== {} &&
              Object.keys(orderErrors).map((item, idx) => (
                <div key={idx} className="mt-2">
                  <AlertError error={`${item}: ${orderErrors?.[item]}`} />
                </div>
              ))}
            <Button
              onClick={handleSubmit}
              className="yellow-btn-hover !w-full !text-[20px] !mt-8 !py-3"
            >
              <span className="!text-white f-medium">Buyurtma berish</span>
            </Button>
            {/* {productDetail?.attribute_values?.map((item, i) => (
              <div className="mt-4 flex items-center gap-x-4 gap-y-2" key={i}>
                <div className="gray">{item.product_attribute?.name}:</div>
                <div>{item.attribute_value}</div>
              </div>
            ))} */}
          </div>
          {/* <div className="xl:col-span-3 lg:col-span-4 col-span-6 lg:col-start-4 lg:col-end-10 xl:mt-0 lg:mt-8">
            <div className="detail-payment rounded">
              <div className="p-4 border">
                <div className="text-4xl f-bold">
                  {numberWithCommas(productPrice * exchangeRate)} Сум
                </div>
                <div className="detail-counter grid grid-cols-3 my-4">
                  <Button onClick={minusCounter} className="minus">
                    <AiOutlineMinus size={24} fill="#C4C4C4" />
                  </Button>
                  <div className="count">{counter}</div>
                  <Button onClick={plusCounter} className="plus">
                    <AiOutlinePlus size={24} fill="#C4C4C4" />
                  </Button>
                </div>
                <Button
                  onClick={() => addProductToCart()}
                  className="yellow-btn-hover !w-full !py-3 !capitalize !text-base"
                  endIcon={<HiOutlineShoppingCart size={16} />}
                >
                  {!hasInProduct ? "Добавить в корзину" : "Корзина"}
                </Button>
                <div className="mt-5 text-2xl">Цена рассрочки:</div>
                <div className="text-4xl f-bold mb-4">
                  {numberWithCommas(productInstallmentPrice * exchangeRate)} Сум
                </div>
              </div>
              <div className="grid grid-cols-3"></div>
            </div>
          </div> */}
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          className="!mt-10"
          aria-label="secondary tabs example"
        >
          <Tab value="1" label="Batafsil ma'lumot" />
        </Tabs>
        {value === "1" && (
          <div className="p-6">
            {HTMLReactParser(productDetail?.descriptions)}
          </div>
        )}
      </Container>
      {/* <SimilarCarts category={productDetail?.category} /> */}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state?.products,
    user: state?.user,
  };
};

export default connect(mapStateToProps, null)(Detail);

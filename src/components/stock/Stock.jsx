import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import "../../assets/scss/_stock.scss";
import Slider from "react-slick";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";
import { Skeleton } from "@mui/material";
import { API_URL } from "../../http";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [stockProducts, setStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStock = async () => {
    const response = await fetch(API_URL + "product/stocks/");
    const products = await response.json();
    if (products.count === 0) return;
    setStock(products.results);
    setLoading(false);
  };
  const fetchStockProducts = async () => {
    const response = await fetch(API_URL + "product/product_filter/?stock=1");
    const products = await response.json();
    if (products.count === 0) return;
    setStockProducts(products.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchStock();
    fetchStockProducts();
  }, []);
  console.log(stockProducts);

  let settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    nextArrow: <SlickArrowRight color="#eb7471" size={24} />,
    prevArrow: <SlickArrowLeft color="#eb7471" size={24} />,

    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <Title title={stock?.[0]?.title} style="f-bold mt-6 mb-2" />
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 grid-cols-2">
        {stockProducts?.map((item, idx) => (
          <Cart cart={item} key={idx} />
        ))}
      </div>
      {/* <Slider {...settings} className="stock">
        {loading
          ? new Array(3).fill(1).map((_, index) => (
              <div className="pr-4" key={index}>
                <Skeleton
                  variant="rectangular"
                  width="400px"
                  height="172px"
                  animation="wave"
                />
              </div>
            ))
          : stockProducts?.map((item, idx) => (
              <Cart cart={item} key={idx} />
              // <Link to={`/stock/${item.id}`} className="pr-4" key={item.id}>
              //   <img src={item.image} alt="" />
              // </Link>
            ))}
      </Slider> */}
    </Container>
  );
};

export default Stock;

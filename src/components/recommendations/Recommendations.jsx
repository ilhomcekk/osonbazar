import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../assets/scss/_recommendations.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import Title from "../title/Title";
import Cart from "../cart/Cart";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import $host from "../../http";
import LoadingCart from "../cart/LoadingCart";

const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // const { data } = await $host.get(
      //   "/product/product_filter/?price=&is_recommend=true"
      // );
      const { data } = await $host.get(
        "product/product_filter/?limit=48&offset=0"
      );
      setProducts(data.results);
      return data.results;
    };
    fetchProducts().then(() => setLoading(false));
  }, []);
  console.log(products);

  return (
    <div className="my-4">
      <Container maxWidth="xl">
        <Link to="">
          <Title title={"Tanlangan mahsulotlar"} className="mt-8 mb-4 red" />
        </Link>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2">
          {loading
            ? new Array(6)
                .fill(1)
                .map((item) => <LoadingCart key={item + Math.random(100)} />)
            : products.map((item, i) => <Cart cart={item} key={item?.id} />)}
        </div>
      </Container>
    </div>
  );
};

export default Recommendations;

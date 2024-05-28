import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import "../../assets/scss/_second_navbar.scss";
import { useSelector } from "react-redux";
import { categoriesAlgo } from "../../helper";

const SecondNavbar = () => {
  const categories = useSelector((state) => categoriesAlgo(state.categories));

  let settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="second-navbar">
      <Container maxWidth="xl">
        <Slider {...settings}>
          {categories.map((item) => (
            <Link to={`/category/${item.id}`} key={item.id}>
              {item.name}
            </Link>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default SecondNavbar;

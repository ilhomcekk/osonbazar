import React from "react";
import Slider from "react-slick";
import "../../assets/scss/_category.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { connect } from "react-redux";
import SlickArrowRight from "../../components/SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../../components/SlickArrow/SlickArrowLeft";
import { API_URL } from "../../http";
import { Skeleton } from "@mui/material";

const Category = ({ categories }) => {
  return (
    <div className="my-4">
      <Container maxWidth="xl">
        <div className="category-slider category-slider grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-2 gap-y-4">
          {categories.length === 0
            ? new Array(5).fill(3).map((_, index) => (
                <div key={index}>
                  <Skeleton
                    variant="rectangular"
                    width="220px"
                    height="96px"
                    animation="wave"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              ))
            : categories?.map(
                (item, i) =>
                  item.parent && (
                    <div key={i}>
                      <Link
                        to={`/products-by-category/${item.slug}`}
                        className="category-box"
                      >
                        <img
                          src={
                            item.background_image
                              ? API_URL + item.background_image
                              : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                          }
                          alt=""
                        />
                        <div>{item.name}</div>
                      </Link>
                    </div>
                  )
              )}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps, null)(Category);

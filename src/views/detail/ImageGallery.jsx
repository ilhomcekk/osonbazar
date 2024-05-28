import React, { Component } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.images = [];
    this.images.push({
      img_url:
        props?.product?.front_image ||
        "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
    });
    {
      props?.product?.gallery_1 &&
        this.images.push({
          img_url: props?.product?.gallery_1,
        });
    }
    {
      props?.product?.gallery_2 &&
        this.images.push({
          img_url: props?.product?.gallery_2,
        });
    }
    {
      props?.product?.gallery_3 &&
        this.images.push({
          img_url: props?.product?.gallery_3,
        });
    }
    {
      props?.product?.gallery_4 &&
        this.images.push({
          img_url: props?.product?.gallery_4,
        });
    }
    {
      props?.product?.gallery_5 &&
        this.images.push({
          img_url: props?.product?.gallery_5,
        });
    }
    {
      props?.product?.gallery_6 &&
        this.images.push({
          img_url: props?.product?.gallery_6,
        });
    }
    this.state = {
      nav1: null,
      nav2: null,
    };
    if (this.images.length > 0) {
      while (this.images.length < 6) {
        this.images = this.images.concat(this.images);
      }
    }
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
          className="main-img"
          arrows={false}
        >
          {this.images?.map((item, i) => (
            <div className="carousel-img" key={i}>
              <img src={item.img_url} alt="" />
            </div>
          ))}
        </Slider>
        {/* {this.props.product?.new_media?.length > 0 && (
          <Slider
            asNavFor={this.state.nav1}
            ref={(slider) => (this.slider2 = slider)}
            slidesToShow={4}
            className="image-gallery"
            swipeToSlide={true}
            focusOnSelect={true}
            nextArrow={
              <IoIosArrowForward
                fill="#000"
                style={{ minWidth: "36px", height: "36px" }}
                size={36}
              />
            }
            prevArrow={
              <IoIosArrowBack
                fill="#000"
                style={{ minWidth: "36px", height: "36px" }}
                size={36}
              />
            }
          >
            {this.images?.map((item, i) => (
              <div className="carousel-img" key={i}>
                <img src={item.img_url} alt="" />
              </div>
            ))}
          </Slider>
        )} */}
      </div>
    );
  }
}

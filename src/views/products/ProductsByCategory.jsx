import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Cart from "../../components/cart/Cart";
import "../../assets/scss/_favorites.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import $host from "../../http";

const ProductsByCategory = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const wishListProducts = useSelector((state) => state.wishLists);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await $host.get(
        `product/product_filter/?category=${slug}&limit=50`
      );
      setProducts(data.results);
    };
    fetchProducts();
  }, [slug]);

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div style={{ minHeight: "70vh" }}>
          <Title title={slug} className="f-bold mb-6 mt-12" />
          {products?.length > 0 ? (
            <div className="favorites mb-12">
              {products?.map((item, idx) => (
                <Cart cart={item} key={idx} favorite={true} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-10">
              <h2 className="text-2xl">Нет товаров</h2>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProductsByCategory;

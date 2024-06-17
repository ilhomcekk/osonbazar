import { Container } from "@mui/material";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../http";

const StockDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockProducts = async () => {
    const response = await fetch(API_URL + `product/stocks/${id}/`);
    const products = await response.json();
    setDetail(products);
    setLoading(false);
  };

  useEffect(() => {
    fetchStockProducts();
  }, []);
  console.log(detail);
  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div className="pages">
          <Link to="/">Магазин / </Link>
          <div> {detail?.title}</div>
        </div>
        <img
          src={detail?.image}
          className="max-w-full mx-auto max-h-[500px] mb-4"
          alt=""
        />
        <div className="md:text-[18px] mb-12">{detail?.title}</div>
      </Container>
    </>
  );
};

export default StockDetail;

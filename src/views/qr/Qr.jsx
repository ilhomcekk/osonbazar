import { Container } from "@mui/material";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../http";

const Qr = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockProducts = async () => {
    const response = await fetch(API_URL + `order/${id}`);
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
      <Container maxWidth="xl"></Container>
    </>
  );
};

export default Qr;

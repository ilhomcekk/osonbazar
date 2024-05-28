import { Button } from "@mui/material";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="shadow-lg lg:w-[45%] p-8 mx-auto my-8">
        <BsCheck2Circle size={120} color="#00ad00" className="mx-auto" />
        <div className="text-lg text-center my-6">
          Buyurtmangiz uchun rahmat!
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outlined"
            onClick={() => navigate("/profile/order")}
            className="!w-full !py-3 !capitalize !text-base !my-3"
          >
            Buyurtmani ko'rish
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            className="yellow-btn-hover !w-full !py-3 !capitalize !text-base !my-3 !border-none"
          >
            Bosh sahifa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

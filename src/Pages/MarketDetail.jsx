import React from "react";
import { useParams } from "react-router-dom";

function MarketDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Market Detail</h1>
      <p>Details for market with ID: {id}</p>
    </div>
  );
}

export default MarketDetail;

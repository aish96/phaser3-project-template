import React from "react";
import axios from "axios";
import Card from "./../helpers/Card";
const getNFTData = () => {
  const options = {
    method: "GET",
    url: "https://api.nftport.xyz/v0/nfts",
    params: { chain: "polygon" },
    headers: {
      "Content-Type": "application/json",
      Authorization: "05e8cdcc-db29-4477-8540-42ce01ae8fc9",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
function WalletProfile({ accounts, heading }) {
  return (
    <>
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px"}}>
    <Card accounts={accounts} heading={"Swanky Kank Plus"} description={"Some words"} />
    <Card accounts={accounts} heading={"Swanky Kank Plus"} description={"Some words"} />
    <Card accounts={accounts} heading={"Swanky Kank Plus"} description={"Some words"} />
    <Card accounts={accounts} heading={"Swanky Kank Plus"} description={"Some words"} />
    <Card accounts={accounts} heading={"Swanky Kank Plus"} description={"Some words"} />
    <Card accounts={accounts} heading={"Swanky Kank Plus"} description={"Some words"} />

    </div>
    </>
  );
}
export default WalletProfile;

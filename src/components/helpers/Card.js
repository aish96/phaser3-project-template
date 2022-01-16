import React from "react";
function Card({ accounts, heading, description }) {
  return (
    <div
      style={{
        background: "#fff",
        width: "24em",
        borderRadius: "0.6em",
        margin: "1em",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow:
          "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
        transition: "all ease 200ms",
      }}
    >
      <img src="https://i.picsum.photos/id/54/400/300.jpg?hmac=pv-6BOZ71KMjJ9G2CoaaVe3e4dMA8rD3YXEG7lXElxo" />
      <div style={{ padding: "1.2em" }}>
        <h2>{heading}</h2>
        <p>{description}</p>
        <h5>
          {accounts.toString().substring(0, 8)}
          ...
          {accounts.toString().substring(35, 41)}
        </h5>
      </div>
    </div>
  );
}
export default Card;

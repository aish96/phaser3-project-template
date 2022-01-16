import React, { useEffect, useState } from "react";
import styles from "./../library/app.css";
import { getWeb3 } from "./connect";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Wallet from "./containers/Wallet.jsx";
import Marketplace from "./containers/Marketplace.jsx";
import Fund from "./containers/Superfliud.jsx";
import axios from "axios";

//import fs from 'fs';
//import FormData from 'form-data';

const deployNFTContract = (address) => {
  const options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/contracts",
    headers: {
      "Content-Type": "application/json",
      Authorization: "05e8cdcc-db29-4477-8540-42ce01ae8fc9",
    },
    data: {
      chain: "polygon",
      name: "Polypunks",
      symbol: "PP",
      owner_address: address || "0xC6204532A1fF2059b33C574d22A3F5a745217aAE",
      metadata_updatable: false,
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
// const getIPFSURL = (image) => {
//   const form = new FormData();
//   const fileStream = fs.createReadStream("image.jpg");
//   form.append("file", fileStream);

//   const options = {
//     method: "POST",
//     body: form,
//     headers: {
//       Authorization: "05e8cdcc-db29-4477-8540-42ce01ae8fc9",
//     },
//   };

//   axios.post("https://api.nftport.xyz/v0/files", options)
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseJson) => {
//       // Handle the response
//       console.log(responseJson);
//     });
// };
const mintNFT = (name, address, description, ipfs_url) => {
  const options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/metadata",
    headers: {
      "Content-Type": "application/json",
      Authorization: "05e8cdcc-db29-4477-8540-42ce01ae8fc9",
    },
    data: {
      name: name,
      description: description,
      file_url: ipfs_url,
      attributes: [
        { trait_type: "Operator", value: "Addition" },
        { trait_type: "Glasses", value: "Rare" },
        { trait_type: "Moustache", value: "Rodeo" },
        { trait_type: "Personality", value: "OG" },
      ],
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
const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tab, setTab] = useState(0);

  const changeTabs = (taab, gamed) => {
    setTab(taab);
    const gamedisplay = document.getElementById("phaser");

    if (!gamed) {
		gamedisplay.style.visibility = "hidden";
    } else {
		gamedisplay.style.visibility = "visible";
    }
  };
  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accountsmain = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const accountsa = await web3.eth.getAccounts();
      setAccounts(accountsa);
      setWeb3(web3);
    };
    init();
  }, []);

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <a onClick={(e) => changeTabs(0, true)}>Game</a>
        </li>
        <li>
          <a onClick={(e) => changeTabs(1, false)}> Egg Marketplace </a>
        </li>
        <li>
          <a onClick={(e) => changeTabs(2, false)}> Support Early Education </a>
        </li>
        <li>
          <a onClick={(e) => changeTabs(3, false)}> Wallet </a>
        </li>
        {accounts ? (
          <li>
            <a>
              {accounts.toString().substring(0, 8)}
              ...
              {accounts.toString().substring(35, 41)}
            </a>
          </li>
        ) : (
          <li className={styles.right}>
            <a> Connect </a>
          </li>
        )}
      </ul>
      <br />
      {tab == 3 && <Wallet accounts={accounts} styles={styles} />}
      {tab == 2 && <Fund />}

      {tab == 1 && <Marketplace />}
    </div>
  );
};
export default App;

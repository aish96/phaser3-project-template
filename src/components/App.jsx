import React , {useEffect, useState} from "react";
import styles from "./../library/app.css";
import {getWeb3} from "./connect";

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
       const accountsmain = await window.ethereum.request({
         method: "eth_requestAccounts",
       });
       const accountsa = await web3.eth.getAccounts();
	   console.log(accountsa);
//       setAccounts(accountsa);
//       setWeb3(web3);
     };
     init();
  }, []);

  return (
    <div className={styles.container}>
      <ul>
        <li>
          {" "}
          <a> Egg Marketplace </a>
        </li>
        <li>
          {" "}
          <a> Support Early Education </a>{" "}
        </li>
        <li>
          {" "}
          <a> Wallet </a>{" "}
        </li>
        <li className={styles.right}>
          {" "}
          <a> Connect </a>{" "}
        </li>
      </ul>
      <br />
    </div>
  );
};
export default App;

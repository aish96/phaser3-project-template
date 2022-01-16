import React , {useState} from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";


function WalletProfile({accounts, customHttpProvider}) {
    const [input, setInput] = useState("0");
    async function createFlow(amount) {
        const flowRate = calculateFlowRate(amount);
        const recipient = "0xC6204532A1fF2059b33C574d22A3F5a745217aAE";
        console.log("http provder", customHttpProvider);
        const sf = await Framework.create({
          networkName: "kovan",
          provider: customHttpProvider
        });
      
        const signer = sf.createSigner({
          privateKey:
            "78b68a4d5312d1eb1a7fc8b12e554e0195a57f1c0be972f1a42cb5e2706ff800",
          provider: customHttpProvider
        });
      
        const ETHx = "0xDD5462a7dB7856C9128Bc77Bd65c2919Ee23C6E1";
      
        try {
          const createFlowOperation = sf.cfaV1.createFlow({
            sender: "0x3d8Bf37BED22DF8Ea1dd07C278f325aebCc1F7a2",
            receiver: recipient,
            flowRate: flowRate,
            superToken: ETHx
            // userData?: string
          });
      
          console.log("Creating your stream...");
      
          const result = await createFlowOperation.exec(signer);
          console.log(result);
      
          console.log(
            `Congrats - you've just created a money stream!
          View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
          Network: Kovan
          Super Token: ETHx
          Sender: 0x3d8Bf37BED22DF8Ea1dd07C278f325aebCc1F7a2
          Receiver: ${recipient},
          FlowRate: ${flowRate}
          `
          );
        } catch (error) {
          console.log(
            "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
          );
          console.error(error);
        }
      }
    
      function calculateFlowRate(amount) {
        if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
          alert("You can only calculate a flowRate based on a number");
          return;
        } else if (typeof Number(amount) === "number") {
          if (Number(amount) === 0) {
            return 0;
          }
          const amountInWei = ethers.BigNumber.from(amount);
          const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
          const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
          return calculatedFlowRate;
        }
      }

    return(<>
        <h2> Support Early Education in Kids </h2>
        <p>
            You can support early education among students by streaming USDC super tokens to smart contract
             0xC6204532A1fF2059b33C574d22A3F5a745217aAE 
            <input onChange={(e) =>  setInput(e.target.value)} />
            <button onClick={(e) => createFlow(input)}> Donate Stream!</button> 
        </p>
    </>);
};
export default WalletProfile;
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";


function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData]= useState("");

  const setDataFunc= (imageData) =>{
    setData(imageData);
  }

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
          {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <div className="left_box">
          <div className="left_up">
          <h1 style={{ color: "white", justifyContent: 'left' }}>Secure BIO</h1>
          </div>
          <div className="left_down">
              <div className="image_box"> 
                  {data === ""? <div className="image">
                      <p >No Image Uploaded</p>
                    </div>: <div className="image_box">{data}</div>}
              </div>
          </div>
        </div>


        <div className="right_box">
          <div className="right_up">

            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>


            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            ></FileUpload>
         
            <Display contract={contract} setDataFunc={setDataFunc} account={account}></Display>
          </div>
          <div className="right_down">
            <p style={{ color: "white" }}>
              Account : {account ? account : "Not connected"}
            </p>
          </div>
          
        </div>

      </div>
    </>
  );
}

export default App;

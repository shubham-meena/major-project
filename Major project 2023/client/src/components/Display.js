import { useState, useEffect } from "react";
import "./Display.css";

const Display = ({ contract, account, setDataFunc }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const OtheraddressElement = document.querySelector(".address");
    const Otheraddress = OtheraddressElement ? OtheraddressElement.value : "";
        
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
        console.log(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);
      
      const newestItem = str_array[str_array.length - 1];
      
      console.log(newestItem);
      const image = (
        <div className="left_down">
        <a href={newestItem} target="_blank" rel="noreferrer">
          <img
            src={`https://turquoise-initial-haddock-152.mypinata.cloud/ipfs/${newestItem.substring(58)}`}
            alt="new"
            className="image_box"
          />
        </a>
        </div>
      );
    
      console.log(image);
      setData(image);
      setDataFunc(image);
    } else {
      alert("No image to display");
    }
    
  };


  const [output, setOutput] = useState('');

  const runPythonScript = async () => {
    try {
      const response = await fetch('http://localhost:3001/run-python-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script: 'code.py' }),
      });
      const data = await response.json();
      console.log(data.output+" "+data.output.length)
      // setOutput( (data.output.length == 227) ? data.output.substring(218) : data.output.substring(199));
      setOutput(data.output);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    console.log("output is: ", output);
  }, [output]);

  return (
    <>
      {/* <div className="image_box">{data}</div> */}
      <button className="center button" onClick={getdata}>
        Get Data
      </button>

      <button className="center button" onClick={runPythonScript}>
        Get Classification
      </button>

      <p style={{ color: "white" }}>
        {output}
      </p>
    </>
  );
};
export default Display;

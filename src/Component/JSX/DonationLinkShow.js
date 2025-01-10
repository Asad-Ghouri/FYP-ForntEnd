import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode.react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// import done from "../../asserts/done.png";
import axios from "axios";
import copy from "clipboard-copy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import "../CSS/PaymentLink.css";

const Linkshow = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  const [help, setHelp] = useState(false);

  const [amount, setamount] = useState([]);
  const [address, setaddress] = useState([]);
  const [privateKey, setprivateKey] = useState([]);

  const [_status, _setStatus] = useState();

  console.log("send data ", address, amount, privateKey, _status);
  const authToken = localStorage.getItem("token");
  console.log(authToken);

  const { id, amd } = useParams();

  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://fyp-back-end-bay.vercel.app/api/donationLinkGenerator/gett/${id}/${amd}`
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        console.log("use effect 1");
        const data = await response.json();
        console.log(data);
        setdata(data.paymentLinks);
        setaddress(data.paymentLinks[0].address);
        setamount(data.paymentLinks[0].amount);
        setprivateKey(data.paymentLinks[0].privateKey);
        _setStatus(data.paymentLinks[0].status);
        // Generate QR codes for each payment

        // if (data.paymentLinks[0].status !== "done") {
        //   const secondResponse = await axios.get(
        //     `https://fyp-back-end-bay.vercel.app/api/changedetails/gett/${id}/${amd}/${data.paymentLinks[0].address}/${data.paymentLinks[0].amount}/${data.paymentLinks[0].privateKey}/${data.paymentLinks[0].amount}`
        //   );
        //   console.log("Second API response:", secondResponse.data);
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  // console.log("data address is",data[0].address)

  useEffect(() => {
    const handleButtonClick = async () => {
      try {
        const response = await axios.get(
          `https://fyp-back-end-bay.vercel.app/api/changedetails/gett/${id}/${amd}/${address}/${amount}/${privateKey}/${amount}`
        );
        if (response.data) {
          console.log("good");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleButtonClick();
    console.log("use effect 2");
  }, [address, amd, amount, id, navigate, privateKey]);

  const handleCopyClick = (address) => {
    if (address) {
      copy(address);
      alert(`Copied: ${address}`);
    }
  };

  const getEmail = () => {
    setEmail("");
    axios
      .get(`https://fyp-back-end-bay.vercel.app/api/getEmail/${email}`)
      .then((response) => {
        setEmail(response.data.email);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setEmail(null);
      });
  };

  return (
    <div className="payment-link-container">
      <div className="payment-main">
        <div className="payment-header">
          <h1>Crypto CheckPoint</h1>
          <div className="payment-amount">
            <span className="payment-amount-value">{amount} OutLet</span>
            <span>{amount}</span>
          </div>
        </div>

        <div className="payment-address-container">
          <p>Send the funds to this address</p>
          <div className="payment-address">
            <span className="address-text">{address}</span>
            <button className="copy-button" onClick={() => handleCopyClick(address)}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>

        <div className="qr-container">
          <div className="qr-code">
            <QRCode value={address || ""} size={200} />
          </div>
        </div>

        <div className="status-container">
          <div className="status-step">
            <div className={`status-circle ${_status === "waiting" ? "active" : _status === "done" ? "completed" : ""}`}>1</div>
            <span className="status-text">Waiting for payment</span>
          </div>
          <div className="status-step">
            <div className={`status-circle ${_status === "confirming" ? "active" : _status === "done" ? "completed" : ""}`}>2</div>
            <span className="status-text">Confirming on blockchain</span>
          </div>
          <div className="status-step">
            <div className={`status-circle ${_status === "confirmed" ? "active" : _status === "done" ? "completed" : ""}`}>3</div>
            <span className="status-text">Confirmed on blockchain</span>
          </div>
          <div className="status-step">
            <div className={`status-circle ${_status === "sending" ? "active" : _status === "done" ? "completed" : ""}`}>4</div>
            <span className="status-text">Sending to seller</span>
          </div>
          <div className="status-step">
            <div className={`status-circle ${_status === "done" ? "completed" : ""}`}>5</div>
            <span className="status-text">Sent to seller</span>
          </div>
        </div>

        <div className="navigation">
          <NavLink to="/" className="back-button">Back</NavLink>
          <button className="help-button" onClick={() => setHelp(!help)}>Help</button>
        </div>
      </div>

      <div className="payment-sidebar">
        <div className="payment-info">
          <div className="payment-id">
            Payment ID:<br/>
            <span>{id}</span>
          </div>
          <div className="payment-id">
            Order ID:<br/>
            <span>{id}</span>
          </div>
          <div className="payment-id">
            optional: <span>Optional</span>
          </div>
        </div>

        <div className="email-container">
          <p>Leave your email and we'll notify you when the seller receives your payment</p>
          <input
            type="email"
            className="email-input"
            placeholder="Email for transaction receipt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit-button" onClick={getEmail}>
            Confirm
          </button>
        </div>

        <p className="disclaimer">
          AlphaPayments is for payment processing only. Please contact the store with any questions on goods/services
        </p>
      </div>
    </div>
  );
};

export default Linkshow;
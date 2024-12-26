
import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode.react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// import done from "../../asserts/done.png";
import axios from "axios";
import copy from "clipboard-copy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
const Linkshow = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  

  const [help, setHelp] = useState(false);

  const [amount, setamount] = useState([]);
  const [address, setaddress] = useState([]);
  const [privateKey, setprivateKey] = useState([]);

  const [_status, _setStatus] = useState();

  console.log("send data ", address, amount, privateKey,_status);
  const authToken = localStorage.getItem("token");
  console.log(authToken);
  
  const { id, amd } = useParams();
  
  
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://fyp-back-end-bay.vercel.app/api/PaymentLinkGenerator/gett/${id}/${amd}`
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
        _setStatus(data.paymentLinks[0].status)
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

  // useEffect(() => {
  //   const handleButtonClick = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://fyp-back-end-bay.vercel.app/api/changedetails/gett/${id}/${amd}/${address}/${amount}/${privateKey}/${amount}`
  //       ); 
  //       if (response.data) {
  //        console.log("good");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }; 
  //   handleButtonClick();
  //   console.log("use effect 2");
  // }, [address, amd, amount, id, navigate, privateKey]);

 
  
 

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
    <>
      {data.map((payment, index) => (
        <div className="Mainpamentpage">
          <div className="payment-page">
            <div className="payment-details">
              <h1 className="payment-title">Alpha Payment</h1>
              <div className="payment-amount">
                <span className="payment-amount-value">
                {payment.amount} OutLet
                </span>
                <span className="payment-currency">{payment.amount}</span>
              </div>
              <p>{payment.expiresAt}</p>
              <p className="payment-address">Send the funds to this address</p>
              <div className="copy">
                <p className="payment-address-value">{payment.address}</p>
                <button
                  onClick={() => {
                    handleCopyClick(payment.address);
                  }}
                  className="copy-button"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
              <div>
                {payment.status === "Pending" ? (
                 <div>
                     <div>
                       <QRCode value={payment.address} />
                     </div>
                  </div>
                  // <div>
                  
                  //   {!addresss ? (
                  //     <ConnectWallet
                  //       text="Connect Your Wallet"
                  //       color="primary"
                  //       size="large"
                  //     />
                  //   ) : (
                  //     <button onClick={transferFunds} id="add-fund-button" className="submit-button">
                  //       Add Funds
                  //     </button>
                  //   )}
                  // </div>
                ) : (
                  <div>
                    {/* <p>Already Approved</p> */}
                    <img src="https://media.istockphoto.com/id/1296078405/vector/vector-isolated-round-completed-label.jpg?s=612x612&w=0&k=20&c=CNkTbrNNNikay9hTXc02OXFKF40XZJp_w2eomM4LxEU=" alt="" className="aprImg"  />
                    <a href="https://tiaiuto.shop/index.php/my-account/orders/"  target="_blank" rel="noreferrer">
                    <button  id="add-fund-button" className="submit-button">
                        Payment Confirmed
                      </button>
                  </a>
                  </div>
                )}
              </div>
            </div>

            <div className="payment-info-step__section-status snipcss-vQEDf">
              <div className="transaction-status">
                <div className="transaction-status-item transaction-status__item transaction-status-item_loading">
                  <div className="transaction-status-item__progress">
                    {/*  */}
                    {payment.status === "Pending" ? (
                      <div className="transaction-status-item__spinner"></div>
                    ) : (
                      <div className="transaction-status-item__progress-circle"></div>
                    )}
                  </div>
                  <div className="transaction-status-item__content">
                    <div className="transaction-status-item__title">
                      Waiting
                      <br />
                      for payment
                    </div>
                  </div>
                </div>
                <div className="transaction-status-item transaction-status__item">
                  <div className="transaction-status-item__progress">
                    <div className="transaction-status-item__progress-circle"></div>
                  </div>
                  <div className="transaction-status-item__content">
                    <div className="transaction-status-item__title">
                      Confirming
                      <br />
                      on blockchain
                    </div>
                  </div>
                </div>
                <div className="transaction-status-item transaction-status__item">
                  <div className="transaction-status-item__progress">
                    <div className="transaction-status-item__progress-circle"></div>
                  </div>
                  <div className="transaction-status-item__content">
                    <div className="transaction-status-item__title">
                      Confirmed
                      <br />
                      on blockchain
                    </div>
                  </div>
                </div>
                <div className="transaction-status-item transaction-status__item">
                  <div className="transaction-status-item__progress">
                    <div className="transaction-status-item__progress-circle"></div>
                  </div>
                  <div className="transaction-status-item__content">
                    <div className="transaction-status-item__title">
                      Sending
                      <br />
                      to seller
                    </div>
                  </div>
                </div>
                <div className="transaction-status-item transaction-status__item">
                  <div className="transaction-status-item__progress">
                    {/* <div className="transaction-status-item__progress-circle">
              </div> */}
                    {payment.status === "done" ? (
                      <div className="transaction-status-item__spinner"></div>
                    ) : (
                      <div className="transaction-status-item__progress-circle"></div>
                    )}
                  </div>
                  <div className="transaction-status-item__content">
                    <div className="transaction-status-item__title">
                      Sent to
                      <br />
                      seller 🎉
                    </div>
                  </div>
                </div>
              </div>
              <div className="payment-info-step__form-mobile">
                <div className="email-receipt-field">
                  <input
                    className="email-receipt-field__input"
                    placeholder="Email for transaction receipt"
                    defaultValue
                  />
                  <button type="button" className="email-receipt-field__button">
                    Confirm
                  </button>
                </div>
              </div>
              <div className="b-panel-help payment-info-step__panel-help">
                <div className="b-panel-help__container">
                  <div
                    className="b-panel-help__button"
                    tabIndex={0}
                    role="button"
                  >
                    Back
                  </div>
                  <button
                    onClick={() => {
                      setHelp(!help);
                    }}
                    type="button"
                    className="b-panel-help__button b-panel-help__button_help"
                  >
                    Help
                  </button>
                </div>
                {help ? (
                  <div className="b-panel-help__contents">
                    <div className="b-panel-help__box">
                      <p className="b-panel-help__text">
                        Copy the address and the amount to your wallet and press
                        <span className="b-panel-help__text-bold">Send</span>.
                      </p>
                      <p className="b-panel-help__text">
                        Please don’t send funds using smart contract, we won't
                        be able to detect them.
                      </p>
                      <p className="b-panel-help__text">
                        Still have questions? Reach out via the chat at the
                        bottom right corner.
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="payment-bottom-info invoice__payment-info invoice__payment-info_transaction-page invoice__payment-info_with-order-id snipcss-IleUU">
            <br />
            <br />
            <div className="payment-bottom-info__id">
              Payment ID:
              <br />
              <span>{payment._id}</span>
            </div>
            <div className="payment-bottom-info__id">
              Order ID: {data[0]._id}
            </div>
            <div className="payment-bottom-info__description">
              optional :<span>{payment.note}</span>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="payment-bottom-info__email">
              <div className="payment-bottom-info__email-description">
                Leave your email and we'll notify you when the seller receives
                your payment
              </div>
              <div className="email-receipt-field payment-bottom-info__email-input">
                <input
                  className="email-receipt-field__input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email for transaction receipt"
                />
                <button
                  type="button"
                  onClick={getEmail}
                  className="email-receipt-field__button"
                >
                  Confirm
                </button>
              </div>
              <div className="payment-bottom-info__email-error"></div>
              <div className="payment-bottom-info__text">
                AlphaPayments is for payment processing only. Please contact the
                store with any questions on goods/services
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Linkshow;
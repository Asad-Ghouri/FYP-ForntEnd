import React, { useState , useEffect} from 'react';


import { NavLink , useNavigate } from "react-router-dom";

import "../../App.css"

import MerchatSidebar from './MerchatSidebar';
function MerchatDashboard() {

    const [apiKey, setApiKey] = useState('');
    const navigate = useNavigate();
    const [Infetchkey, setInfetchkey] = useState('');
    const [paymentCount, setpaymentCount] = useState();
    const authToken = localStorage.getItem('token');
    const [donationCount, setdonationCount] = useState();
           
 
  

  useEffect(() => {
    if(!authToken)
    {
        navigate("/");
    }
}, []);

     
   function paymentNavigation(){
    navigate("/PaymentLinkGenerator");
   }
   function donationNavigation(){
    navigate("/DonationNavigation");
   }

   function Apikey(){
    navigate("/GetApikey");
   }

  useEffect(() => {
    async function fetchData() {
        try {
          const response = await fetch(`https://fyp.mahadevonlinebookid.com/api/getUserdata/${authToken}`); // Replace with your API URL
          if (!response.ok) {
            throw new Error("Request failed");
          }
          const data = await response.json();
          console.log("in useEffect data is ",data.apiKeys); // Process the fetched data
          setApiKey(data.apiKeys)
          const totalPaymentLinks = data.paymentLinks.length;
          setpaymentCount(totalPaymentLinks)
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      fetchData();
  }, [Infetchkey]);

  useEffect(() => {
    async function fetchData() {
        try {
          const response = await fetch(`https://fyp.mahadevonlinebookid.com/api/getUserdata/${authToken}`); // Replace with your API URL
          if (!response.ok) {
            throw new Error("Request failed");
          }
          const data = await response.json();
          console.log("in useEffect data is ",data.apiKeys); // Process the fetched data
          setApiKey(data.apiKeys)
          const totalPaymentLinks = data.donationLinks.length;
          setdonationCount(totalPaymentLinks)
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      fetchData();
  }, []);

  return (
    <div className="main">
    
    <MerchatSidebar />
    <div className="pagedata">
      <br />
      <br />
      
      
        <div class="ag-courses_box" >

                    <div class="ag-courses_item" onClick={Apikey}>
                        <div class="ag-courses-item_link">
                            <div class="ag-courses-item_bg"></div>

                            <div class="ag-courses-item_title">
                                <h1>Total Api Keys</h1>
                            </div>

                            <div class="ag-courses-item_date-box">
                                <h2 class="ag-courses-item_date">
                                   {apiKey.length}
                                </h2>
                            </div>
                        </div>
                    </div>
         
                    <div class="ag-courses_item" onClick={paymentNavigation}>
                        <div class="ag-courses-item_link">
                            <div class="ag-courses-item_bg"></div>

                            <div class="ag-courses-item_title">
                                <h1>Payment links</h1>
                            </div>

                            <div class="ag-courses-item_date-box">
                                <h2 class="ag-courses-item_date">
                                    {paymentCount?paymentCount:0}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="ag-courses_item" onClick={donationNavigation}>
                        <div class="ag-courses-item_link">
                            <div class="ag-courses-item_bg" id></div>

                            <div class="ag-courses-item_title">
                                <h1>Donation links</h1>
                            </div>

                            <div class="ag-courses-item_date-box">
                                <h2 class="ag-courses-item_date">
                                    {donationCount?donationCount:0}
                                </h2>
                            </div>
                        </div>
                    </div> 
                   
        </div>
    </div>
    </div>
  );
}

export default MerchatDashboard;

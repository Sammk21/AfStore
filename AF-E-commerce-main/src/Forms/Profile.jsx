import React from "react";
import { useUserAuth } from "../Utils/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import StatusTracking from "../SmallComponents/StatusTrackig/StatusTracking";
import useFetch from "../Hooks/useState";

const Profile = () => {
  
  const { user, logOut } = useUserAuth();


  const renderWarningComponent = () => {
    if(user.emailVerified === false){
      return(
        <>
           <span className="warning">you are not verified yet please check your email </span> 
        </>
      )
    }else{
      return(<>
      
      </>)
    }
   
  }
 


  const navigate = useNavigate();

  const { products, isLoading } = useFetch(
    `/api/orders?populate=*&[filters][customerEmail][$eq]=${user.email}`
  );


  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      alert("unable to logout");
    }
  };
  return (
    <div className="container">
      {/* <StatusTracking/> */}
      <div className="warning-space" style={{display:"flex", justifyContent:"center"}}>
{renderWarningComponent()}
      </div>
 
      <div>
        <h1 class="title-pen">UserProfile</h1>
      
        <div class="user-profile">
          <div class="username my-3">
            <h4 className="m-0 p-0">Hello,</h4>
            {user && user.email}
           
          </div>
          <div class="bio my-2">Orders History: </div>

          <div class="container">
            <ul class="responsive-table">
              <li class="table-header">
                <div className="col col-1">OrderId</div>
                <div className="col col-3">Item</div>
                <div className="col col-3">Total Amount</div>
                <div className="col col-4">Status</div>
              </li>
              {products?.data.map((order) => (
                <li class="table-row" key={order.id}>
                  <div class="col col-1" data-label="Order Id">
                   {order.id}
                  </div>
                 
                  <div class="col col-3" data-label="Item">
                  {order?.attributes?.product?.map((item , i) =>(
                   <span className="item-list" key={i}>
                   <span>{item.attributes.title}</span>,
                   </span>
                  ))}
                  </div>
                  <div class="col col-3" data-label="Total Amount">
                  {order.attributes.subtotal}
                  </div>
                  <div class="col col-4" data-label=" Status">
                    {order.attributes.DeliveryStatus}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="logout my-4" >
            <button type="submit" className="submit-button" style={{maxWidth:"100px"}} onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

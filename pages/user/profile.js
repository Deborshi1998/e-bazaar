import React from "react";
import CartComponent from "../../components/cartComponent";
// import PastOrder from "../../components/pastOrder";
// import { useSelector } from "react-redux";
// import { selectUserToken } from "../../store/cart/userToken";
function Profile() {
    // const user = useSelector(selectUserToken);
    return (
      <div>
        <CartComponent bottomMargin="0px" />
        {/* <PastOrder user={user} /> */}
      </div>
    );
}
export default Profile;
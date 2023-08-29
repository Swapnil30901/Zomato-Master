import "./App.css";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route , Routes} from "react-router-dom";

// Hoc
import HomeLayoutHoc from "./HOC/Home.hoc";
import RestaurantLayoutHoc from "./HOC/Restaurant.hoc";
import CheckoutLayoutHoc from "./HOC/Checkout.hoc";

// Pages
import HomePage from "./pages/HomePage";
// import RestaurantPage from "./pages/RestaurantPage";
import Checkout from "./pages/CheckoutPage";
import GoogleAuth from "./pages/GoogleAuth";
import RedirectRestaurant from "./pages/Restaurant/Redirect";

// components
import Overview from "./component/Restaurant/Overview";
import OrderOnline from "./component/Restaurant/OrderOnline";
import Reviews from "./component/Restaurant/Reviews/Reviews";
import Menu from "./component/Restaurant/Menu/Menu";
import Photos from "./component/Restaurant/Photos/Photos";

// redux
import { useDispatch } from "react-redux";
import { getMySelf } from "./redux/reducers/user/user.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySelf());
  });

  return (
    <>
    <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/restaurant/:id" element={<RedirectRestaurant/>} />
      </Routes> 
      <HomeLayoutHoc path="/:type" element={<HomePage/>} />      
      <HomeLayoutHoc path="/google/:token" element={<GoogleAuth/>} />
      <RestaurantLayoutHoc
        path="/restaurant/:id/overview"
        element={<Overview/>}
      />
      <RestaurantLayoutHoc
        path="/restaurant/:id/order-online"
        element={<OrderOnline/>}
      />
      <RestaurantLayoutHoc
        path="/restaurant/:id/reviews"
        element={<Reviews/>}
      />
      <RestaurantLayoutHoc path="/restaurant/:id/menu" element={<Menu/>} />
      <RestaurantLayoutHoc
        path="/restaurant/:id/photos"
        element={<Photos/>}
      />
      <CheckoutLayoutHoc path="/checkout/orders" element={<Checkout/>} />
    </>
  );
}

export default App;

//   /* NOTE: alternative redirect */
//   /* <Redirect exact from="/" to="/delivery" /> */
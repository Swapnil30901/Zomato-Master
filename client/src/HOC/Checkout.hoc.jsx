import { Route, Routes } from "react-router-dom";

// layout
import CheckoutLayout from "../layouts/Checkout.layout";

function CheckoutLayoutHoc({ component: Component, ...rest }) {
  return (
    <>
    <Routes>
    <Route
        {...rest}
        component={(props) => (
          <CheckoutLayout>
            <Component {...props} />
          </CheckoutLayout>
        )}
      />
    </Routes>
      
    </>
  );
}

export default CheckoutLayoutHoc;
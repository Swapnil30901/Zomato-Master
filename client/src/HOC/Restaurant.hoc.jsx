/* eslint-disable react/prop-types */
import { Route,Routes } from "react-router-dom";

// Layout
import RestaurantLayout from "../layouts/Restaurant.layout";

const RestaurantLayoutHOC = ({ component: Component, ...rest }) => {
  return (
    <>
    <Routes>
      <Route
          {...rest}
          component={(props) => (
            <RestaurantLayout>
              <Component {...props} />
            </RestaurantLayout>
          )}
        />
    </Routes>      
    </>
  );
};

export default RestaurantLayoutHOC;
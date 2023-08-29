import { Route , Routes} from "react-router-dom";

// Layout
import HomeLayout from "../layouts/Homepage.layout";

const HomeLayoutHOC = ({ component: Component, ...rest }) => {
  return (
    <>
    <Routes>
      <Route
          {...rest}
          component={(props) => (
            <HomeLayout>
              <Component {...props} />
            </HomeLayout>
          )}
        />
    </Routes>
     
    </>
  );
};

export default HomeLayoutHOC;
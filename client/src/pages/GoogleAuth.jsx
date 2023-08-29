import  { useEffect } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { googleAuth } from "../redux/reducers/auth/auth.action";

const GoogleAuth = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(googleAuth(token)).then(
        () => (window.location.href = "/delivery")
      );
    }
  }, [token]);

  return <>Loading, Please Wait...</>;
};

export default GoogleAuth;
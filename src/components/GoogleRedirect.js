import React from "react";
import Spinner from "../assets/Spinner.gif";
import axios from "axios";

function GoogleRedirect() {
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    console.log(code);
    /*
    const url = `https://khu-return.site/sign-in/google?code=${code}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = axios.post(url, {}, config);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
    */
  }, []);

  return (
    <div>
      <img
        src={Spinner}
        alt="loading"
      />
    </div>
  );
}

export default GoogleRedirect;

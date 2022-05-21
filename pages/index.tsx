import React, { useEffect, useState } from "react";
import Router from "next/router";

// update main
const Home = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const { pathname } = Router;
    // conditional redirect
    if (pathname == "/") {
      Router.push("/home");
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <div></div>; //show nothing or a loader
  }
};

export default Home;

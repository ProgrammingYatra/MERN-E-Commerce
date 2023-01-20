import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
// import ProductCard from "./ProductCard.js";
// import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const Home = () => {
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },500)
  },[])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
         

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          {/* <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

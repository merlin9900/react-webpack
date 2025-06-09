import React, { lazy } from "react";
import "@/App.css";
import MyImage from "../public/image.jpg";
import Button from "./components/Button";
import Home from "./Home";

const LazyComp = lazy(() => import(/* webpackChunkName: "Lazy" */ "./Lazy"));
const App = () => {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <img src={MyImage} className="img" alt="" />
      <Button onClick={() => {}} text="Click Me" />
      <Home />
      <LazyComp />
    </div>
  );
};

export default App;

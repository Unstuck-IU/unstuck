import React from "react";
import { ChaoticOrbit } from "@uiball/loaders";

const LoadingSpinner = () => {
  return (
    <>
      <ChaoticOrbit
        size={25}
        speed={1.5}
        color="black"
      />
    </>
  );
};

export default LoadingSpinner;

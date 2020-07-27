import React from "react";
import Failure from "../components/result/Failure";
import Success from "../components/result/Success";

export default function Result({ count, total }) {
  if (count < (total / 2)) {
    return <Failure />;
  } else return <Success />;
}

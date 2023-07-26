import React from "react";
import "./StatusTracking.scss"
import useFetch from "../../Hooks/useState";
const StatusTracking = () => {

  // const { data } = useFetch("/api/")

  return (
    <div>
      <ol class="progtrckr" data-progtrckr-steps="2">
        <li class="progtrckr-done">Order Processing</li>
        <li class="progtrckr-todo">Shipped</li>
        <li class="progtrckr-todo">Delivered</li>
      </ol>
    </div>
  );
};

export default StatusTracking;

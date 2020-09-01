import React from "react";

const Like = (props) => {
  let like = "fa fa-heart";
  if (!props.isLiked) like += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={like}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
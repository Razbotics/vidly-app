import React from "react";

const Like = (props) => {
  let like = "clickable fa fa-heart";
  if (!props.isLiked) like += "-o";
  return (
    <i
      onClick={props.onClick}
      className={like}
      aria-hidden="true"
    ></i>
  );
};

export default Like;

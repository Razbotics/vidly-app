import React from "react";

const Like = ({ isLiked, onClick }) => {
  let like = "clickable fa fa-heart";
  if (!isLiked) like += "-o";
  return <i onClick={onClick} className={like} aria-hidden="true"></i>;
};

export default Like;

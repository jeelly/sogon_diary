import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import GlobalStyles from "../css/GlobalStyles";
import Header from "./Header";

const AppLayout = ({ children,socket }) => {
  const detail = useSelector(state => state.post.detailId);

  return (
    <>
        {!detail.id && <Header id={detail.id} status={detail.status} roomName={detail.roomName} socket={socket} />}
          <div>{children}</div>
        <GlobalStyles/>
    </>
  );
};


export default AppLayout
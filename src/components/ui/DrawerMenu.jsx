import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Drawer } from "antd";

import HeaderStyles from "./Header.module.css";
import { CloseOutlined } from "@ant-design/icons";

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ backgroundColor: "#9B68FD", borderColor: "#9B68FDe5" }}
      >
        <div className={"flex flex-col gap-1.5"}>
          <div className={"w-[18px] h-[2px] bg-white"}></div>
          <div className={"w-[18px] h-[2px] bg-white"}></div>
          <div className={"w-[18px] h-[2px] bg-white"}></div>
        </div>
      </Button>
      <Drawer
        title="ASTERISK"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        placement="left"
        size="large"
        open={open}
        styles={{
          body: { backgroundColor: "#282B33" },
          header: { backgroundColor: "#282B33", color: "#ffffff" },
        }}
        closeIcon={<CloseOutlined style={{ color: "#ffffff" }} />}
      >
        <NavLink
          to="/"
          onClick={onClose}
          className={HeaderStyles.burgerLinks}
          style={({ isActive }) => ({
            backgroundColor: isActive && "#575B664d",
            color: isActive ? "#9B68FD" : "#ffffff",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/data-analytics"
          onClick={onClose}
          className={HeaderStyles.burgerLinks}
          style={({ isActive }) => ({
            backgroundColor: isActive && "#575B664d",
            color: isActive ? "#9B68FD" : "#ffffff",
          })}
        >
          Data Analytics
        </NavLink>
        <NavLink
          to="/explore"
          onClick={onClose}
          className={HeaderStyles.burgerLinks}
          style={({ isActive }) => ({
            backgroundColor: isActive && "#575B664d",
            color: isActive ? "#9B68FD" : "#ffffff",
          })}
        >
          Explore
        </NavLink>
        <NavLink
          to="/about-us"
          onClick={onClose}
          className={HeaderStyles.burgerLinks}
          style={({ isActive }) => ({
            backgroundColor: isActive && "#575B664d",
            color: isActive ? "#9B68FD" : "#ffffff",
          })}
        >
          About
        </NavLink>
      </Drawer>
    </>
  );
};
export default DrawerMenu;

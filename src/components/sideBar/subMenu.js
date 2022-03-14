import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../store/auth-context";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 14px;
  border-bottom:1px solid #fff

  &:hover{
    background: #02004a;
    border-left: 4px solid #02004a;
    cursor: pointer;
    color:#0AE7EE;
  }
`;

const DropdownLink = styled(Link)`
background:#0d7ec0;
height:50px;
padding-right:3rem;
display:flex;
align-items:center;
text-decoration:none;
color:#fff;
font-size:12px;
&:hover{
    background:#02004a;
    cursor:pointer;
    color:#0AE7EE;
}

`
const SidebarLabel = styled.span`
  margin-left: 16px;
  &:hover{
    cursor: pointer;
    color:#0AE7EE;
`;

const SubMenu = ({ item }) => {
  const auth = useContext(AuthContext);
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      {item.title === "יציאה מהמערכת" && <SidebarLink to={item.path} onClick={auth.logout}>
        <div>
          <SidebarLabel>{item.icons}{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>}
      {item.title !== "יציאה מהמערכת" && <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        
        <div>
          <SidebarLabel>{item.icons}{item.title}</SidebarLabel>
        </div>
        <div>
          {item.title === "יציאה מהמערכת"? auth.logout : ""}
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>}
      {subnav && item.subNav.map((item,index)=> {
          return (
              <DropdownLink to ={item.path} key={index}>
                  {item.icon}
                  <SidebarLabel>{item.title}</SidebarLabel>

              </DropdownLink>
          )
      })}
    </>
  );
};

export default SubMenu;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  top: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    border-left: 4px solid #02004a;
    cursor: pointer;
    
  }
`;

const DropdownLink = styled(Link)`
background:#0d7ec0;
height:10px;
padding-right:3rem;
display:flex;
align-items:center;
text-decoration:none;
color:#fff;
font-size:18px;
&:hover{
    cursor:pointer;
    color:white;
}

`

const SidebarLabel = styled.span`
  margin-left: 16px;

`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
 return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icons}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
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

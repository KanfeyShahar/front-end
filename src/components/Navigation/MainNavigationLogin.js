import { Fragment, useState } from "react";
import stylied from "styled-components";
import {FaBars} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";

import { SidebarData } from "../sideBar/sidebarData";
import SubMenu from "../sideBar/subMenu";
import SideDrawer from "./SideDrawer";

import {
  NavBtn,
  NavBtnLink,
} from "./HeaderElements";

const Stay = stylied.nav`
    &:active{
      transition: all 0.2s ease-in-out;
      background:none;
      color:#0AE7EE;
 

`

const Tope = stylied(Link)`
@media screen and (min-width : 1500px){    
  position:absolute;
    right:0;
    margin-right:90px;
}
    text-decoration: none;
    color:#fff;
   
    display:flex;
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@900&family=Rubik:wght@600&display=swap');
    font-family: 'Rubik', sans-serif;
    font-size:30px;
    cursor:pointer;
    @media screen and (max-width : 1500px){    
      position:absolute;
      left:0;
      margin-left:10px;
      
    }
    &:hover{
      transition: all 0.2s ease-in-out;
      background:none;
      color:#0AE7EE;
 

`

const NavIcon = stylied(Link)`
@media screen and (min-width : 1500px){    
  display:none;
  position:none;
}
  margin-right:2rem;
    font-size:2rem;
    height:80px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    color:#fff;
  &:hover{
      transition: all 0.2s ease-in-out;
      background:none;
      color:#0AE7EE;
`;

const SidebarNav = stylied.nav`
@media screen and (min-width : 1500px){    
  display:none;
  position:none;
}
  scroll-behaviour: smooth;
  margin-right:auto
    // direction: rtl;
    width:15%;
    height:100vh;
    display:flex;
    justify-content:center;
    position:fixed;
    top:0;
    // right:0;
    right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition:350ms;
    z-index:100;
    background:#0d7ec0;
    color:#fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    &:hover{
      cursor: pointer;
      color:#0AE7EE;
    &:active{ 
      color:#0AE7EE;
  }
`;

const SidebarWrap = stylied.div`
    width: 100;
    
    `;


const MainNavigationLogin = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <Fragment>
        <style>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@600&display=swap');
  </style>
      <MainHeader>
        <div>
      <NavIcon to ="#">
        <FaBars onClick={showSidebar} />
        </NavIcon>
        </div>
        <div>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
          <NavIcon to ="#">
            <AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
        </div>
        <Tope to = "/"> כנפי שחר </Tope>
        <NavBtn>
          <NavBtnLink to="/signin">הרשמה</NavBtnLink>
        </NavBtn>
      </MainHeader>
    </Fragment>
  );
};
export default MainNavigationLogin;

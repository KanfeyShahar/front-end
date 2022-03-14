import React, {useState} from "react";
import stylied from "styled-components";
import { Link } from "react-router-dom";
import {FaBars} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {SidebarData} from './sidebarData';
import SubMenu  from "./subMenu";

const Nav =  stylied.div`
  background:#fff;
  height:80px;
  display:flex;
  justify-content:flex-start;
  align-items:center

`;

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
    &.active{ 
      color:#0AE7EE;
  }
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
    background:#15171c;
    width:250px;
    height: 50vh;
    display:flex;
    justify-content:center;
    position:right;
    top:0;
    left: ${({sidebar})=> (sidebar ? '0': '-100%')};
    transition:350ms;
    z-index:10;

`;

const SidebarWrap=stylied.div`
    width: 100;



`;
// export const Bars = stylied(FaBars)`
// @media screen and (min-width : 1500px){    
//     display:none;
//     position:none;
// }
    

//     @media (max-width : 1500px){
//         color:#fff;
//         display:flex;
//         position:absolute;
//         top:0;
//         right:0;
//         transform : translate(-100% ,65%);
//         font-size : 1.8rem;
//         cursor:pointer;
//         &:hover{ 
//             color:#0AE7EE;
//     }

// `;

// export const Bars2 = stylied(AiOutlineClose)`
// @media screen and (min-width : 1500px){    
//     display:none;
//     position:none;
// }
    

//     @media (max-width : 1500px){
//         color:#fff;
//         display:flex;
//         position:absolute;
//         top:0;
//         right:0;
//         transform : translate(-100% ,65%);
//         font-size : 1.8rem;
//         cursor:pointer;
//         &:hover{ 
//             color:#0AE7EE;
//     }

// `;

const sideBar = () => {
const [sidebar, setSidebar] = useState(false)
const showSidebar =() => setSidebar(!sidebar)
  return (
    <nav>
      <NavIcon to ="#">
        <FaBars onClick={showSidebar} />
      </NavIcon>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to ="#">
            <AiOutlineClose onClick={showSidebar}/>
            </NavIcon>
          {SidebarData.map((item,index)=>{
              return<SubMenu item={item} key={index}/>
          })}
        </SidebarWrap>
      </SidebarNav>
    </nav>
  );
};

export default sideBar;

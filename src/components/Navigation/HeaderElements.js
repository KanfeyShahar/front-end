import styled from 'styled-components';
import {NavLink as Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa'

<html lang ="he"></html>
export const Top = styled.header`
    position: fixed;
    background: #02004A;
    top: 0;
    left: 0;
    width: 100%;
    height:60px;
    display:flex;
    justify-content :space-between;
    padding:10rem calc((100vw-1000px)/2);
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index:7;
    direction: rtl;
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@900&family=Rubik:wght@600&display=swap');
    font-family: 'Rubik', sans-serif;
    
    

`

export const NavLink=styled(Link)`
    color:#fff;
    display:flex;
    align-items:center;
    text-decoration:none;
    padding: 1rem;
    height: 80%;
    cursor:pointer;

    &.active{ 
        color:#0AE7EE;
    }
    &:hover{
        transition: all 0.2s ease-in-out;
        background:none;
        color:#0AE7EE;

`

export const Bars = styled(FaBars)`
@media screen and (min-width : 1500px){    
    display:none;
    position:none;
}
    

    @media (max-width : 1500px){
        color:#fff;
        display-block;
        position:absolute;
        top:0;
        right:0;
        transform : translate(-100% ,65%);
        font-size : 1.8rem;
        cursor:pointer;
        &.hover{ 
            color:#0AE7EE;
    }

`
export const NavMenu= styled.div`
    display: flex;
    align-items:center;
    margin-right: -24px;

    @media screen and (max-width: 768px){
        display:none;
    }
    


`
export const NavBtn = styled.nav`
    display:flex;
    align-items:center;
    margin-right:24px;

    @media screen and (max-width:768 px){
        display:none;
    }
    &.hover{ 
        color:#0AE7EE;

`

export const NavBtnLink = styled(Link)`
    border-radius : 4px;
    background:#256ce1;
    padding:10px 22px;
    color: #fff;
    border:none;
    outline:none;
    cursor:pointer;
    // transition: all 0.2s ease-in-out;
    text-dexoration:none;
    @media (max-width: 1500px)  {
        display: none;
      }

    &:hover{
        transition: all 0.2s ease-in-out;
        background #fff;
        color:#010606;
    }
    
      



`

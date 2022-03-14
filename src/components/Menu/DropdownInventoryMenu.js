import React, {useState} from 'react';
import { OrderItems } from './OrderMenu';
import {Link} from 'react-router-dom';
import '../Navigation/Dropdown.module.css';

function DropdownInventory() {
const [click, setClick] = useState(false)
const handleClick =() => setClick (!click)

    return (<> 
        <ul onClick={handleClick}
        className ={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
            {OrderItems.map((item,index) => {
                return (
                    <li key={index}>
                        <Link 
                        className={item.cName}
                        to={item.path}
                        ocClick={()=>setClick(false)}>
                            {item.title}
                        </Link>
                    </li>
                )
            })}
        </ul>
    </>
        )
};

export default DropdownInventory;
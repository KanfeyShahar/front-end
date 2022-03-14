import React, {useState} from 'react';
import { inventoryItems } from './inventoryMenu';
import {Link} from 'react-router-dom';
import '../Navigation/Dropdown.module.css';



function Dropdown() {
const [click, setClick] = useState(false)
const handleClick =() => setClick (!click)

    return (<> 
        <ul onClick={handleClick}
        className ={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
            {inventoryItems.map((item,index) => {
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

export default Dropdown;
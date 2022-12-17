import Image from "next/image";
import React, { useEffect, useRef } from "react";
import facebook from '../../assets/facebook1.png'
import { MdHome } from "react-icons/md";
import { FiPlayCircle, FiFlag } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { GrGroup, GrAppsRounded } from "react-icons/gr";
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router'
import {useTheme} from 'next-themes'
import Notification from '../HeaderNotification'
import styles from './style.module.css'
import HeaderMenu from "../HeaderMenu";

const Header = () => {
    const [inputActive, setInputActive] = useState(false)
    const [queryParam, setQueryParam] = useState('')
    const [notificationShow, setNotificationShow] = useState(false)
    const [configOptionShow, setConfigOptionShow] = useState(false)
    const [menuShow, setMenuShow] = useState(false)

    const { user, logout } = useContext(AuthContext)
    const menuRef = useRef<any>(null)
    const router = useRouter()
    
    const [width, setWidth] = useState(0)
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);


    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            alert(`${queryParam}`)
        }
    };


 
  return (
    <div className={`${styles.container}`}>
        
        {/* LeftSide */}
        <div className={styles.leftSide}>
            <div className="w-10 h-10 " >
                <Image alt='logo' src={facebook} />
            </div>
            {width < 1000 &&
                <div className={`${styles.search}`}>
                <input
                    style={{
                        ...inputActive ? {width:'200px'} : {width:'0px'}, 
                        ...inputActive ? {cursor:''} : {cursor: 'pointer'},
                    }}
                    className=''
                    placeholder='Pesquisar' 
                    type="text"
                    onKeyDown={keyDownHandler}
                    onChange={e => {setQueryParam(e.target.value)}}
                    onFocus={(e) => {setInputActive(true)}}
                    onBlur={(e) => {setInputActive(false)}}
                />
                </div>
            }
            {width >= 1000 &&
                <div className={`${styles.search}`}>
                <input
                    style={{ width: '200px',}}
                    placeholder='Pesquisar' 
                    type="text"
                    onKeyDown={keyDownHandler}
                    onChange={e => {setQueryParam(e.target.value)}}
                    onFocus={(e) => {setInputActive(true)}}
                    onBlur={(e) => {setInputActive(false)}}
                />
                </div>
            }
        </div>

        {/* Middle */}
        <div className={styles.middleSide}>
            <span onClick={() => router.push('/')} className="hover:bg-[#f2f3f7] transition-all duration-200 hover:scale-[110%] p-2 rounded-full"><MdHome className="w-9 h-9" /></span>
            <span className="hover:bg-[#f2f3f7] transition-all duration-200 hover:scale-[110%] p-2 rounded-full"><FiFlag className="w-7 h-7" /></span>
            <span className="hover:bg-[#f2f3f7] transition-all duration-200 hover:scale-[110%] p-2 rounded-full"><FiPlayCircle className="w-7 h-7" /></span>
            <span className="hover:bg-[#f2f3f7] transition-all duration-200 hover:scale-[110%] p-2 rounded-full"><BsCart3 className="w-7 h-7" /></span>
            <span className="hover:bg-[#f2f3f7] transition-all duration-200 hover:scale-[110%] p-2 rounded-full"><GrGroup className="w-7 h-7" /></span>
        </div>

        {/* RightSide */}
        <div className={styles.rightSide}>
            <div  className={styles.rightSideMenu}  >

                
                {/* <button  onClick={() => setNotificationShow(!notificationShow)} id="dropdownNotificationButton"  data-dropdown-toggle="dropdownNotification" className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-non" type="button"> 
                    <svg   className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                    <div className="flex relative">
                        <div className="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    </div>
                </button>
                <Notification  show={notificationShow} setShow={setNotificationShow}/> */}

                <span ref={menuRef}  onClick={() => setMenuShow(!menuShow)} className="relative  hover:bg-[#f2f3f7] transition-all duration-200 hover:scale-[110%] p-2 rounded-full"><GrAppsRounded  className="w-7 h-7" /></span>
                <HeaderMenu menuRef={menuRef} show={menuShow} setShow={setMenuShow} />
            </div>

            <div  className="w-10 h-10 cursor-pointer relative ">
                {user  &&
                    <img
                        onClick={() => setConfigOptionShow(!configOptionShow)}
                        src={user.avatar as string}
                        alt='user'
                        className="rounded-full"
                    />
                }
                {configOptionShow &&
                    <div onMouseLeave={() => setConfigOptionShow(false)} id="dropdownDotsHorizontal" className="top-14 right-0 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="z-auto py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <a  onClick={() => router.push(`${user?.id}`)}  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Meu Perfil</a>
                            </li>
                            <li>
                                <a onClick={() => router.push(`${user?.id}/config`)}  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Configuracoes</a>
                            </li>
                            <li>
                                <a onClick={() => logout()}  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Deslogar</a>
                            </li>
                        </ul>
                    </div>
                }
                    
            </div>

        </div>
    </div>
  );
};

export default Header;

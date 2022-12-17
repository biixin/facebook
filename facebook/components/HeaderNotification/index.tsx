import Image from "next/image";
import React, { useEffect, useRef } from "react";
import facebook from '../../assets/facebook1.png'
import guy from '../../assets/guy7.jpg'
import { MdHome } from "react-icons/md";
import { FiPlayCircle, FiFlag } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { GrGroup, GrAppsRounded } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router'
import styles from './style.module.css'

type Props = {
    show: boolean
    setShow: (x: boolean) => void
}

const Notification = ({show, setShow}: Props) => {
    const refOne2 = useRef<any>(null)

    useEffect(() => {
      const delay = async (ms: any) => new Promise(r => setTimeout(r, ms))
      const f = async () => {
        if(show) {
            await delay(500)
            alert('Em construcão !')
        }
      }
      f()

    }, [show])


    // hide notification
    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside, true)
    // }, [])
  
    // const handleClickOutside = (e: MouseEvent) => {
    //     if(!show) {
    //         if(!refOne2.current.contains(e.target)) {
    //             setShow(false)
    //         }
    //     }
    // }
    
  return (
    <>
        <div ref={refOne2}>
            {show &&
            <>
                <div style={{display: show ? 'block' : 'none'}} id="dropdownNotification" className={styles.notification} aria-labelledby="dropdownNotificationButton">
                    <div className="block py-2 px-4 font-medium text-center border-b-[1px] text-white bg-gray-700">
                        Notifications
                    </div>
                    <div className="divide-y dark:divide-gray-700">
                        <a href="#" className="flex py-3 px-4 hover:bg-gray-600">
                            <div className="flex-shrink-0">
                                <img className="w-11 h-11 rounded-full" src={guy.src} alt="Jese image" />
                                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
                                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                
                                </div>
                            </div>
                            <div className="pl-3 w-full">
                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">Nova mensagem de <span className="font-semibold text-white ml-0 mr-0 pr-0 pl-0">SaagaS :</span><br /> "Seja bem vindo ao DEVBOOK !"</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">6 anos atrás</div>
                            </div>
                        </a>

                    </div>
                    {/* <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                        <div className="inline-flex items-center ">
                        <svg className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                            View all
                        </div>
                    </a> */}
                </div>
            </>
            } 
        </div>  
    </>
  );
};

export default Notification;

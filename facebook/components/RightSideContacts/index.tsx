import React, { useEffect, useContext, useState } from "react";
import albert from "../../assets/1albert.jpg";
import arnold from "../../assets/1arnold.jpg";
import drphil from "../../assets/1drphil.webp";
import elon from "../../assets/1elon.webp";
import kobe from "../../assets/1kobe.webp";
import miketyson from "../../assets/1miketyson.jpg";
import mrbeast from "../../assets/1mrbeast.jpg";
import rihana from "../../assets/1rihana.jpg";
import therock from "../../assets/1rock.jpg";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import dots from "../../assets/dots.png";
import Image from "next/image";
import styles from './style.module.css'
import api from "../../libs/api";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../types/User";
import { upperFirstLetter } from "../../helpers/firstLetterCase";
import { useQuery } from 'react-query'

const RightSideContacts = () => {
    const { user } = useContext(AuthContext)

    const { data: friendList, isFetching } = useQuery<User[]>('contacts', async () => {
        const response = await api.getAllFriends(user?.id as number)
        return response
    })

    return (

        <>
            {friendList && friendList.length > 0 &&
                <>
                    <div className="flex items-center ">
                        <p className="pr-4 font-bold">Contatos</p>
                    </div>
                    <div className={styles.container}>
                        <div className="space-y-4 mt-4">
                            {friendList &&
                                <>
                                    {friendList.map((item, key) => (
                                        <div key={key} className="flex items cente max-w-[16rem] cursor-pointer rounded-xl hover:bg-gray-200 transition-all hover:scale-[101%] ">
                                            <div className="relative w-12 h-12 flex min-w-[10px] ">
                                                <img src={item.avatar} className='object-cover rounded-full' />
                                                <div className="absolute w-3.5 h-3.5 bg-green-500 rounded-full bottom-0 right-0.5 p-1 border-2 border-white">

                                                </div>
                                            </div>
                                            <p className="pl-3 font-semibold truncate">{upperFirstLetter(item.name)}</p>
                                        </div>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                </>
            }

        </>


    );
};

export default RightSideContacts;

import React, { useContext } from "react";
import { MdGroups } from "react-icons/md";
import { BsCart3, BsPeopleFill, BsCalendar2Fill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { upperFirstLetter } from "../../helpers/firstLetterCase";
import styles from './style.module.css'
import { useRouter } from 'next/router'

const menuItems = {
    assistir: {
        title: 'Assistir',
        icon: <AiFillClockCircle className="w-8 h-8" />,
        nav: '/'
    },
    amigos: {
        title: 'Amigos',
        icon: <BsPeopleFill className="w-8 h-8" />,
        nav: '/'
    },
    grupos: {
        title: 'Grupos',
        icon: <MdGroups className="w-8 h-8" />,
        nav: '/'
    },
    mercado: {
        title: 'Mercado',
        icon: <BsCart3 className="w-8 h-8" />,
        nav: '/'
    },
    eventos: {
        title: 'Eventos',
        icon: <BsCalendar2Fill className="w-8 h-8" />,
        nav: '/'
    },
    memorias: {
        title: 'Memórias',
        icon: <AiFillClockCircle className="w-8 h-8" />,
        nav: '/'
    }

}
const LeftSidebar = () => {
    const { user } = useContext(AuthContext)
    const router = useRouter()

    return (
        <div className={styles.container}>

            <div className={styles.menuPerfilItem}>
                <div onClick={() => router.push(`/${user?.id}`)} className="w-9 h-9 shrink-0">
                    <img src={user?.avatar} alt="" className="rounded-full" />
                </div>
                <p>
                    {upperFirstLetter(user?.name as string)}
                </p>
            </div>

            <div className={styles.border}></div>

            {Object.entries(menuItems).map(([key, value]) => {
                return (
                    <div key={key} className={styles.menuItem} onClick={() => router.push(`${value.nav}`)}>
                        {value.icon}
                        <p className="ml-2 font-bold" >{value.title}</p>
                    </div>
                )
            })}
            
        </div>
    );
};

export default LeftSidebar;

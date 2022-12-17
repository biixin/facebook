import { useEffect, useRef } from 'react';
import styles from './style.module.css'
import { AiFillHome,  } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';


type Props = {
    show: boolean
    setShow: (x: boolean) => void
    menuRef: any
}

const HeaderMenu = ({ show, setShow, menuRef }: Props) => {

    const { user } = useContext(AuthContext) 
    const router = useRouter()
    const ref = useRef<any>(null)

    return (
        <>
            {show &&
                <>
                    <div onMouseLeave={() => setShow(false)} ref={ref} className={styles.container}>
                        <h2>Menu</h2>

                        <div onClick={() => router.push('/')} className={styles.item}>
                            <div className="rounded-full p-2 mb-2 bg-gray-600">
                                <AiFillHome className="text-white text-2xl" />
                            </div>
                            <div className="flex-colum ml-2 text-white">
                                <p className="font-semibold">Inicio</p>
                                <div className="text-[#B0B3B8]">
                                    Ir para a página inicial da devbook
                                </div>
                            </div>
                        </div>

                        <div onClick={() => router.push(`/${user?.id}`)} className={styles.item}>
                            <div className="rounded-full p-2 mb-2 bg-gray-600">
                                <CgProfile className="text-white text-2xl" />
                            </div>
                            <div className="flex-colum ml-2 text-white">
                                <p className="font-semibold">Meu Perfil</p>
                                <div className="text-[#B0B3B8]">
                                    Ir para o meu perfil
                                </div>
                            </div>
                        </div>

                        <div onClick={() => router.push(`/${user?.id}/amigos`)} className={styles.item}>
                            <div className="rounded-full p-2 mb-2 bg-gray-600">
                                <FaUserFriends className="text-white text-2xl" />
                            </div>
                            <div className="flex-colum ml-2 text-white">
                                <p className="font-semibold">Amigos</p>
                                <div className="text-[#B0B3B8]">
                                    Ver todas as amizades
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </>
            }
        </>
    );
};

export default HeaderMenu;

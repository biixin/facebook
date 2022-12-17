import styles from './template.module.css'
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../../types/User';
import * as Photos from '../../libs/photos'
import { useQueryClient } from "react-query";
import { request } from 'https';
import api from '../../libs/api';
import { useRouter } from 'next/router';

type Props = {
    data: User | null
    setModalStatus: (txt: boolean) => void
}

export const ModalProfileEdit = ({ data, setModalStatus }: Props) => {


    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()

    const [bgImage, setBgImage] = useState<null | FileList>(null)
    const bgRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

    const [profileImage, setProfileImage] = useState<null | FileList>(null)
    const profileRef = React.useRef() as React.MutableRefObject<HTMLInputElement>


    const handleSave = async () => {

        if(bgImage == null && profileImage == null) {
            return 
        }
        setLoading(true)

        if(bgImage != null || profileImage != null) {
            const bgUrl = ''
            const profileUrl = ''
            if(bgImage !== null) {
                const request: any = await Photos.insert(bgImage[0])
                const editBackgroundUser = await api.EditBackgroundUser(request.url, data?.id as number)
            }
            if(profileImage !== null) {
                const request: any = await Photos.insert(profileImage[0])
                const profile = await api.EditProfileUser(request.url, data?.id as number)
            }


            queryClient.invalidateQueries(['user'])
            setBgImage(null)
            setProfileImage(null)
            
            router.reload()
            setModalStatus(false)
            setLoading(false)
            
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Editar Informacoes
            </div>
            <div className={styles.photo}>
                <div className={styles.item}>
                    <div className="flex justify-between w-full mb-2">
                        <p className="font-semibold">Foto de fundo</p>
                        <span onClick={() => bgRef.current.click()} className="cursor-pointer text-blue-500 p-1 px-2 rounded-md hover:bg-[#f2f3f7]">Editar</span>
                    </div>

                    {bgImage == null ?
                        <img src={data?.background} alt="" className='w-[200px] h-[130px] object-fill rounded-xl' />
                        :
                        <img src={URL.createObjectURL(bgImage[0])} alt="" className='w-[200px] h-[130px] object-fill rounded-xl' />
                    }

                    <input ref={bgRef} type="file" className="hidden" accept="image/jpeg, image/jpg, image/png" onChange={(e) => setBgImage(e.currentTarget.files)} />
                </div>
                <div className={styles.item}>
                    <div className="flex justify-between w-full mb-2">
                        <p className="font-semibold">Foto de Perfil</p>
                        <span onClick={() => profileRef.current.click()} className="cursor-pointer text-blue-500 p-1 px-2 rounded-md hover:bg-[#f2f3f7]">Editar</span>
                    </div>

                    {profileImage == null ?
                        <img src={data?.avatar} alt="" className='w-20 h-20 rounded-full' />
                        :
                        <img src={URL.createObjectURL(profileImage[0])} alt="" className='w-20 h-20 rounded-full' />
                    }

                    <input ref={profileRef} type="file" className="hidden" accept="image/jpeg, image/jpg, image/png" onChange={(e) => setProfileImage(e.currentTarget.files)} />


                </div>
            </div>

            <div className={styles.finish}>
                <button onClick={() => handleSave()}>Salvar</button>
            </div>

            {/* Dados pessoais */}

            {/* <div className={styles.formArea}>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputArea} >
                        <input type="text" placeholder='Nome' />
                        
                    </div>

                    
                    <div className={styles.inputArea} >
                        <input  type="text" placeholder='Email' />
                    </div>
                    

                    <div className={styles.inputArea}>
                        <input  type={showPassword ? 'text' : 'password'} placeholder='Senha' />
                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword &&
                                <span><EyeOff /></span>
                            }
                            {showPassword &&
                                <span><EyeOn /></span>
                            }
                        </span>
                    </div>
                    
                   

                    <button type="submit">Salvar</button>

                </form>
            </div> */}
        </div>
    )
}
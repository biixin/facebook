import styles from './template.module.css'
import React, { useEffect, useRef, useState } from 'react';
import * as Photos from '../../libs/photos'
import TextareaAutosize from 'react-textarea-autosize';
import { Post } from '../../types/Post';
import { upperFirstLetter } from '../../helpers/firstLetterCase';
import api from '../../libs/api';
import { AuthContext } from './../../context/AuthContext';
import { useContext } from 'react';

type Props = {
    data: Post | undefined
}

export const ModalEditPost = ({data}: Props) => {
    const [body, setBody] = useState('')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [image, setImage] = useState<null | FileList>(null)
    const fileRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
      if(data) {
        setBody(data.body)
        setImage(null)
      }
      if(data?.Image) {
        setImageUrl(data?.Image.url)
      } else {
        setImageUrl(null)
      }
    }, [data])

    const handleEdit = async () => {
        if(body == data?.body && image == null) {
            return
        }
        setLoading(true)
        if(body != data?.body) {
            const editPost = await api.EditPost(user?.id as number, data?.id as number, body)
        }
        if(image != null) {
            const photo: any = await Photos.insert(image[0])
            const editImage = await api.EditImage(data?.id as number, photo.id, photo.url)
        }
        alert('sucesso')
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Editar publicacao
            </div>
            <div className={styles.perfil}>
                <div className="mr-2">
                    <img src={data?.User.avatar} alt="image" width={40} height={40} className='rounded-full' />
                </div>
                <div className="font-semibold">
                    <p className="">{upperFirstLetter(data?.User?.name as string)}</p>
                    <div className={styles.privacity}>
                        Publico
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                
                <div className={styles.body}>
                <TextareaAutosize placeholder="Digite um comentário" value={body} onChange={(e) => setBody(e.target.value)} className=" rounded-2xl mt-1  outline-0 bg-[#f2f3f7]  p-2 w-full resize-none overflow-hidden" />
                </div>
                <div className={styles.image}>
                    {/* {imageUrl != '' && image == null &&
                        <img src={imageUrl} alt="x" />
                    }
                    {image !== null &&
                        <img src={URL.createObjectURL(image[0])} alt="x" />
                    } */}
                    {/* {image == null ?
                        <img src={imageUrl as string} alt="x" />
                        :
                        <img src={URL.createObjectURL(image[0])} alt="x" />
                    } */}
                    {image == null &&
                        <>
                            {imageUrl != null &&
                                <img src={imageUrl as string} alt="x" />
                            }
                        </>
                    }
                    {image != null &&
                        <img src={URL.createObjectURL(image[0])} alt="x" />
                    }
                    <input type="file" accept="image/jpeg, image/jpg, image/png" className="hidden" ref={fileRef} onChange={(e) => setImage(e.currentTarget.files)} />
                </div>
            </div>
            <div className={styles.options}>
                <div onClick={() => fileRef.current.click()}>Adicionar uma foto a sua publicacao </div>
            </div>
            <div className={styles.finish}>
                <button onClick={handleEdit}>Salvar</button>
            </div>
        </div>
    )
}
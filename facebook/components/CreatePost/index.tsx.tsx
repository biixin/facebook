import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import guy from "../../assets/guy7.jpg";
import camera from "../../assets/camera.png";
import photos from "../../assets/photos.png";
import smile from "../../assets/smile.png";
import { AuthContext } from "../../context/AuthContext";
import api from "../../libs/api";
import { upperFirstLetter } from "../../helpers/firstLetterCase";
import { useRouter } from 'next/router';
import * as Photos from '../../libs/photos'
import { useQueryClient } from "react-query";
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { debounce } from "debounce";


const CreatePost = () => {
  const [body, setBody] = useState('')
  const [image, setImage] = useState<null | FileList>(null)
  const [loading, setLoading] = useState(false)

  const imageRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const router = useRouter()

  

  const handleSubmit = async () => {
    if(!body && !image) {
      return alert('erro')
    }
    setLoading(true)

    const newPost = await api.AddPost(user?.id as number, body)

    if(image != null) {
      const result: any = await Photos.insert(image[0])
      const requestImage = await api.AddImage(newPost.id, result.id, result.url)
      setImage(null)
    }
    setBody('')
    queryClient.invalidateQueries(['posts'])
    setLoading(false)
    
  }

  const debounci = debounce(handleSubmit, 200)

  return (
    <div className=" sm:w-full w-[528px] ">
      {loading &&
        <div className="w-full items-center justify-center flex mt-5">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      }
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
        <div className=" mt-8 flex items-center w-full p-3 pt-4 ">
          <div className="w-12 h-12 shrink-0 cursor-pointer">
            <img
              onClick={() => router.push(`/${user?.id}`)}
              src={user?.avatar as string}
              alt="guy"
              className="rounded-full "
            />
          </div>
          <div className="flex items-center ml-5 w-full  ">
            <input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              type="text"
              placeholder={`O que você está pensando ${upperFirstLetter(user?.name as string)} ?`}
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
            />
          </div>

          
          <button onClick={() => debounci()} disabled={loading}  className="font-bold text-white flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4 cursor-pointer hover:opacity-90">
            Postar
          </button>
          
        </div>

        <div className="">
          {image != null  &&
            <div className="relative">
              <img src={URL.createObjectURL(image[0])} alt="" className="w-full" />
              <span onClick={() => setImage(null)} className="absolute text-red-500 cursor-pointer right-2 top-2 text-3xl bg-gray-700 rounded-full p-1 hover:bg-gray-500 "><AiOutlineClose /> </span>
            </div>
          }
        </div>



        <div
          className="
        border-b mb-4 mt-2"
        ></div>

        <div className="flex justify-between mx-3 sm:mx-9 pb-4   ">
          <div className="flex items-center rounded-lg hover:bg-[#f2f3f7] py-2 px-5 cursor-pointer transition-all hover:scale-[110%]">
            <div className=" w-7 h-7">
              <Image src={camera} alt="camera" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Live</p>
          </div>

          <div onClick={() => imageRef.current.click()}  className="flex items-center rounded-lg hover:bg-[#f2f3f7] py-2 px-5 cursor-pointer transition-all hover:scale-[110%]">
            <div className=" w-7 h-7">
              <Image src={photos} alt="camera" />
              <input type="file" accept="image/jpeg, image/jpg, image/png" className="hidden" ref={imageRef} onChange={(e) => setImage(e.currentTarget.files)} />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Foto</p>
          </div>


          <div className="flex items-center rounded-lg hover:bg-[#f2f3f7] py-2 px-5 cursor-pointer transition-all hover:scale-[110%]">
            <div className=" w-7 h-7">
              <Image src={smile} alt="camera" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Atividades</p>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default CreatePost;

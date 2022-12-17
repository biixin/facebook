import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { upperFirstLetter } from "../../helpers/firstLetterCase";
import api from "../../libs/api";
import { User } from "../../types/User";
import Image from 'next/image'
import therock from '../../assets/therock.jpg'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip'
import { useMutation, useQueryClient } from 'react-query'

type Props = {
  item: User
}

const RightSideRequestItem = ({item}: Props) => {
  const [listPendent, setListPendent] = useState<User[]>([])
  const { user } = useContext(AuthContext)
  const client = useQueryClient()

  const { mutate: acceptFriend } = useMutation((id: number) =>
      api.acceptFriendRequest(id, user?.id as number), {
      onSuccess: () => { 
        client.invalidateQueries(["contacts"]);
        client.invalidateQueries(["requestsFriends"]);
      }
  })

  const { mutate: rejectFriend } = useMutation((id: number) =>
      api.rejectFriendRequest(id, user?.id as number), {
      onSuccess: () => {client.invalidateQueries(["requestsFriends"]);
      }
  })

  // const handleAccept = async (id: number) => {
  //   const json = await api.acceptFriendRequest(id, user?.id as number)
  // }
  // const handleReject = async (id: number) => {
  //   const json = await api.rejectFriendRequest(id, user?.id as number)
  // }

  return (
    <>
      <ReactTooltip className="opacity-100" id="accept" place='top' effect="solid" type='success' />
      <ReactTooltip className="opacity-100" id="warning" place='top' effect="solid" type='error' />

      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center cursor-pointer">
            <span><img className='w-10 h-10 rounded-full' src={item.avatar} alt={'avatar'} /></span>
            <span className='ml-1 font-semibol text-[14px] truncate mr-2 hover:underline' >{upperFirstLetter(item.name)}</span>
        </div>
        <div >
            <button onClick={() => acceptFriend(item.id)} data-tip={'Aceitar'} data-for='accept' className="!text-green-500 px-2 py-1 mr-2" style={{color: 'rgb(34, 197, 94)'}}><AiOutlineCheck /></button>
            <button onClick={() => rejectFriend(item.id)} data-tip={'Rejeitar'} data-for='warning' className="!text-red-500"> <AiOutlineClose /> </button>
        </div>
      </div>
    </>
  );
};
// onClick={() => handleAddFriend(item.id)}
export default RightSideRequestItem;

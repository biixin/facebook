import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { upperFirstLetter } from "../../helpers/firstLetterCase";
import api from "../../libs/api";
import { User } from "../../types/User";
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router';

type Props = {
  item: User
}



const RightSideSuggestItem = ({item}: Props) => {
  const [added, setAdded] = useState(false)
  const { user } = useContext(AuthContext)
  const client = useQueryClient()
  const router = useRouter()

  const { mutate: addFriend } = useMutation((id: number) =>
      api.sentFriendRequest(user?.id as number, id), {
      onSuccess: () => {
        client.invalidateQueries(["requestsFriends"])
        setAdded(true)

      }
  })
  const handleAddFriend = async (id: number) => {
    if(added) {
        return alert('Pedido já enviado, aguarde !')
    }
    // const json = await api.sentFriendRequest(user?.id as number, id)
    // if(json.status) {
    //     setAdded(true)
    // }
    addFriend(id)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <div onClick={() => router.push(`/${item.id}`)} className="flex items-center cursor-pointer">
            <span><img className='w-10 h-10 rounded-full' src={item.avatar} alt={'avatar'} /></span>
            <span className='ml-1 font-semibol text-[14px] truncate mr-2 hover:underline' >{upperFirstLetter(item.name)}</span>
        </div>
        <div onClick={() => handleAddFriend(item.id)}>
            {!added && <button className='bg-[#5971f8] text-white px-2 hover:opacity-80'>Adicionar</button>}
            {added && <button className='bg-[green] text-white px-2 hover:opacity-80'>Pendente</button>}
        </div>
      </div>
    </>
  );
};

export default RightSideSuggestItem;

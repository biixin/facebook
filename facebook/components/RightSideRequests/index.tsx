import React, { useContext, useEffect, useState } from "react";
import styles from './style.module.css'
import Image from 'next/image'
import therock from './../../assets/therock.jpg'
import { User } from "../../types/User";
import api from "../../libs/api";
import RightSideSuggestItem from "../RightSideSuggestItem";
import RightSideRequestItem from './../RightSideRequestsItem/index';
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from 'react-query'

const RightSideRequests = () => {
  const { user } = useContext(AuthContext)

  const {data: requestList, isFetching} = useQuery<User[]>('requestsFriends', async () => {
    const response = await api.getAllRequestFriends(user?.id as number)
    return response
  })
  

  return (

    <>
        {requestList && requestList.length > 0 && 
          <>
            <div className="flex justify-between">
              <p className="font-semibold">Pedidos de Amizade</p>
              <strong className="cursor-pointer">Ver Todos</strong>
            </div>
            <div className={styles.suggest} style={{maxHeight: '250px'}}>
                  
                <div className={styles.suggestList}>
                  {requestList.map((i, k) => (
                    <RightSideRequestItem key={k} item={i} />
                  ))}
                </div>
                  
            </div>
            <div className={styles.border}>
              
            </div>
          </>
        } 
    </>
  );
};

export default RightSideRequests;

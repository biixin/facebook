import React, { useContext, useEffect, useState } from "react";
import styles from './style.module.css'
import Image from 'next/image'
import therock from './../../assets/therock.jpg'
import { User } from "../../types/User";
import api from "../../libs/api";
import { AuthContext } from "../../context/AuthContext";
import { upperFirstLetter } from "../../helpers/firstLetterCase";
import RightSideSuggestItem from "../RightSideSuggestItem";
import { useQuery } from 'react-query'

const RightSideSuggest = () => {
  const { user } = useContext(AuthContext)

  const {data: suggestList, isFetching} = useQuery<User[]>('suggest', async () => {
    const response = await api.getSuggestList(user?.id as number)
    return response
  })
  

  return (
    <>
      
      {suggestList && suggestList.length > 0 &&
        <>
          <div className="flex justify-between ">
            <p className="font-semibold mr-2">Sugestões para você</p>
          </div>
          <div className={styles.suggest} style={{maxHeight: '250px'}}>
            
              <div className={styles.suggestList}>
                {suggestList.map((i, k) => (
                  <RightSideSuggestItem key={k} item={i} />
                ))}
              </div>
            
          </div>
          <div className={styles.border}></div>
        </>
      }
    </>
  );
};

export default RightSideSuggest;

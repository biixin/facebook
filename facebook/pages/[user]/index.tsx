import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Head from 'next/head'
import { upperFirstLetter } from './../../helpers/firstLetterCase';
import Header from '../../components/Header';
import styles from '../../styles/User.module.css'
import Profile from '../../components/Profile';
import { GetServerSideProps } from 'next';
import nookies, { parseCookies } from 'nookies'
import PostsProfile from '../../components/Posts Profile';
import api from '../../libs/api';
import { User } from '../../types/User';
import {useQuery} from 'react-query'

const index = () => {
    const [user, setUser] = useState<User>()
    const router = useRouter()

    const {data: User, isFetching} = useQuery("user", async () => {
        const response = await api.getOneUser(router.query['user'] as string)
        return response
    })
    

    useEffect(() => {
       
        if(!isFetching) {
            if(!User.status) {
                router.push('/')
            }
            
            setUser(User.users)
        }
    }, [User, router.query['user']])
        
    

    
    return (
        <>
                 
            <div className="">
                <Head>
                    <title>{`DevBook`}</title>
                </Head>

                {/* Header */}

                <div className={styles.header}>
                    <Header />
                </div>

                {user &&
                    <div className={styles.main}>
                        <div className={styles.mainArea}>
                  
                                <Profile user={user} />
                                <PostsProfile />
                            
                        </div>
                    </div>
                }

            </div>
            
        </>
    )
}

// type Props = {
//     userQuery: number
//     user: User | null
// }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = parseCookies(ctx)
    
    if (!token) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            }
        }
    }

    // const userQuery = ctx.query['user']
    // let user: User | null = null

    // try {
    //     const json = await api.getOneUser(userQuery as string)
    //     if(!json.status) {
    //         return {
    //             redirect: {
    //                 destination: "/",
    //                 permanent: false,
    //             },
    //         };
    //     }
    //     user = json.users

    // } catch (err) {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false,
    //         },
    //     };
    // }

  
    return {
        props: {
            // userQuery,
            // user
        }
    }
  }

export default index



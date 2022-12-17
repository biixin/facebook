import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next';
import nookies, { parseCookies } from 'nookies'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSideBar';
import CreatePost from '../components/CreatePost/index.tsx';
import Posts from '../components/Posts';
import RightSideContacts from '../components/RightSideContacts';
import RightSideSuggest from '../components/RightSideSuggest/index';
import RightSideRequests from '../components/RightSideRequests';
import { useRouter } from 'next/router';

export default function Home() {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  

  return (
    <>
        {user &&
            <div>
                <Head>
                    <title>DevBook - SaagaS</title>
                </Head>
                
                {/* Header */}
                <div className={styles.header}>
                    <Header />
                </div>

                {/* Main */}
                <div className={`${styles.main}`}>
                    
                    {/* LeftSide */}
                    <div className={styles.leftSide}>
                        <LeftSidebar />
                    </div>

                    {/* Center */}
                    <div className={styles.centerContainer}>
                        <div className={styles.centerArea}>
                            <div className={styles.limit}>
                                {/* <Stories /> */}
                                <CreatePost />
                                <Posts />
                            </div>
                        </div>
                    </div>


                    {/* RightSide */}
                    <div className={styles.rightSide}>
                        <RightSideSuggest />
                        <RightSideRequests />
                        <RightSideContacts />
                    </div>

                </div>
            </div>
        }
      
    </>
  )
}




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

  return {
      props: {

      }
  }
}
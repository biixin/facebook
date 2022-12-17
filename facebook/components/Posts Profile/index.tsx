import React, { useContext, useEffect, useState } from "react";
import PostItem from "../PostsItem";
import api from "../../libs/api";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../types/Post";
import {useQuery} from 'react-query'
import { Modal } from '../modal/index';
import { ModalEditPost } from "../modalEditPost";
import { useRouter } from 'next/router';

const PostsProfile = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const [modalData, setModalData] = useState<Post>()

  const { user } = useContext(AuthContext)
  const router = useRouter()

  const {data: posts, isFetching} = useQuery<Post[]>("myPosts", async () => {
    const response = await api.GetMyPosts(router.query['user'] as string)
    return response
  })

  return (
    <div className="sm:w-full w-[528px]">
      <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">

        {/* <PostItem /> */}
        {posts &&
          <>
            {posts?.map((post, key) => {
                return (
                    <PostItem key={key} data={post} setModalStatus={setModalStatus} setModalData={setModalData}  />
                )
            })}
          </>
        }
      </div>

      <Modal modalStatus={modalStatus} setStatus={setModalStatus}>
          <ModalEditPost data={modalData} />
      </Modal>

    </div>
  );
};

export default PostsProfile;

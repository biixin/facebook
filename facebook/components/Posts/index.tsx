import React, { useContext, useEffect, useState } from "react";
import PostItem from "../PostsItem";
import api from "../../libs/api";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../types/Post";
import {useQuery} from 'react-query'
import { Modal } from './../modal/index';
import { ModalEditPost } from "../modalEditPost";

const Posts = () => {
  const { user } = useContext(AuthContext)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalData, setModalData] = useState<Post>()

  const {data: posts, isFetching, refetch: refetchPost} = useQuery<Post[]>("posts", async () => {
    const response = await api.GetAllPosts(user?.id as number)
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
                    <PostItem key={key} setModalStatus={setModalStatus} setModalData={setModalData} data={post} />
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

export default Posts;

// {posts.map((i, k) => (
//     <PostItem data={i} key={k} />
//   ))}
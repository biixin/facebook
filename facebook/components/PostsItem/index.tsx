import React, { useContext, useEffect, useRef, useState } from "react";
import dots from "../../assets/dots.png";
import hearth from "../../assets/hearth.png";
import like from "../../assets/like.png";
import { BiLike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import share from "../../assets/share.png";
import { BiWorld } from "react-icons/bi";
import Image from "next/image";
import { Post } from "../../types/Post";
import { dateMoment } from "../../helpers/postedAgo";
import { upperFirstLetter } from "../../helpers/firstLetterCase";
import TextareaAutosize from 'react-textarea-autosize';
import { AuthContext } from "../../context/AuthContext";
import api from "../../libs/api";
import styles from './styles.module.css'
import { useRouter } from 'next/router';
import { sortPostById } from './../../helpers/sortPosts';
import { useMutation, useQueryClient } from 'react-query'

type Props = {
    data: Post
    setModalStatus: (x: boolean) => void
    setModalData: (x: Post) => void
}

const PostItem = ({ data, setModalStatus, setModalData }: Props) => {
    const [commentPost, setCommentPost] = useState('')
    const [commentSize, setCommentSize] = useState(false)
    const [postOptionShow, setPostOptionShow] = useState(false)
    

    const commentRef = useRef<HTMLTextAreaElement>(null)
    const { user } = useContext(AuthContext)
    const router = useRouter()

    const client = useQueryClient()

    const focusInput = () => {
        if (commentRef.current != null) {
            commentRef.current.focus()
            commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    const { mutate: addComment } = useMutation(() =>
        api.AddPostComment(user?.id as number, data.id, commentPost), {
        onSuccess: () => { 
            client.invalidateQueries(["posts"])
            client.invalidateQueries(["myPosts"])
            .then(r => {setCommentSize(true), setCommentPost('')}) 
        }
    })
    const handleAddComment = async () => {
        if (commentPost == '') {
            return alert('Digite algo')
        }
        addComment()
    }

    const { mutate: likePost } = useMutation(() =>
        api.LikePost(user?.id as number, data.id), {
        onSuccess: () => { 
            client.invalidateQueries(["posts"]); 
            client.invalidateQueries(["myPosts"]); 
        }
    })

    const { mutate: likeComment } = useMutation((idComment: number) =>
        api.LikeComment(user?.id as number, idComment), {
        onSuccess: () => { 
            client.invalidateQueries(["posts"]);
            client.invalidateQueries(["myPosts"]); 
        }
    })


    const { mutate: deleteComment } = useMutation((idComment: number) =>
        api.DeleteComment(user?.id as number, idComment), {
        onSuccess: () => { 
            client.invalidateQueries(["posts"]);
            client.invalidateQueries(["myPosts"]) 
        }
    })

    const { mutate: deletePost } = useMutation((idPost: number) =>
        api.DeletePost(user?.id as number, idPost), {
        onSuccess: () => { 
            client.invalidateQueries(["posts"]);
            client.invalidateQueries(["myPosts"]) 
        }
    })

    return (
        <div className="bg-white rounded-[1rem] px-5 py-4 mt-5">
            {/*  Header */}
            <div className="flex items-center justify-between">

                <div className="flex items-center">
                    <div className="w-12 h-12 cursor-pointer ">
                        <img onClick={() => router.push(`/${data.User.id}`)} src={data.User.avatar} alt="guy" className="rounded-full" />
                    </div>

                    <div className="ml-3 ">
                        <p onClick={() => router.push(`/${data.User.id}`)} className="cursor-pointer font-bold hover:underline">{upperFirstLetter(data.User.name)}</p>

                        <div className="flex">
                            <p className="text-xs">{dateMoment(data.date)} &#8226;</p>
                            <BiWorld className="ml-1 shrink-0" />
                        </div>
                    </div>
                </div>

                {user?.id == data.User.id &&
                    <>
                        <div onMouseLeave={() => setPostOptionShow(false)} onClick={() => setPostOptionShow(!postOptionShow)} className="w-10 h-10 relative">
                            <Image src={dots} alt="option" className="rounded-full cursor-pointer" />
                            {postOptionShow &&
                                <>
                                    <div className="  absolute top-0 right-10 text-white font-semibold flex-col rounded-xl cursor-pointer">
                                        <div onClick={() => {setModalStatus(true), setModalData(data)}} className=" hover:bg-gray-400 bg-gray-500 p-1 px-3 rounded-t-lg">Editar</div>
                                        <div onClick={() => deletePost(data.id)} className="hover:bg-gray-400 bg-gray-500 p-1 px-3 rounded-b-lg">Excluir</div>

                                    </div>
                                </>
                            }
                        </div>
                    </>
                }
            </div>

            {/* Body */}

            <div className="my-3">
                <p>{data.body}</p>
            </div>

            {/* Image */}
            <div className="-mx-5  ">
                {data?.Image?.url &&
                    <Image className="" src={`${data?.Image?.url}`} width={1000} height={100} alt="car" />
                }
            </div>

            {/* Number of Likes + Buttons */}
            <div className="">

                <div className="flex justify-between text-[#8e8d8d] mt-1">
                    <div className="flex items-center  ">
                        <div className="w-[1.1rem] h-[1.1rem]">
                            <Image src={like} alt="heart" />
                        </div>
                        <div className="ml-[2px] w-5 h-5">
                            <Image src={hearth} alt="heart" />
                        </div>
                        <p className="pl-2 whitespace-nowrap text-[15px] sm:text-[16px]">{data.LikePosts.length} Curtidas</p>
                    </div>
                    {data.Comments.length > 0 &&
                        <p className="whitespace-nowrap text-[15px] sm:text-[16px]">{`${data.Comments.length} Comentários`}</p>
                    }
                    {data.Comments.length < 1 &&
                        <p className="whitespace-nowrap text-[15px] sm:text-[16px]">{`Não há comentários`}</p>
                    }
                </div>

            </div>

            <div className="border-b my-2"></div>

            <div className="flex justify-between mx-1 first:mx-0">
                <div className="flex items-center cursor-pointer rounded-2xl p-1 pr-4   hover:bg-[#f2f3f7] ">
                    <BiLike className="w-6 h-6" />
                    <p onClick={() => likePost()} className="pl-2 text-base c500:text-base">Curtir</p>
                </div>
                <div className="flex items-center cursor-pointer rounded-2xl p-1 px-4 hover:bg-[#f2f3f7]">
                    <FaRegCommentAlt className="w-5 h-5" />
                    <p onClick={() => focusInput()} className="pl-2 text-base c500:text-base">Comentar</p>
                </div>
                <div className="flex items-center cursor-pointer rounded-2xl p-1 px-4 hover:bg-[#f2f3f7]">
                    <Image className="w-6 h-6" src={share} alt="share" />
                    <p onClick={() => alert('Em desenvolvimento')} className="pl-2 text-base c500:text-base">Compartilhar</p>
                </div>
            </div>
            <div className="border-b my-2"></div>

            {/* Comment Section */}

            <div className="flex justify-between text-[#8e8d8d]">
                <p onClick={() => setCommentSize(!commentSize)} className="cursor-pointer">
                    {data.Comments.length > 0 &&
                        <>
                            {commentSize && 'Ocultar Comentários'}
                            {!commentSize && `Ver (${data.Comments.length}) Comentários`}
                        </>
                    }
                </p>

            </div>

            <div className="overflow-y-hidden " style={{ display: commentSize ? 'block' : 'none' }} >

                <div className="">
                    {/* Comments  */}

                    {/* {sortPostById(data.Comments) && sortPostById(data.Comments).slice(0,(commentSize ? 1000 : null) as any).map((i, k) => ( */}
                    {sortPostById(data.Comments) && sortPostById(data.Comments).map((i, k) => (

                        <div key={k} className="py-[5px] flex w-full">
                            <div className={styles.imgg} >
                                <img className=" rounded-full cursor-pointer" src={i.User.avatar} alt="guy" />
                            </div>

                            <div className="flex-col ml-1 overflow relative">

                                <div className="bg-[#f2f3f7] rounded-2xl py-1 pr-2 min-w-[160px]">

                                    <div className={styles.name}>
                                        <p onClick={() => router.push(`/${user?.id}`)} className="ml-2 font-bold truncate cursor-pointer hover:underline">{upperFirstLetter(i.User.name)}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="ml-2">{i.body}</div>
                                        <div className=" w-[1.1rem] h-[1.1rem] z-auto absolute right-2 flex items-center ">
                                            <Image src={like} alt="heart" />
                                            <p className="ml-1">{i.LikeComments.length}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex">
                                    <div onClick={() => likeComment(i.id)} className="flex ml-3">
                                        <p className="mr-2 cursor-pointer font-semibold hover:underline">Curtir</p>
                                    </div>
                                    {user?.id == i.User.id &&
                                        <div onClick={() => deleteComment(i.id)} className="flex ml-1">
                                            <p className="mr-2 cursor-pointer font-semibold hover:underline">Excluir</p>
                                        </div>
                                    }

                                </div>


                            </div>

                        </div>
                    ))}

                </div>


            </div>

            {/* Input Comment */}

            <div className='flex items-center mt-4'>
                <div className=" w-10 h-10 shrink-0">
                    <img className="rounded-full" src={user?.avatar} alt="guy" />
                </div>

                <div className="ml-2 w-full bg-[#f2f3f7] rounded-2xl flex items-center relative">
                    <div className="flex-1">

                        <TextareaAutosize value={commentPost} ref={commentRef} placeholder="Digite um comentário" onChange={(e) => setCommentPost(e.target.value)} className=" rounded-2xl mt-1  outline-0 bg-[#f2f3f7]  p-2 w-full resize-none overflow-hidden" />

                    </div>

                    <div className="mr-4 bg-blue-500 text-white rounded-full hover:opacity-90 ">
                        <button onClick={() => handleAddComment()} className="font-bold px-2 ">Postar</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};



export default PostItem;


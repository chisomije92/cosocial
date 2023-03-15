import { urlString } from "./constants/constants"
import { checkResponseForError } from "./util"


//export const getUsersLinkedToPost = async (token: string, userId: string) => {

//}

export const getUserPosts = async (token: string, userId: string) => {
  try {
    const res = await fetch(`${urlString}/posts/user-posts/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
    })
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }
}

export const getPostsOnTl = async (token: string, userId: string) => {
  try {
    const res = await fetch(`${urlString}/posts/${userId}/timeline`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
    })
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }

}

export const getPostsOnExplore = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/explore`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
    })
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }

}
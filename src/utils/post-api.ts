import { urlString } from "./constants/constants"
import { checkResponseForError, getDataFromLocalStorage, setDataToLocalStorage } from "./util"




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
    //console.log(setDataToLocalStorage())
    //console.log(getDataFromLocalStorage())
    setDataToLocalStorage()
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

export const getSinglePost = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`
      },
    })
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }

}
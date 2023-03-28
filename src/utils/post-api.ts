import { urlString } from "./constants/constants"
import { checkResponseForError } from "./util"




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

export const createPost = async (token: string, data: { image?: File, post: string }) => {
  try {
    const formData = new FormData()
    if (data.image) {
      formData.append("image", data.image)
    }
    formData.append("description", data.post)
    const res = await fetch(`${urlString}/posts`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
      body: formData
    })
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }
}

export const updateUserPost = async (id: string, token: string, data: { image?: File, post: string }) => {
  try {
    const formData = new FormData()
    if (data.image) {
      formData.append("image", data.image)
    }
    formData.append("description", data.post)
    const res = await fetch(`${urlString}/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`,
      },
      body: formData
    })
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }
}

export const deletePost = async (id: string, token: string, data: { image: File, post: string }) => {
  try {
    const res = await fetch(`${urlString}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }
}
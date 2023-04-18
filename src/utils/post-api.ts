import { PostValues } from "../models/post"
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

export const createUserPost = async (token: string, data: PostValues) => {
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

export const updateUserPost = async (id: string, token: string, data: PostValues) => {
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

export const deleteUserPost = async (id: string, token: string) => {
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

export const likePost = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/${id}/like`, {
      method: "PUT",
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

export const bookmarkPost = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/${id}/bookmark`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`
      },
    },
    )
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }
}

export const getBookmarks = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/bookmark`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`
      },
    },
    )
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    console.log(err)
    return err.message
  }
}

export const commentOnPost = async (id: string, comment: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/${id}/reply`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({ comment })
    },
    )
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    console.log(err)
    return err.message
  }
}

export const likeReply = async (id: string, replyId: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/${id}/reply/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({ replyId })
    },
    )
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    console.log(err)
    return err.message
  }
}

export const deleteReply = async (id: string, replyId: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/posts/${id}/reply`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({ replyId })
    },
    )
    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    console.log(err)
    return err.message
  }
}
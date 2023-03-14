import { urlString } from "./constants/constants"
import { checkResponseForError } from "./util"

export const getUserPosts = async (userId: string, token: string) => {
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
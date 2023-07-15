import { ChatType } from "../models/chat"
import { urlString } from "./constants/constants"
import { checkResponseForError } from "./util"

export const getChat = async (token: string, userId: string) => {
  try {
    const res = await fetch(`${urlString}/conversations/${userId}`, {
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

export const chat = async (token: string, data: ChatType) => {
  try {
    const res = await fetch(`${urlString}/conversations`, {
      body: JSON.stringify({
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
      }),
      method: "POST",
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


export const getChatUsers = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/conversations/users`, {
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


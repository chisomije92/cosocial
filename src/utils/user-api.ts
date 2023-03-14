
import CustomError from "../models/custom-error";
import { urlString } from "./constants/constants";
import { checkResponseForError } from "./util";




export const signIn = async (data: { email: string; password: string },
) => {
  try {
    const res = await fetch(`${urlString}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })

    if (!res.ok) {
      const errorMessage = await res.json()
      const errorData = errorMessage.message
      throw new CustomError(errorData, 400);
    }
    const resData: {
      userId: string;
      token: string
    } = await res.json()

    return resData
  } catch (err: any) {

    return err.message
  }


}


export const signUp = async (data: { email: string; password: string; username: string },
) => {
  try {
    const res = await fetch(`${urlString}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        username: data.username
      }),
    })

    const resData = await checkResponseForError(res)

    return resData
  } catch (err: any) {
    return err.message
  }


}

export const updateUser = async (id: string, token: string, data: Partial<{
  description: string;
  email: string;
  username: string;
  image: string
}>) => {
  try {
    const res = await fetch(`${urlString}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify(data),

    },
    )

    const resData = await checkResponseForError(res)

    return resData
  } catch (err: any) {
    return err.message
  }
}

export const updatePassword = async (id: string, token: string, data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await fetch(`${urlString}/users/${id}/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify(data),

    },
    )


    const resData = await checkResponseForError(res)

    return resData
  } catch (err: any) {
    return err.message
  }
}

export const getUser = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}`, {
      method: "GET",
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

export const getAuthUser = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/users/`, {
      method: "GET",
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

export const getFollowers = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}/followers`, {
      method: "GET",
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

export const getFollowing = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}/following`, {
      method: "GET",
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

export const followUser = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}/follow`, {
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

export const unFollowUser = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}/unfollow`, {
      method: "GET",
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

export const getNonFollowing = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/users/notfollowing`, {
      method: "GET",
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

export const getNonFollowers = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/users/nonfollowers`, {
      method: "GET",
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

export const getNotfications = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/users/notifications`, {
      method: "GET",
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

export const deleteUser = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`
      },

    },
    )
    if (!res.ok) {
      const errorMessage = await res.json()
      const errorData = errorMessage.message
      throw new CustomError(errorData, 400);
    }

    const resData = await checkResponseForError(res)

    return resData
  } catch (err: any) {
    return err.message
  }
}


import { LoginValues, RegisterValues } from "../models/authForm";
import CustomError from "../models/custom-error";
import { PasswordValues } from "../models/password";
import { ProfileType } from "../models/profile";
import { urlString } from "./constants/constants";
import { checkResponseForError } from "./util";




export const signIn = async (data: LoginValues,
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


export const signUp = async (data: RegisterValues,
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

export const updateUser = async (id: string, token: string, data: Partial<ProfileType>) => {
  try {
    const formData = new FormData()
    if (data.image) {
      formData.append("image", data.image)
    }
    if (data.description) {
      formData.append("description", data.description)
    }
    if (data.email) {
      formData.append("email", data.email)
    }
    if (data.username) {
      formData.append("username", data.username)
    }
    const res = await fetch(`${urlString}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`
      },
      body: formData,

    },
    )

    const resData = await checkResponseForError(res)
    return resData
  } catch (err: any) {
    return err.message
  }
}

export const updatePassword = async (token: string, data: PasswordValues) => {
  try {
    const res = await fetch(`${urlString}/users/update-password`, {
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

export const followUser = async (token: string, id: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}/follow`, {
      method: "PUT",
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

export const unFollowUser = async (token: string, id: string) => {
  try {
    const res = await fetch(`${urlString}/users/${id}/unfollow`, {
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

export const getNotifications = async (token: string) => {
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

export const readNotification = async (id: string, token: string) => {
  try {
    const res = await fetch(`${urlString}/users/notifications/read/${id}`, {
      method: "PUT",
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

export const readAllNotifications = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/users/notifications/read`, {
      method: "PUT",
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

export const unreadAllNotifications = async (token: string) => {
  try {
    const res = await fetch(`${urlString}/users/notifications/unread`, {
      method: "PUT",
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

export const deleteSingleNotification = async (token: string, id: string) => {
  try {
    const res = await fetch(`${urlString}/users/notifications/${id}`, {
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





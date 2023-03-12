import CustomError from "../models/custom-error";



let url = 'http://localhost:8000/api'




export const signIn = async (data: { email: string; password: string },
) => {
  try {
    const res = await fetch(`${url}/auth/login`, {
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
    const res = await fetch(`${url}/auth/sign-up`, {
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
    if (!res.ok) {
      const errorMessage = await res.json()
      const errorData = errorMessage.message
      throw new CustomError(errorData, 400);
    }

    const resData = await res.json()

    return resData
  } catch (err: any) {
    return err.message
  }


}


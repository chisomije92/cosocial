let url = 'http://localhost:8000/api'


export const signIn = async (data: { email: string; password: string },
  //setLocalStorage : (userData:{userId: string; token: string; expirationTimer: string} | null) => void
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
    if (res.status === 422) {
      throw new Error("Validation failed.");
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Could not authenticate you!");
    }
    const resData = await res.json()
    //const remainingMilliseconds = 60 * 60 * 1000;
    //const expiryDate = new Date(
    //  new Date().getTime() + remainingMilliseconds
    //);
    //setLocalStorage({
    //  userId: resData.userId,
    //  token: resData.token,
    //  expirationTimer: expiryDate.toISOString(),
    //})
    return resData
  } catch (err: any) {
    console.log(err)
  }


}
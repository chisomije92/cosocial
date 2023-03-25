
import CustomError from "../models/custom-error";

export const shuffleArray = (array: any) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const checkResponseForError = async (res: Response) => {
  if (!res.ok) {
    const errorMessage = await res.json()
    const errorData = errorMessage.message
    throw new CustomError(errorData, 400);
  }

  const resData = await res.json()
  return resData
}

export const getDataFromLocalStorage = () => {
  let parsedUser = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    parsedUser = JSON.parse(authUser);
  }
  return parsedUser
}

export const setDataToLocalStorage = () => {
  const parsedUser = getDataFromLocalStorage()
  if (parsedUser) {
    const expirationDuration =
      new Date(parsedUser.expirationTimer).getTime() - new Date().getTime();
    if (expirationDuration < 900000) {
      const dateTimer = addMinutes(parsedUser.expirationTimer, 15);
      const authUser = JSON.stringify({
        ...parsedUser,
        expirationTimer: dateTimer.toISOString()
      })
      localStorage.setItem("authUser", authUser)
    }

  }
}

export const sortData = (arr: any, prop: string) => {
  return arr.sort((a: any, b: any) => {
    return (
      new Date(b[prop]).getTime() -
      new Date(a[prop]).getTime()
    );
  })
}

export const addMinutes = (date: string, minutes: number) => {
  const dateCopy = new Date(date);
  dateCopy.setMinutes(dateCopy.getMinutes() + minutes);

  return dateCopy;
}
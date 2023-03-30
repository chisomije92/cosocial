import openSocket from 'socket.io-client';


export const urlString = 'http://localhost:8000/api'
export const urlImgString = "http://localhost:8000/"
export const socketUrl = "http://localhost:8000/"
export const socket = openSocket(socketUrl);
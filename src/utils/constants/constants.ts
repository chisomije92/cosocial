import openSocket from 'socket.io-client';
import { getDataFromLocalStorage } from '../util';


export const urlString = 'http://localhost:8000/api'
export const urlImgString = "http://localhost:8000/"
export const socketUrl = "http://localhost:8000/"
export const socket = openSocket(socketUrl);

//console.log(`Client socket ID: ${socket.id}`);



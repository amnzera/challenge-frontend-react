import axios from 'axios'
import moment from 'moment'
import CryptoJS from 'crypto-js'

const ts = moment.now()
const apikey = `${process.env.REACT_APP_MARVEL_PUBLIC}`
const privateKey = `${process.env.REACT_APP_MARVEL_PRIVATE}`
const hash = CryptoJS.MD5(ts + privateKey + apikey).toString(CryptoJS.enc.Hex)

export const marvelApi = axios.create({
  baseURL: 'https://gateway.marvel.com',
  params: { apikey, ts, hash }
});

export interface IApiData {
  data: {
    count: number,
    limit: number,
    offset: number,
    results: Array<IHero>
  }
}

export interface IHero {
  id: number,
  name: string,
  description: string,
  thumbnail: {
    extension: string,
     path: string
  }
};

export interface Ithumbnail {
  extension: string,
  path: string,
};

export const charactersList = (value? :any) => {
  if(value){
    return marvelApi.get<IApiData>(`/v1/public/characters?name=${value}`);
  } else {
    return marvelApi.get<IApiData>(`/v1/public/characters`);
  }
} 


export const characterProfile = (id : number) => {
  return marvelApi.get<IApiData>(`/v1/public/characters`);
}
  


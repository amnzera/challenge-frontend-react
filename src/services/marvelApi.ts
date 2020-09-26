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

export interface IProfile {
  id: number,
  title: string,
  description: string,
  pageCount: number,
  dates: {
    date: Date,
    type: string
  },
  thumbnail: {
    extension: string,
    path: string
  },
  prices: [{
    price: number,
    type: string
  }]
}

export interface Ithumbnail {
  extension: string,
  path: string,
};

export const charactersList = (value?: any, pageNumber?: number) => {
  console.log('pageNumber' + pageNumber)
  let uri = value ? `/v1/public/characters?name=${value}&offset=${pageNumber}` : `/v1/public/characters?offset=${pageNumber}`;
  return marvelApi.get<IApiData>(uri);
};



export const heroByID = (heroId?: number) => {
    return marvelApi.get<IApiData>(`/v1/public/characters/${heroId}`);
} 

export const characterProfile = (id : number) => {
  return marvelApi.get(`/v1/public/characters/${id}/comics?&limit=5`);
}

export let myHero: Array<any> = [];

  
export const saveHero = (hero : IHero) => {
  return new Promise((resolve,reject) => {
    resolve(myHero.push(hero))
    reject( 'This not possible record a hero' )
  })
    
}

export const deleteHero = (hero : IHero) => {
  return new Promise((resolve,reject) => {
    resolve( 
      myHero.forEach((response, index) => {
        if (response.id === hero.id){
          delete myHero[index]
        }
      })
    )
    //myHero.push(hero);
  })
}

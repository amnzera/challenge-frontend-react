import React, { useState, useEffect } from 'react';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Search from '../../components/search/search';
import { charactersList, IHero, saveHero } from '../../services/marvelApi';
import HomeStyle from './Home.module.sass';
//import { ToastProvider, useToasts } from 'react-toast-notifications'


const Home = () => {
  // const { addToast } = useToasts()
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const getCharacters = async () => {

    charactersList(searchValue).then(response => {
      setHeroes(response.data.data.results)
    });

  };

  useEffect(() => {
    getCharacters()
  }, [searchValue])


  const handleClick = (value: string) => {
    setHeroes([]);
    setSearchValue(value);
  }

  const handleFavorite = (hero: IHero) => {
    //console.log(hero)
    saveHero(hero);
   // addToast('Saved Successfully', { appearance: 'success' })

  }


  return (
    // <ToastProvider>
      <main className={HomeStyle.home}>
        <Search handleClick={handleClick} />
        <section className={HomeStyle.main}>
          <div className={HomeStyle.flexGrid}>
            {heroes.map(hero => (
              <div className={HomeStyle.col} key={hero.id}>
                <Card handleFavorite={handleFavorite} obj={hero} id={hero.id} name={hero.name} img={hero.thumbnail.path + '.' + hero.thumbnail.extension} description={hero.description} />
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    // </ToastProvider>
  );
};

export default Home;
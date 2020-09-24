import React, { useState, useEffect } from 'react';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Search from '../../components/search/search';
import { charactersList, IHero, saveHero } from '../../services/marvelApi';
import HomeStyle from './Home.module.sass';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {

  const notify = () => {
    console.log('Chamando')
    toast.success("Success Notification !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

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
  
    notify();

  }


  return (
      <main className={HomeStyle.home}>
        <Search handleClick={handleClick} />
        <section className={HomeStyle.main}>
          <div className={HomeStyle.flexGrid}>
            {heroes.map(hero => (
              <div className={HomeStyle.col} key={hero.id}>
                <Card handleFavorite={notify} obj={hero} id={hero.id} name={hero.name} img={hero.thumbnail.path + '.' + hero.thumbnail.extension} description={hero.description} />
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </main>
  );
};

export default Home;
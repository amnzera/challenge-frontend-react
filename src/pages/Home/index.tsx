import React, { useState, useEffect } from 'react';
import Card from '../../components/card/card';
import Search from '../../components/search/search';
import { charactersList, IHero } from '../../services/marvelApi';
import HomeStyle from './Home.module.sass';

const Home = () => {

  const [ heroes, setHeroes ] = useState<IHero[]>([]);
  const [ searchValue, setSearchValue ] = useState<string>('');

  const getCharacters = async () => {

    charactersList(searchValue).then(response => {
      setHeroes(response.data.data.results)
    });

  };

  useEffect(() => {
    getCharacters()
  }, [searchValue])


  const handleClick = (value : string) => {
     setHeroes([]);
     setSearchValue(value);
  }

  const handleFavorite = (id : number) => {
     console.log(id)
  }


  return (
    <main className={HomeStyle.home}>
      <Search  handleClick={handleClick}/>
        <section className={HomeStyle.main}>
          <div className={HomeStyle.flexGrid}>
            {heroes.map(hero => (
              <div className={HomeStyle.col} key={hero.id}>
                <Card handleFavorite={handleFavorite} id={hero.id} name={hero.name} img={hero.thumbnail.path + '.' + hero.thumbnail.extension} description={hero.description} />
              </div>
            ))}
          </div>
        </section>
    </main>
  );
};

export default Home;
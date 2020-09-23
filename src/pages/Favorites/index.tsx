import React, { useEffect } from 'react';
import Background from '../../components/background/background';
import Card from '../../components/card/card';
import FavoriteStyle from './Favorite.module.sass';
import { IHero, myHero } from '../../services/marvelApi';
import Footer from '../../components/footer/footer';

const Favorites: React.FC = () => {


  useEffect(() => {

  }, [])

  const removeFavorite = (hero: IHero) => {
    //console.log(hero)
    //saveHero(hero);
  }

  return (
    <main>
      <Background />
        <section className={FavoriteStyle.main}>
          <div className={FavoriteStyle.title}>Here is your own strike team choice</div>
            <section className={FavoriteStyle.cardSection}>
              {myHero.map(hero => (
                <div className={FavoriteStyle.col} key={hero.id}>
                  <Card removeFavorite={removeFavorite} obj={hero} id={hero.id} name={hero.name} img={hero.thumbnail.path + '.' + hero.thumbnail.extension} description={hero.description} />
                </div>
              ))}
            </section>
        </section>
      <Footer />
    </main>
  );
};

export default Favorites;
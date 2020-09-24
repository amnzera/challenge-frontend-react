import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Search from '../../components/search/search';
import { charactersList, IHero, saveHero } from '../../services/marvelApi';
import HomeStyle from './Home.module.sass';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Home = () => {

  const notify = () => {
    toast.success("Hero successfully added!", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageNumber, setPage] = useState(20);
  const [loading, setLoading] = useState(false);

  const getCharacters = async () => {
    setLoading(true);
    charactersList(searchValue, pageNumber)
      .then((response) => {
        setHeroes([...heroes, ...response.data.data.results])
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCharacters()
  }, [searchValue])


  const handleClick = (value: string) => {
    setHeroes([]);
    setSearchValue(value);
  }

  const handleFavorite = (hero: IHero) => {
    saveHero(hero);
    notify();
  }
  
  const observer = useRef<any>(null);
  const lastHeroElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage(pageNumber + 20);
          getCharacters()
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, pageNumber]
  );

  return (
    <main className={HomeStyle.home}>
      <Search handleClick={handleClick} />
      <section className={HomeStyle.main}>
        <div className={HomeStyle.flexGrid}>

          {heroes.map((hero, index) => {

            if (heroes.length === index + 1) {

              return (
                <div className={HomeStyle.col} key={hero.id} ref={lastHeroElementRef}>
                  <Card handleFavorite={handleFavorite} obj={hero} id={hero.id} name={hero.name} img={hero.thumbnail.path + '.' + hero.thumbnail.extension} description={hero.description} />
                </div>
              )
            } else {
              return (
                <div className={HomeStyle.col} key={hero.id}>
                  <Card handleFavorite={handleFavorite} obj={hero} id={hero.id} name={hero.name} img={hero.thumbnail.path + '.' + hero.thumbnail.extension} description={hero.description} />
                </div>
              )
            }

          })}

        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Home;
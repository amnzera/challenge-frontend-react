import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Search from '../../components/search/search';
import { charactersList, IHero, saveHero } from '../../services/marvelApi';
import HomeStyle from './Home.module.sass';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroller';


let page = 0;
const Home = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageNumber, setPage] = useState(20);

  useEffect(() => {
    page = 0;
  }, [searchValue])

  const notify = (err?: string) => {
    if(err) {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      toast.success("Hero successfully added!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const getCharacters = async () => {
    charactersList(searchValue, page)
      .then((response) => {
        setHeroes([...heroes, ...response.data.data.results])
      })
  };

  const handleClick = (value: string) => {
    setHeroes([]);
    setSearchValue(value);
  }

  const handleFavorite = (hero: IHero) => {
    saveHero(hero)
      .then(resp => notify())
      .catch(err => notify(err));

    
  }

  const loadFunc = (e: any) => {
    getCharacters()
    page = page + 20;
  }

  return (
    <main className={HomeStyle.home}>
      <Search handleClick={handleClick} />
      <section className={HomeStyle.main}>
        <div className={HomeStyle.flexGrid}>

          {heroes.map((hero) => {
            return (
              <div className={HomeStyle.col} key={hero.id}>
                <Card handleFavorite={handleFavorite} obj={hero} id={hero.id} name={hero.name} img={hero.thumbnail.path + '.' + hero.thumbnail.extension} description={hero.description} />
              </div>
            )

          })}
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}>
          </InfiniteScroll>


        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Home;
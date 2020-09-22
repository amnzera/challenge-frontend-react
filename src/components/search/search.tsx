import React, { useState } from 'react';
import SearchStyle from './Search.module.sass';
import lupa from '../../assets/icons/lupa.svg'
import Background from '../background/background';


function Search(props: any) {

  const [searchValue, setSearch] = useState<string>('');

  return (
    <Background>
      <div className={SearchStyle.banner}>
        <div className={SearchStyle.bannerDescription}>Explore the most powerful characters in Marvel</div>
        <div style={{ display: "flex" }}>
          <input onChange={(e) => setSearch(e.target.value)} className={SearchStyle.fieldSearch} placeholder="Type in a characher name"></input>
          <button type='button' onClick={() => props.handleClick(searchValue)} className={SearchStyle.btnSearch} ><img alt="stack overflow" src={lupa}></img></button>
        </div>
      </div>
    </Background>

  );
}




export default Search;

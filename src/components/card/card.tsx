import React from 'react';
import CardStyle from './Card.module.sass';
import peopleAdd from '../../assets/icons/peopleAdd.svg' 
import { Link } from 'react-router-dom';

function Card(props: any) {

  return (
      <section className={CardStyle.main}>
        <Link to={`/profile/${props.id}`} style={{textDecoration: "none"}}>
        <img className={CardStyle.img} src={props.img} alt="Hero" ></img>
          <button onClick={ () => props.handleFavorite(props.id) } className={CardStyle.addHero}> <img src={peopleAdd}></img> </button>
        <div className={CardStyle.Carddescription}>
          <span className={CardStyle.nameHero}>
            {props.name.substr(0,12)}
          </span><br/>
          <span className={CardStyle.description}>
              {props.description.substr(0,180)}
          </span>
        </div>
        </Link>
      </section>
  );
}

export default Card;

import React from 'react';
import CardStyle from './Card.module.sass';
import peopleAdd from '../../assets/icons/peopleAdd.svg'
import { Link } from 'react-router-dom';
import { IHero } from '../../services/marvelApi';

interface ICard {
  id: number,
  img: string,
  name: string,
  description: string,
  obj: IHero,
  handleFavorite: Function,
  favorited?: boolean
}

const Card : React.FC<ICard> = ( { id , img , name , description , obj , handleFavorite , favorited } ) => {

  return (
    <section className={ `${CardStyle.main} ${favorited ? CardStyle.favorited : '' }`  }>
      <Link to={`/profile/${id}`} style={{ textDecoration: "none" , height: '198px' }}>
        <img className={CardStyle.img} src={img} alt="Hero" ></img>
      </Link>

      <button type="button" onClick={() => handleFavorite(obj)} className={CardStyle.addHero}> <img src={peopleAdd}></img> </button>
      
      <Link to={`/profile/${id}`} style={{ textDecoration: "none" }}>
      <div className={CardStyle.Carddescription}>
        <span className={CardStyle.nameHero}>
          {name.substr(0, 12)}
        </span><br />
        <span className={CardStyle.description}>
          {description.substr(0, 180)}
        </span>
      </div>
      </Link>

    </section>
  );
}

export default Card;

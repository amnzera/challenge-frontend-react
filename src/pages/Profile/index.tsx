import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Background from '../../components/background/background';
import Footer from '../../components/footer/footer';
import { characterProfile, IHero, IProfile } from '../../services/marvelApi';
import ProfileStyle from './Profile.module.sass';




const Profile: React.FC = (props: any) => {

  const [heroProfile, setProfile] = useState<IProfile[]>([]);

  //const { id } = useParams();
  useEffect(() => {
    console.log('GO')
    //console.log(id)
    getProfile(props.match.params.id)
  }, [])


  const getProfile = async (id: any) => {
    characterProfile(id).then(response => {
      setProfile(response.data.data.results)
    });

  };

  return (
    <>
      <Background>
        <main className={ProfileStyle.main}>
          <div className={ProfileStyle.title}>Discover all comics this character took part in</div>
          <section className={ProfileStyle.cardSection}>
            <div className={ProfileStyle.cardLarge}>
              {/* {heroProfile.map(hero => (
                <div key={hero.id}>
                  <img></img>
                  <div>
                    {hero.description}
                  </div>
                </div>
              ))} */}
              <div>

              </div>
            </div>
          </section>
        </main>
      </Background>
      <main className={ProfileStyle.background}>

        <div className={ProfileStyle.titleContainer}>
          Comics
      </div>
        <section className={ProfileStyle.containerCard}>
          {heroProfile.map(hero => (
            <div className={ProfileStyle.cardLarge}>
              <img className={ProfileStyle.CL__img} src={hero.thumbnail.path + '.' + hero.thumbnail.extension}></img>
              <div className={ProfileStyle.CL__section}>
                <div className={ProfileStyle.CL__title}>
                  {hero.title}
                </div>
                <div key={hero.id} className={ ` ${hero.description ? ProfileStyle.CL__description : 'CL__centerEmpty' }`}>
                  {hero.description ? hero.description.substr(0, 200) + '...' : 'No informations'}
                </div>
              </div>
            </div>
          ))}

        </section>
      </main>

      <Footer />
    </>

  );
};

export default Profile;
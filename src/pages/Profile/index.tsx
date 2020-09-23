import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Background from '../../components/background/background';
import Footer from '../../components/footer/footer';
import { characterProfile, IHero } from '../../services/marvelApi';
import ProfileStyle from './Profile.module.sass';

const Profile: React.FC = (props: any) => {

  const [heroProfile, setProfile] = useState<IHero[]>([]);

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
            <img></img>
            <div>
              
            </div>
          </div>
        </section>
      </main>
    </Background>

      <div className={ProfileStyle.cardLarge}>
        {heroProfile.map(hero => (
          <div key={hero.id}>
            {hero.name}
          </div>
        ))}
      </div>
      <Footer />
      </>

  );
};

export default Profile;
import React, { useEffect, useState } from 'react';
import Background from '../../components/background/background';
import { characterProfile } from '../../services/marvelApi';
import ProfileStyle from './Profile.module.sass';

const Profile: React.FC = (props: any) => {

  // const [ heroes, setHeroes ] = useState<IHero[]>([]);

  useEffect(() => {
    console.log(props.match.params.id)
  }, [])


  const getProfile = async () => {

    characterProfile(0).then(response => {
      // setProfile(response.data.data.results)
    });

  };

  return (
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
  );
};

export default Profile;
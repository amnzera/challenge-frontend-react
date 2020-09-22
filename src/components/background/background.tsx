import React, { useState } from 'react';
import BackgroundStyle from './Background.module.sass';

function Background(props : any) {
  
    return (
      <section className={BackgroundStyle.paralax}>
        { props.children }
      </section>
    );
  }

export default Background;

import React from 'react';
import footer from "./Footer.module.sass";

function Footer() {
  return (
    <footer className={footer.main}>
      <p>Data provided by Marvel. © 2020 MARVEL</p>
      <p>Developed by Alexandre Nunes</p>
    </footer>
  );
}

export default Footer;

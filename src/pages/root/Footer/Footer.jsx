import styles from "./Footer.module.scss";
import pureLogo from "/pure-logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className={styles.logoContainer}>
        <div>
          <div className={styles.logos}>
            <img src={pureLogo} alt="pureLogo" />
            <div className={styles.companyName}>pure code</div>
          </div>
          <div className={styles.companyMotto}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </div>
        </div>
        <div className={styles.socials}>
          <a href="">
            <img src="./facebook.png" alt="facebook" />
          </a>
          <a href="">
            <img src="./twitter.png" alt="twitter" />
          </a>
          <a href="">
            <img src="./linkedin.png" alt="linkedin" />
          </a>
          <a href="">
            <img src="./instagram.png" alt="instagram" />
          </a>
        </div>
      </div>
      <div className={styles.listContainer}>
        <ul>
          <div>Kurumsal</div>
          <li>
            <a href="">Hakkımızda</a>
          </li>
          <li>
            <a href="">Takım</a>
          </li>
          <li>
            <a href="">İletişim</a>
          </li>
        </ul>
        <ul>
          <div>Hizmetlerimiz</div>
          <li>
            <a href="">Ürünler</a>
          </li>
          <li>
            <a href="">Fiyatlandırma</a>
          </li>
        </ul>
        <ul>
          <div>Yasal Metinler</div>
          <li>
            <a href="">Gizlilik Politikası</a>
          </li>
          <li>
            <a href="">Kullanım Şartları</a>
          </li>
        </ul>

        <ul>
          <div>Ekler</div>
          <li>
            <a href="">SSS</a>
          </li>
          <li>
            <a href="">Destek</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;

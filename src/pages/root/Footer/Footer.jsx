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
          <div>Corporate</div>
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">Team</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
        <ul>
          <div>Services</div>
          <li>
            <a href="">Products</a>
          </li>
          <li>
            <a href="">Pricing</a>
          </li>
        </ul>
        <ul>
          <div>Legal</div>
          <li>
            <a href="">Privacy Policy</a>
          </li>
          <li>
            <a href="">Terms of Use</a>
          </li>
        </ul>

        <ul>
          <div>Attachments</div>
          <li>
            <a href="">FAQs</a>
          </li>
          <li>
            <a href="">Support</a>
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

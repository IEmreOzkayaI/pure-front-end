import pureLogo from "/pure-logo.svg";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <span className={styles.firstChild}>
          <li>
            <img src={pureLogo} alt="logo" />
          </li>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">Pricing</a>
          </li>
        </span>
        <span className={styles.lastChild}>
          <li>
            <div>Log In</div>
            <div className={styles.dropdownContent}>
              <a className={styles.dropdownItem1} href="/companyLogin">
                Company Account
              </a>
              <a className={styles.dropdownItem2} href="/personalLogin">
                Personal Account
              </a>
            </div>
          </li>
          <li>
            <a href="">Sign Up</a>
          </li>
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;

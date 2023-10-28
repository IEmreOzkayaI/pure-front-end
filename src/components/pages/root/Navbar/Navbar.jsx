import pureLogo from "/pure-logo.svg";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <span className={styles.firstChild}>
          <li>
            <img src={pureLogo} alt="logo" />
          </li>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about-us"}>About Us</Link>
          </li>
          <li>
            <Link to={"/pricing"}>Pricing</Link>
          </li>
        </span>
        <span className={styles.lastChild}>
          <li>
            <div>Log In</div>
            <div className={styles.dropdownContent}>
              <Link className={styles.dropdownItem1} to={"/login"}>
                Company Account
              </Link>
              <Link className={styles.dropdownItem2} to={"/login"}>
                Personal Account
              </Link>
            </div>
          </li>
          <li>
            <Link to={"/signup"}>Sign Up</Link>
          </li>
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;

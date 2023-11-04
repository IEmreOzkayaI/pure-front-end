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
            <div id={styles.login}>Log In</div>
            <div className={styles.dropdownContentLogin}>
              <Link className={styles.dropdownItem1} to={"/login?user=company"}>
                <img src="./building.png" alt="company" /> Companies
              </Link>
              <Link className={styles.dropdownItem2} to={"/login?user=user"}>
                <img src="./person.png" alt="person" /> Users
              </Link>
            </div>
          </li>
          <li>
            <div id={styles.signUp}>Sign Up</div>
            <div className={styles.dropdownContentSignUp}>
              <Link
                className={styles.dropdownItem1}
                to={"/signup?user=company"}
              >
                <img src="./building.png" alt="company" /> Companies
              </Link>
              <Link className={styles.dropdownItem2} to={"/signup?user=user"}>
                <img src="./person.png" alt="person" /> Users
              </Link>
            </div>
          </li>
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;

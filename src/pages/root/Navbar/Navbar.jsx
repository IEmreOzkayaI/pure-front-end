import pureLogo from "/pure-logo.svg";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FullScreenNavbar from "./FullScreenNavbar";
import { useDispatch, useSelector } from "react-redux";
import { logOutFetch } from "../../../redux/toolkit/logOutSlice.js";
import Button from '../../../components/shared/Button/Button';
import CustomModal from "../../../components/CustomModal.jsx";
import AddInterview from "../../../components/addInterview/index.jsx";

const Navbar = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [fullNav, setFullNav] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("page refreshed this is user ", userInfo);
  useEffect(() => {
    if (userInfo !== null) setUser(userInfo);
  }, [userInfo]);

  const handleLogOut = () => {
    dispatch(logOutFetch());
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        {!user && (
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
        )}
        {user && (
          <span className={styles.firstChild}>
            <li>
              <img src={pureLogo} alt="logo" />
            </li>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/interview/playground"} target="_blank">
                Interview
              </Link>
            </li>
          </span>
        )}
        {user && (
          <>
            <Button
              className={["dark"]}
              style={{ alignSelf: "center" ,marginLeft: "auto",marginRight: "5rem"}}
              onClick={() => setIsModalOpen(true)}
            >
              Add Interview
            </Button>
            <CustomModal
              width={"100%"}
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
            >
              <div>
                <AddInterview setIsModalOpen={setIsModalOpen} />
              </div>
            </CustomModal>
          </>
        )}
        <span className={styles.lastChild}>
          {user && (
            <>
              <div className={styles.userName}>
                {user.name} {user.surname}
              </div>
              <div className={styles.avatarDark}>
                <img src="./avatar.png" alt="avatar" />
              </div>
              <div className={styles.dropdownContentLoggedIn}>
                <div>
                  <div className={styles.imgContainer}>
                    {user.role === "Individual_User" && (
                      <img src="./avatar.png" alt="" />
                    )}
                    {user.role === "Company_User" && (
                      <img src="./building.png" alt="" />
                    )}
                  </div>
                  <div>
                    {user.name} {user.surname}
                  </div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                  >
                    <path
                      d="M0 5.5H11.5M11.5 5.5L6.9 1M11.5 5.5L6.9 10"
                      stroke="#6C7B9F"
                    />
                  </svg>
                  <Link to={"/profile"}>See Profile</Link>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                  >
                    <path
                      d="M6.5 1H1V12H6.5M5 6H12.5M12.5 6L9.5 3M12.5 6L9.5 9"
                      stroke="#CD6E60"
                    />
                  </svg>
                  <Link onClick={() => handleLogOut()}>Log Out</Link>
                </div>
              </div>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link className={styles.login} to={"/login"}>
                  Log In
                </Link>
              </li>
              <li>
                <div id={styles.signUp}>Sign Up</div>
                <div className={styles.dropdownContentSignUp}>
                  <Link
                    className={styles.dropdownItem1}
                    to={"/signUp"}
                    state={{ type: "company" }}
                    onClick={() => localStorage.setItem("user_type", "company")}
                  >
                    <img src="./building.png" alt="company" /> Companies
                  </Link>
                  <Link
                    className={styles.dropdownItem2}
                    to={"/signUp"}
                    state={{ type: "user" }}
                    onClick={() => localStorage.setItem("user_type", "user")}
                  >
                    <img src="./person.png" alt="person" /> Users
                  </Link>
                </div>
              </li>
            </>
          )}
        </span>
      </ul>
      <div className={styles.hamburger} onClick={() => setFullNav(!fullNav)}>
        <svg viewBox="0 0 100 80" width="40" height="40" fill="#fff">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </div>
      {fullNav && <FullScreenNavbar setFullNav={setFullNav} />}
    </nav>
  );
};

export default Navbar;

import styles from "./Welcome.module.scss";
import Navbar from "../Navbar/Navbar";
import TrustedBy from "../TrustedBy/TrustedBy";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <Navbar />
      <TrustedBy />
    </div>
  );
};

export default Welcome;

import styles from "./Welcome.module.scss";
import Navbar from "../Navbar/Navbar";
import TrustedBy from "../TrustedBy/TrustedBy";
import InfoText from "../InfoText/InfoText";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <Navbar />
      <InfoText />
      <TrustedBy />
    </div>
  );
};

export default Welcome;

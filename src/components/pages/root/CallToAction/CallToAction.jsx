import { Link } from "react-router-dom";
import styles from "./CallToAction.module.scss";
// import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  // TODO 2: Uncomment the code when routing added
  // const navigate = useNavigate();
  // const handleClick = (route) => navigate(route);

  return (
    <section className={styles.ctaContainer}>
      <div className={styles.companyService}>
        <div>COMPANY SERVICE</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quidem
          voluptates. Quisquam, voluptatum. Quisquam, voluptatum.
        </p>
        <div className={styles.buttonContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            // onClick={handleClick}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.95471 6.10005C2.00986 6.04475 2.07538 6.00088 2.14752 5.97095C2.21965 5.94102 2.29699 5.92561 2.37508 5.92561C2.45318 5.92561 2.53051 5.94102 2.60265 5.97095C2.67478 6.00088 2.74031 6.04475 2.79546 6.10005L9.50008 12.8059L16.2047 6.10005C16.3162 5.98856 16.4674 5.92592 16.6251 5.92592C16.7828 5.92592 16.934 5.98856 17.0455 6.10005C17.1569 6.21154 17.2196 6.36275 17.2196 6.52042C17.2196 6.67809 17.1569 6.82931 17.0455 6.9408L9.92046 14.0658C9.86531 14.1211 9.79978 14.165 9.72765 14.1949C9.65551 14.2248 9.57818 14.2402 9.50008 14.2402C9.42199 14.2402 9.34466 14.2248 9.27252 14.1949C9.20039 14.165 9.13486 14.1211 9.07971 14.0658L1.95471 6.9408C1.89942 6.88564 1.85555 6.82012 1.82561 6.74799C1.79568 6.67585 1.78027 6.59852 1.78027 6.52042C1.78027 6.44232 1.79568 6.36499 1.82561 6.29286C1.85555 6.22072 1.89942 6.1552 1.95471 6.10005Z"
              fill="#F5F3F3"
            />
          </svg>

          <Link to="/pricing">More</Link>
        </div>
        <div className={styles.rightArrow}>
          <svg
            //TODO
            // onClick={()=>handleClick("/companyLogin")}
            xmlns="http://www.w3.org/2000/svg"
            width="104"
            height="82"
            viewBox="0 0 104 82"
            fill="none"
          >
            <rect
              x="0.883301"
              y="0.408203"
              width="102.491"
              height="80.7057"
              rx="6.93177"
              fill="#6C7B9F"
            />
            <path
              d="M76.4137 43.9142C77.1948 43.1332 77.1948 41.8668 76.4137 41.0858L63.6858 28.3579C62.9048 27.5768 61.6384 27.5768 60.8574 28.3579C60.0763 29.1389 60.0763 30.4052 60.8574 31.1863L72.1711 42.5L60.8574 53.8137C60.0763 54.5948 60.0763 55.8611 60.8574 56.6421C61.6384 57.4232 62.9048 57.4232 63.6858 56.6421L76.4137 43.9142ZM23.4995 20.5V32.5H27.4995V20.5H23.4995ZM35.4995 44.5H74.9995V40.5H35.4995V44.5ZM23.4995 32.5C23.4995 39.1274 28.8721 44.5 35.4995 44.5V40.5C31.0812 40.5 27.4995 36.9183 27.4995 32.5H23.4995Z"
              fill="#F5F3F3"
            />
          </svg>
        </div>
      </div>
      <div className={styles.userService}>
        <div>USER SERVICE</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quidem
          voluptates. Quisquam, voluptatum. Quisquam, voluptatum.
        </p>
        <div className={styles.buttonContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"

            //TODO
            // onClick={handleClick}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.95471 6.10005C2.00986 6.04475 2.07538 6.00088 2.14752 5.97095C2.21965 5.94102 2.29699 5.92561 2.37508 5.92561C2.45318 5.92561 2.53051 5.94102 2.60265 5.97095C2.67478 6.00088 2.74031 6.04475 2.79546 6.10005L9.50008 12.8059L16.2047 6.10005C16.3162 5.98856 16.4674 5.92592 16.6251 5.92592C16.7828 5.92592 16.934 5.98856 17.0455 6.10005C17.1569 6.21154 17.2196 6.36275 17.2196 6.52042C17.2196 6.67809 17.1569 6.82931 17.0455 6.9408L9.92046 14.0658C9.86531 14.1211 9.79978 14.165 9.72765 14.1949C9.65551 14.2248 9.57818 14.2402 9.50008 14.2402C9.42199 14.2402 9.34466 14.2248 9.27252 14.1949C9.20039 14.165 9.13486 14.1211 9.07971 14.0658L1.95471 6.9408C1.89942 6.88564 1.85555 6.82012 1.82561 6.74799C1.79568 6.67585 1.78027 6.59852 1.78027 6.52042C1.78027 6.44232 1.79568 6.36499 1.82561 6.29286C1.85555 6.22072 1.89942 6.1552 1.95471 6.10005Z"
              fill="#F5F3F3"
            />
          </svg>
          <a href="/pricing"> More</a>
        </div>
        <div className={styles.rightArrow}>
          <svg
            //TODO
            // onClick={()=>handleClick("/personalLogin")}
            xmlns="http://www.w3.org/2000/svg"
            width="104"
            height="82"
            viewBox="0 0 104 82"
            fill="none"
          >
            <rect
              x="0.883301"
              y="0.408203"
              width="102.491"
              height="80.7057"
              rx="6.93177"
              fill="#6C7B9F"
            />
            <path
              d="M76.4137 43.9142C77.1948 43.1332 77.1948 41.8668 76.4137 41.0858L63.6858 28.3579C62.9048 27.5768 61.6384 27.5768 60.8574 28.3579C60.0763 29.1389 60.0763 30.4052 60.8574 31.1863L72.1711 42.5L60.8574 53.8137C60.0763 54.5948 60.0763 55.8611 60.8574 56.6421C61.6384 57.4232 62.9048 57.4232 63.6858 56.6421L76.4137 43.9142ZM23.4995 20.5V32.5H27.4995V20.5H23.4995ZM35.4995 44.5H74.9995V40.5H35.4995V44.5ZM23.4995 32.5C23.4995 39.1274 28.8721 44.5 35.4995 44.5V40.5C31.0812 40.5 27.4995 36.9183 27.4995 32.5H23.4995Z"
              fill="#F5F3F3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;

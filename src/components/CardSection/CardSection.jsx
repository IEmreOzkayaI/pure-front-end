import styles from "./CardSection.module.scss";
import { useState } from "react";

const CardSection = () => {
  const [isFirstCard, setIsFirstCard] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.grayBackground}>
        <div>toc.</div>
      </div>
      <div className={styles.cards}>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className={styles.content}>
          <div className={styles.title}>content #1</div>
          <p className={styles.explanation}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliquat enim ad
            minim veniam.
          </p>
        </div>
        <div className={styles.details}>
          <div>interactive detail #1 :</div>
          <div>interactive detail #2 :</div>
        </div>
        <div className={styles.pageIndex}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="111"
            height="6"
            viewBox="0 0 111 6"
            fill="none"
          >
            <rect width="29" height="6" rx="3" fill="#16161B" />
            <rect
              x="41"
              width="29"
              height="6"
              rx="3"
              fill="#6F7B9F"
              fillOpacity="0.2"
            />
            <rect
              x="82"
              width="29"
              height="6"
              rx="3"
              fill="#6F7B9F"
              fillOpacity="0.2"
            />
          </svg>
        </div>
        <div className={styles.nextBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
          >
            <g filter="url(#filter0_d_146_1122)">
              <circle cx="27" cy="23" r="23" fill="#F5F3F3" />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.0582 31.4674C22.993 31.4027 22.9412 31.3259 22.9059 31.2414C22.8707 31.1568 22.8525 31.0662 22.8525 30.9746C22.8525 30.8831 22.8707 30.7924 22.9059 30.7079C22.9412 30.6233 22.993 30.5465 23.0582 30.4818L30.9646 22.6225L23.0582 14.7632C22.9267 14.6325 22.8528 14.4552 22.8528 14.2704C22.8528 14.0856 22.9267 13.9083 23.0582 13.7776C23.1896 13.6469 23.3679 13.5735 23.5538 13.5735C23.7397 13.5735 23.918 13.6469 24.0494 13.7776L32.4501 22.1297C32.5153 22.1944 32.567 22.2712 32.6023 22.3558C32.6376 22.4403 32.6558 22.531 32.6558 22.6225C32.6558 22.7141 32.6376 22.8047 32.6023 22.8893C32.567 22.9738 32.5153 23.0506 32.4501 23.1153L24.0494 31.4674C23.9844 31.5322 23.9071 31.5836 23.8221 31.6187C23.737 31.6538 23.6459 31.6719 23.5538 31.6719C23.4617 31.6719 23.3705 31.6538 23.2855 31.6187C23.2004 31.5836 23.1232 31.5322 23.0582 31.4674Z"
              fill="#16161B"
            />
            <defs>
              <filter
                id="filter0_d_146_1122"
                x="0"
                y="0"
                width="54"
                height="54"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.435294 0 0 0 0 0.482353 0 0 0 0 0.623529 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_146_1122"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_146_1122"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        {isFirstCard && (
          <div className={styles.prevBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
            >
              <g filter="url(#filter0_d_146_1122)">
                <circle cx="27" cy="23" r="23" fill="#F5F3F3" />
              </g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.0582 31.4674C22.993 31.4027 22.9412 31.3259 22.9059 31.2414C22.8707 31.1568 22.8525 31.0662 22.8525 30.9746C22.8525 30.8831 22.8707 30.7924 22.9059 30.7079C22.9412 30.6233 22.993 30.5465 23.0582 30.4818L30.9646 22.6225L23.0582 14.7632C22.9267 14.6325 22.8528 14.4552 22.8528 14.2704C22.8528 14.0856 22.9267 13.9083 23.0582 13.7776C23.1896 13.6469 23.3679 13.5735 23.5538 13.5735C23.7397 13.5735 23.918 13.6469 24.0494 13.7776L32.4501 22.1297C32.5153 22.1944 32.567 22.2712 32.6023 22.3558C32.6376 22.4403 32.6558 22.531 32.6558 22.6225C32.6558 22.7141 32.6376 22.8047 32.6023 22.8893C32.567 22.9738 32.5153 23.0506 32.4501 23.1153L24.0494 31.4674C23.9844 31.5322 23.9071 31.5836 23.8221 31.6187C23.737 31.6538 23.6459 31.6719 23.5538 31.6719C23.4617 31.6719 23.3705 31.6538 23.2855 31.6187C23.2004 31.5836 23.1232 31.5322 23.0582 31.4674Z"
                fill="#16161B"
              />
              <defs>
                <filter
                  id="filter0_d_146_1122"
                  x="0"
                  y="0"
                  width="54"
                  height="54"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.435294 0 0 0 0 0.482353 0 0 0 0 0.623529 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_146_1122"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_146_1122"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSection;

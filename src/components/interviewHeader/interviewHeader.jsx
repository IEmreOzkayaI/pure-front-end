import React, {useEffect} from 'react';
import styles from './interviewHeader.module.scss';
import {useDispatch, useSelector} from "react-redux";
import useCountdown from "../../hooks/useCountdown.jsx";
import {setInterviewStatus} from "../../redux/toolkit/interviewManagementSlice.js";


const InterviewHeader = () => {
    const dispatch = useDispatch();
    const remainingTime = useSelector((state) => state.interviewManagement.remainingTime);
    const displayTime = useCountdown(remainingTime);
    dispatch(setInterviewStatus(displayTime === '00:00' ? 'finished' : 'inProgress'));

    return (
        <header className={styles.interview__container__header}>
            <div className={styles.interview__container__header__title}>
                <div className={styles.interview__container__header__title__icon}>
                    <svg
                        width="29"
                        height="20"
                        viewBox="0 0 29 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.9623 2L2 8.85714L13.3208 18L15.6792 2L27 8.85714L18.0377 15.2571"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </svg>

                </div>
                <div className={styles.interview__container__header__title__text}>
                    Kodlama
                </div>
            </div>

            <div className={styles.interview__container__header__theme__dark}>
                dark
            </div>
            <div className={styles.interview__container__header__theme__light}>
                light
            </div>
            <select className={styles.interview__container__header__language}>
                <option value="Language">Language</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
            </select>

            {/*<div className={styles.interview__container__header__closeBtn}>*/}
            {/*    <svg*/}
            {/*        width="18"*/}
            {/*        height="18"*/}
            {/*        viewBox="0 0 18 18"*/}
            {/*        fill="none"*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*    >*/}
            {/*        <path d="M1 1L17 17M17 1L1 17" stroke="white" strokeWidth="2"/>*/}
            {/*    </svg>*/}
            {/*</div>*/}
            <div className={styles.interview__container__header__clock}>
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="19" viewBox="0 0 33 19" fill="none">
                    <circle cx="23.2744" cy="9.5" r="9" stroke="white"/>
                    <rect x="13" y="4" width="5" height="12" fill="#16161B"/>
                    <line x1="5.79492" y1="5.48438" x2="14.8199" y2="5.48438" stroke="white"/>
                    <line y1="9.28516" x2="14.82" y2="9.28516" stroke="white"/>
                    <line x1="7.21973" y1="13.0859" x2="14.8197" y2="13.0859" stroke="white"/>
                    <line x1="23.7754" y1="3.61133" x2="23.7754" y2="9.59633" stroke="white"/>
                    <line x1="23.5944" y1="9.21152" x2="27.3107" y2="12.3071" stroke="white"/>
                </svg>
                <div className={styles.interview__container__header__clock__box}>
                    {displayTime}
                </div>
            </div>

        </header>
    );
};

export default InterviewHeader;
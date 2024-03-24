import React, {useEffect} from 'react';
import styles from './interviewHeader.module.scss';
import {useDispatch, useSelector} from "react-redux";
import useCountdown from "../../hooks/useCountdown.jsx";
import {setCurrentQuestion, setInterviewStatus} from "../../redux/toolkit/interviewManagementSlice.js";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {  Modal } from "antd";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;



const InterviewHeader = () => {
    const dispatch = useDispatch();
    const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);
    const remainingTime = useSelector((state) => state.interviewManagement?.remainingTime);
    const questionType = useSelector((state) => state.interviewManagement.currentQuestion?.type);
    const questions = useSelector((state) => state.interviewManagement.questions);
    const displayTime = useCountdown(remainingTime);
    // dispatch(setInterviewStatus(displayTime === '00:00' ? 'finished' : 'inProgress'));
  const navigate = useNavigate();
    const handleLanguageChange = (e) => {
        const mode = e.target.value;
        dispatch(setCurrentQuestion({...currentQuestion, mode: mode}))
    };

    const finishInterview = () => {
      return new Promise((resolve, reject) => {
        try {
          const user_answers = questions.map((question) => {
            if (question.type === "Algorithm") {
              const language = question.mode?.split("/")[2] || "Not Selected";
              return {
                _id: question.question._id,
                user_answer: question.code || "",
                type: question.type,
                answer: question.question.answer[language] || "",
                name: question.question.name,
                language: language,
              };
            }
            return {
              _id: question.question._id,
              user_answer: question.user_answer || "",
              type: question.type,
              answer: question.question?.answer || "",
              name: question.question.name,
            };
          });
          console.log(user_answers);
          const interview_signature = window.location.pathname.split("/").pop();

          axios
            .post(
              `${
                import.meta.env.VITE_BACKEND_BASE_URL
              }/api/interview/finish_interview`,
              { user_answers, interview_signature },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              const data = res.data;
              resolve(data);
            })
            .catch((err) => {
              reject(err.response.data);
            });
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    };
    const showPromiseConfirm = () => {
      confirm({
        title: "Do you want to finish the interview?",
        icon: <ExclamationCircleFilled />,
        content:
          "You will be redirected to progress tracking page after you finish the interview.",
        onOk() {
          return new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            finishInterview()
              .then((data) => {
                console.log("Success!", data);
                navigate(data.data.redirect_path);
                resolve(); 
              })
              .catch((error) => {
                console.log("Oops errors!");
                reject(error); 
              });
          });
        },
        onCancel() {},
        okText: "Yes, Finish",
        cancelText: "No, Continue",
      });
    };
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
                    {questionType}
                </div>
            </div>
            {
                questionType === 'Algorithm' && (
                    <select className={styles.interview__container__header__language} value={currentQuestion?.mode}
                            onChange={e => handleLanguageChange(e)}>
                        <option value="Language">Language</option>
                        <option value="ace/mode/java">Java</option>
                        <option value="ace/mode/python">Python</option>
                        <option value="ace/mode/csp">C#</option>
                        <option value="ace/mode/javascript">JavaScript</option>
                    </select>
                )
            }

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
            <button className={styles.interview__container__header__finish__button} onClick={()=>  showPromiseConfirm()}>
                Finish
            </button>

        </header>
    );

}
export default InterviewHeader;

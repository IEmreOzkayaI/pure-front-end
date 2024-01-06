import styles from "./AnswerOutput.module.scss";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import algorithmSlice, {algorithmFetch, clearAlgorithmInfo} from "../../redux/toolkit/compiler/algorithmSlice.js";

const AnswerConsole = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);

    const algorithmInfo = useSelector((state) => state.algorithmSlice?.algorithmInfo);
    const algorithmError = useSelector((state) => state.algorithmSlice?.algorithmError);
    const algorithmProgress = useSelector((state) => state.algorithmSlice?.algorithmProgress);
    const handleCodeExecute = () => {
        if (currentQuestion?.code) {
            dispatch(algorithmFetch({
                _id:currentQuestion?.question._id ,language: currentQuestion?.mode, code: currentQuestion?.code
            }));
        } else {
            alert("No change to execute")
        }
    };

    useEffect(() => {
        console.log("bitti mi la")
        console.log(algorithmInfo)
        // dispatch(clearAlgorithmInfo());
    }, [algorithmInfo]);


    return <div className={styles.right_side_content_down}>
        <div className={styles.right_side_content_down_title}>
            <div className={`${styles.right_side_content_down_title_console} ${activeTab === 0 && styles.active}`}
                 onClick={() => setActiveTab(0)}>
                CONSOLE
            </div>
            {/*<div className={`${styles.right_side_content_down_title_custom} ${activeTab === 1 && styles.active}`}*/}
            {/*     onClick={() => setActiveTab(1)}>*/}
            {/*    CUSTOM INPUT*/}
            {/*</div>*/}
        </div>
        <div className={styles.right_side_content_down_body}>
            <div className={styles.right_side_content_down_body_output}>
                {algorithmInfo !== null && <>Successful</>}
                {algorithmError !== false && <>Error</>}
                {algorithmProgress !== false && <>Loading</>}
            </div>
            <div className={styles.right_side_content_down_body_actions}>
                <button onClick={() => handleCodeExecute()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                        <path
                            d="M1 7.86496V2.13504C1 1.2872 1.98886 0.824047 2.64018 1.36682L6.07813 4.23178C6.55789 4.63157 6.55789 5.36843 6.07814 5.76822L2.64018 8.63318C1.98886 9.17595 1 8.7128 1 7.86496Z"
                            stroke="#FFFFFF" strokeWidth="0.5"/>
                    </svg>
                    Run
                </button>
                <button>Submit</button>

            </div>
        </div>

    </div>;
};

export default AnswerConsole;

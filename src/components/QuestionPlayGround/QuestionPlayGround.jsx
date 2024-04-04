import {memo, useState} from "react";

import PropTypes from "prop-types";
import styles from "./QuestionPlayGround.module.scss";
import {useSelector} from "react-redux";
import ReactMarkdown from 'react-markdown';
import {FaLock, FaLockOpen} from "react-icons/fa";
import {IoLockClosed, IoLockClosedOutline, IoLockOpen, IoLockOpenOutline} from "react-icons/io5";
import {RiArrowDropDownLine} from "react-icons/ri";

const QuestionPlayGround = memo(
    (props) => {
        const {leftSideWidth} = props;
        const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);
        const [additional_resources, setAdditionalResources] = useState(false);
        const [interactive_steps, setInteractiveSteps] = useState(false);
        return (
            <div className={styles.left_side} style={{width: `${leftSideWidth}%`}}>

                <div className={styles.left_side_content}>
                    <div className={styles.name}>{currentQuestion?.question.name}</div>
                    <div className={styles.topic_level}>
                        <div className={styles.topic}>Topic: {currentQuestion?.question.topic}</div>
                        {/*<div className={styles.level}>{currentQuestion?.question.level}</div>*/}
                        <div className={styles.level}>Level: Intermediate</div>
                    </div>
                    {
                        currentQuestion?.type === 'Algorithm' && (
                            <div>
                                <div className={styles.scenario}>
                                    <div className={styles.scenario_title}> Scenario</div>
                                    <div className={styles.scenario_content}>
                                        {currentQuestion?.question.description.scenario}
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <div className={styles.question_title}>Question</div>
                                    <div className={styles.question_content}>
                                        {currentQuestion?.question.description.question}
                                    </div>
                                </div>
                                <div className={styles.real_life}>
                                    <div className={styles.real_life_title}>Real Life Application</div>
                                    <div className={styles.real_life_content}>
                                        {currentQuestion?.question.real_life_application}</div>
                                </div>
                                <div className={styles.example_input_output}>
                                    <div className={styles.example_title}>Example</div>
                                    <div className={styles.example_content}>
                                        <div className={styles.example_input}>

                                            <div className={styles.example_input_content}>
                                                Input: {currentQuestion?.question.example_input}
                                            </div>
                                        </div>
                                        <div className={styles.example_output}>
                                            <div className={styles.example_output_content}>
                                                Output: {currentQuestion?.question.example_output}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.time_complexity_analysis}>
                                    <div className={styles.time_complexity_analysis_title}>Time Complexity Analysis</div>
                                    <div className={styles.time_complexity_analysis_content}>
                                        <div
                                            className={styles.time_complexity_analysis_item}>
                                            Best Case: {currentQuestion?.question.time_complexity_analysis.best_case}
                                        </div>
                                        <div className={styles.time_complexity_analysis_item}>
                                            Average Case: {currentQuestion?.question.time_complexity_analysis.average_case}
                                        </div>
                                        <div className={styles.time_complexity_analysis_item}>
                                            Worst Case: {currentQuestion?.question.time_complexity_analysis.worst_case}
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.additional_resources}`}>
                                    <div
                                        className={`${styles.additional_resources_title} ${additional_resources && styles.additional_resources_title_active}`}
                                        onClick={() => setAdditionalResources(!additional_resources)}>
                                        Additional Resources
                                        <div className={styles.icon}>
                                            <RiArrowDropDownLine/>
                                        </div>

                                    </div>
                                    <div
                                        className={`${styles.additional_resources_links} ${additional_resources && styles.additional_resources_links_active}`}>
                                        {currentQuestion?.question.additional_resources_about_algorithm_and_topic.map((resource,index) => {
                                            return <div className={styles.additional_resources_links_item} key={index}>
                                                <a href={resource.link} target="_blank">{resource.name}</a>
                                            </div>
                                        })}
                                    </div>
                                </div>


                                <div className={styles.interactive_steps}>
                                    <div
                                        className={`${styles.interactive_steps_title} ${interactive_steps && styles.interactive_steps_title_active}`}
                                        onClick={() => setInteractiveSteps(!interactive_steps)}>
                                        Interactive Steps
                                        {/*<IoLockClosedOutline />*/}
                                        <div className={styles.icon}>
                                            <IoLockOpenOutline/>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.interactive_steps_content} ${interactive_steps && styles.interactive_steps_content_active}`}>
                                        {currentQuestion?.question.interactive_steps.map((step,index) => {
                                            return <div className={styles.interactive_steps_content_item} key={index}>
                                                {step.step_number}. {step.description}
                                            </div>
                                        })}
                                    </div>
                                </div>


                            </div>
                        )

                    }
                    {
                        currentQuestion?.type === 'Diagram' && (<span>

                                <div className={styles.question}>
                                    <div className={styles.question_title}>Question</div>
                                    <div className={styles.question_content}>
                                {currentQuestion?.question.description}
                                    </div>
                                </div>

                                <div className={styles.question}>
                                    <div className={styles.question_title}>Real Life Application</div>
                                    <div className={styles.question_content}>
                                {currentQuestion?.question.real_life_application}
                                    </div>
                                </div>

                             <div className={`${styles.additional_resources}`}>
                                    <div
                                        className={`${styles.additional_resources_title} ${additional_resources && styles.additional_resources_title_active}`}
                                        onClick={() => setAdditionalResources(!additional_resources)}>
                                        Additional Resources
                                        <div className={styles.icon}>
                                            <RiArrowDropDownLine/>
                                        </div>

                                    </div>
                                    <div
                                        className={`${styles.additional_resources_links} ${additional_resources && styles.additional_resources_links_active}`}>
                                        {currentQuestion?.question.additional_resources_about_topic.map((resource,index) => {
                                            return <div className={styles.additional_resources_links_item} key={index}>
                                                <a href={resource.link} target="_blank">{resource.name}</a>
                                            </div>
                                        })}
                                    </div>
                                </div>


                                <div className={styles.interactive_steps}>
                                    <div
                                        className={`${styles.interactive_steps_title} ${interactive_steps && styles.interactive_steps_title_active}`}
                                        onClick={() => setInteractiveSteps(!interactive_steps)}>
                                        Interactive Steps
                                        {/*<IoLockClosedOutline />*/}
                                        <div className={styles.icon}>
                                            <IoLockOpenOutline/>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.interactive_steps_content} ${interactive_steps && styles.interactive_steps_content_active}`}>
                                        {currentQuestion?.question.interactive_steps.map((step,index) => {
                                            return <div className={styles.interactive_steps_content_item} key={index}>
                                                {step.step_number}. {step.description}
                                            </div>
                                        })}
                                    </div>
                                </div>

                        </span>
                        )
                    }

                </div>
            </div>
        );
    },

    (prevProps, nextProps) => {
        return prevProps.leftSideWidth === nextProps.leftSideWidth;
    }
);

// displayName add must because of memo and eslint
QuestionPlayGround.displayName = "QuestionPlayGround";

QuestionPlayGround.propTypes = {
    currentQuestion: PropTypes.object,
    leftSideWidth: PropTypes.number,
};

export default QuestionPlayGround;

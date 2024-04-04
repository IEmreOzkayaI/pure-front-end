import {useState} from "react";
import styles from "./style.module.scss";
import pure_no_bg_logo from "/pure_no_bg_logo.svg";
import {FileDoneOutlined, SearchOutlined, PhoneOutlined, VideoCameraOutlined, NotificationOutlined, MailOutlined, QuestionCircleOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {interviewResultFetch} from "../../redux/toolkit/interviewResultSlice";
import Redirect from "../../components/shared/Redirect/Redirect";
import {setInterviewStatus} from "../../redux/toolkit/interviewManagementSlice";
const InterviewTracker = () => {
	const dispatch = useDispatch();
	const {interview_signature} = useParams();

	const [interviewStatus, setInterviewStatus] = useState("");
	const [process, setProcess] = useState(0);

	const {interviewResultInfo, interviewResultError, interviewResultProgress, interviewResultInit} = useSelector((state) => state.interviewResultSlice);

	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	const icon_package = {
		REGISTERED: <FileDoneOutlined />,
		EXAMINING: <SearchOutlined />,
		CALL: <PhoneOutlined />,
		MEET: <VideoCameraOutlined />,
		REJECTED: <MehOutlined />,
		ACCEPTED: <SmileOutlined />,
	};

	useEffect(() => {
		dispatch(interviewResultFetch(interview_signature));
	}, []);

	useEffect(() => {
		if (interviewResultInfo) {
			setInterviewStatus(interviewResultInfo.data.status);
			switch (interviewResultInfo.data.status.name) {
				case "REGISTERED":
					setProcess(20);
					break;
				case "EXAMINING":
					setProcess(40);
					break;
				case "CALL":
					setProcess(60);
					break;
				case "MEET":
					setProcess(80);
					break;
				case "REJECTED":
					setProcess(100);
					break;
				case "ACCEPTED":
					setProcess(100);
					break;
				default:
					break;
			}
		}
	}, [interviewResultInfo]);
	if (interviewResultProgress) {
		return <div>Loading...</div>;
	}

	if (interviewResultError) {
		return <div>Error...</div>;
	}

	if (interviewResultInfo?.data.status === "INITIATED" || interviewResultInfo?.data.status.name === "INITIATED") {
		return <Redirect success={false} text={"!!! Ooops There Is Not Exist Any Interview 🚫 !!!"} />;
	}

	return (
		<div className={styles.interview_tracker__container}>
			<div className={styles.interview_tracker__container__bar}>
				<img src={pure_no_bg_logo} alt='' />
			</div>
			<div className={styles.interview_tracker__container__content}>
				<div className={styles.interview_tracker__container__content__process__steps}>
					<div className={styles.interview_tracker__container__content__process__steps__header}>
						<h1 className={styles.interview_tracker__container__content__process__steps__header__main}>Interview Process</h1>
						<h4 className={styles.interview_tracker__container__content__process__steps__header__sub}>You're interviewing for {interviewResultInfo?.data.interview_name} role at Pure</h4>
					</div>
					<ul className={styles.interview_tracker__container__content__process__steps__items}>
						<li className={`${styles.interview_tracker__container__content__process__steps__items__item} ${interviewStatus.name === "REGISTERED" && styles.active_status}`}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<FileDoneOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Application Registered</h3>
								{interviewStatus.name === "REGISTERED" ? <p>On {interviewStatus.update_date}</p> : <p>-</p>}
							</div>
						</li>
						<li className={`${styles.interview_tracker__container__content__process__steps__items__item} ${interviewStatus.name === "EXAMINING" && styles.active_status}`}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<SearchOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Application Examining</h3>
								{interviewStatus.name === "EXAMINING" ? <p>On {interviewStatus.update_date}</p> : <p>-</p>}
							</div>
						</li>
						<li className={`${styles.interview_tracker__container__content__process__steps__items__item} ${interviewStatus.name === "CALL" && styles.active_status}`}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<PhoneOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Phone Call</h3>
								{interviewStatus.name === "CALL" ? <p>On {interviewStatus.communication_date}</p> : <p>-</p>}
							</div>
						</li>
						<li className={`${styles.interview_tracker__container__content__process__steps__items__item} ${interviewStatus.name === "MEET" && styles.active_status}`}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<VideoCameraOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Online Camera Meet</h3>
								{interviewStatus.name === "MEET" ? <p>On {interviewStatus.communication_date}</p> : <p>-</p>}
							</div>
						</li>
						{interviewStatus.name !== "REJECTED" && interviewStatus.name !== "ACCEPTED" && (
							<li className={`${styles.interview_tracker__container__content__process__steps__items__item} ${interviewStatus.name === "REJECTED" && styles.active_status}`}>
								<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
									<NotificationOutlined />
								</div>
								<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
									<h3>Offered / Rejected</h3>
									<p>-</p>
								</div>
							</li>
						)}
						{interviewStatus.name === "REJECTED" && (
							<li className={`${styles.interview_tracker__container__content__process__steps__items__item} ${interviewStatus.name === "REJECTED" && styles.active_status}`}>
								<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
									<MehOutlined />
								</div>
								<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
									<h3>Rejected</h3>
									{interviewStatus.name === "REJECTED" && <p>On {interviewStatus.update_date}</p>}
								</div>
							</li>
						)}
						{interviewStatus.name === "ACCEPTED" && (
							<li className={`${styles.interview_tracker__container__content__process__steps__items__item} ${interviewStatus.name === "ACCEPTED" && styles.active_status}`}>
								<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
									<SmileOutlined />
								</div>
								<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
									<h3>Offered</h3>
									{interviewStatus.name === "ACCEPTED" && <p>On {interviewStatus.update_date}</p>}
								</div>
							</li>
						)}
					</ul>
				</div>
				<div className={styles.interview_tracker__container__content__process__progress}>
					<div className={styles.interview_tracker__container__content__process__progress__item}>
						<label htmlFor='progress'>{interviewStatus.detail}</label>
						<progress id='progress' value={process} max='100' />
					</div>
					{interviewStatus.communication_date ? <div className={styles.interview_tracker__container__content__process__progress__date}>On {interviewStatus.communication_date}</div> : <div className={styles.interview_tracker__container__content__process__progress__date}>On {interviewStatus.update_date}</div>}
				</div>
				<div className={styles.interview_tracker__container__content__process__details}>
					<div className={styles.interview_tracker__container__content__process__details__header}>Current Step</div>
					<div className={styles.interview_tracker__container__content__process__details__content}>
						{icon_package[interviewStatus.name]}
						<div className={styles.interview_tracker__container__content__process__details__content__card}>
							<h2>{interviewStatus.detail}</h2>
							{interviewStatus?.communication_date ? <p>On {interviewStatus?.communication_date}</p> : <p>On {interviewStatus?.update_date}</p>}
						</div>
					</div>
				</div>
				<div className={styles.interview_tracker__container__content__process__details}>
					<div className={styles.interview_tracker__container__content__process__details__header}>Recruiter</div>
					<div className={styles.interview_tracker__container__content__process__details__content}>
						<MailOutlined />
						<div className={styles.interview_tracker__container__content__process__details__content__card}>
							<h2>pure@the-pure.tech</h2>
							<p>The Pure</p>
						</div>
					</div>
				</div>
				<div className={styles.interview_tracker__container__content__process__details}>
					<div className={styles.interview_tracker__container__content__process__details__header}>FAQ's</div>
					<div className={styles.interview_tracker__container__content__process__details__content} onClick={toggleDropdown}>
						<QuestionCircleOutlined />
						<div className={styles.interview_tracker__container__content__process__details__content__card}>
							<h2>Phone interview</h2>
							<p>What can I expect from the phone interview?</p>
							<div className={`${styles.interview_tracker__container__content__process__details__content__card__detail} ${isOpen ? styles.active : ""}`}>
								<p>
									What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone
									interview?What can I expect from the phone interview?
								</p>
							</div>
						</div>
					</div>

					<div className={styles.interview_tracker__container__content__process__details__content} onClick={toggleDropdown}>
						<QuestionCircleOutlined />
						<div className={styles.interview_tracker__container__content__process__details__content__card}>
							<h2>Next steps</h2>
							<p>How long will it take to hear back after the phone interview?</p>
							<div className={`${styles.interview_tracker__container__content__process__details__content__card__detail} ${isOpen ? styles.active : ""}`}>
								<p>
									What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone
									interview?What can I expect from the phone interview?
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default InterviewTracker;

// const YourComponent = () => {
//   const [dropdowns, setDropdowns] = useState(new Array(2).fill(false)); // Initialize with the number of dropdowns you have

//   const toggleDropdown = (index) => {
//       const newDropdowns = [...dropdowns];
//       newDropdowns[index] = !newDropdowns[index];
//       setDropdowns(newDropdowns);
//   };

//   return (
//       <div className={styles.interview_tracker__container__content__process__details}>
//           <div className={styles.interview_tracker__container__content__process__details__header}>FAQ's</div>

//           {dropdowns.map((isOpen, index) => (
//               <div key={index} className={styles.interview_tracker__container__content__process__details__content} onClick={() => toggleDropdown(index)}>
//                   <QuestionCircleOutlined />
//                   <div className={styles.interview_tracker__container__content__process__details__content__card}>
//                       <h2>Dropdown {index + 1}</h2>
//                       <p>Content of dropdown {index + 1}</p>
//                       <div className={`${styles.interview_tracker__container__content__process__details__content__card__detail} ${isOpen ? styles.active : ''}`}>
//                           <p>
//                               Detailed content of dropdown {index + 1}...
//                           </p>
//                       </div>
//                   </div>
//               </div>
//           ))}
//       </div>
//   );
// };

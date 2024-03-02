import {useState} from "react";
import styles from "./style.module.scss";
import pure_no_bg_logo from "/pure_no_bg_logo.svg";
import {FileDoneOutlined, SearchOutlined, PhoneOutlined, VideoCameraOutlined, NotificationOutlined, MailOutlined, QuestionCircleOutlined} from "@ant-design/icons";
const InterviewTracker = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.interview_tracker__container}>
			<div className={styles.interview_tracker__container__bar}>
				<img src={pure_no_bg_logo} alt='' />
			</div>
			<div className={styles.interview_tracker__container__content}>
				<div className={styles.interview_tracker__container__content__process__steps}>
					<div className={styles.interview_tracker__container__content__process__steps__header}>
						<h1 className={styles.interview_tracker__container__content__process__steps__header__main}>Interview Process</h1>
						<h4 className={styles.interview_tracker__container__content__process__steps__header__sub}>You're interviewing for a design role at Pure</h4>
					</div>
					<ul className={styles.interview_tracker__container__content__process__steps__items}>
						<li className={styles.interview_tracker__container__content__process__steps__items__item}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<FileDoneOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Application Registered</h3>
								<p>20th May</p>
							</div>
						</li>
						<li className={styles.interview_tracker__container__content__process__steps__items__item}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<SearchOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Application Examining</h3>
								<p>20th May</p>
							</div>
						</li>
						<li className={styles.interview_tracker__container__content__process__steps__items__item}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<PhoneOutlined style={{transform: "rotate(90deg)"}} />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Phone Call</h3>
								<p>20th May</p>
							</div>
						</li>
						<li className={styles.interview_tracker__container__content__process__steps__items__item}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<VideoCameraOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Online Camera Meet</h3>
								<p>20th May</p>
							</div>
						</li>
						<li className={styles.interview_tracker__container__content__process__steps__items__item}>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__icon}>
								<NotificationOutlined />
							</div>
							<div className={styles.interview_tracker__container__content__process__steps__items__item__text}>
								<h3>Offer/Decline</h3>
								<p>20th May</p>
							</div>
						</li>
					</ul>
				</div>
				<div className={styles.interview_tracker__container__content__process__progress}>
					<div className={styles.interview_tracker__container__content__process__progress__item}>
						<label htmlFor='progress'>Phone interview</label>
						<progress id='progress' value='32' max='100' />
					</div>
					<div className={styles.interview_tracker__container__content__process__progress__date}>Due 20th May</div>
				</div>
				<div className={styles.interview_tracker__container__content__process__details}>
					<div className={styles.interview_tracker__container__content__process__details__header}>Current Step</div>
					<div className={styles.interview_tracker__container__content__process__details__content}>
						<PhoneOutlined style={{transform: "rotate(90deg)"}} />
						<div className={styles.interview_tracker__container__content__process__details__content__card}>
							<h2>Phone Interview</h2>
							<p>Feb 15, 2023 10:00 AM - 11:00 AM</p>
						</div>
						<button>Send Reminder Mail</button>
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
						<a href='mailto:0emre.ozkaya0@gmail.com'>Send Email</a>
					</div>
				</div>
				<div className={styles.interview_tracker__container__content__process__details}>
					<div className={styles.interview_tracker__container__content__process__details__header}>FAQ's</div>
					<div className={styles.interview_tracker__container__content__process__details__content} onClick={toggleDropdown}>
						<QuestionCircleOutlined  />
						<div className={styles.interview_tracker__container__content__process__details__content__card}>
							<h2>Phone interview</h2>
							<p>What can I expect from the phone interview?</p>
							<div className={`${styles.interview_tracker__container__content__process__details__content__card__detail} ${isOpen ? styles.active : ""}`}>
								<p>
									What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from
									the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?
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
									What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from
									the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?What can I expect from the phone interview?
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
/* eslint-disable react/prop-types */
import styles from "./Redirect.module.scss";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const Redirect = ({text,success}) => {
	return (
		<div className={styles.verified_redirect}>
		{success && 		<Fireworks autorun={{ speed: 0.8 }} />}
			<div className={styles.verified_redirect_content}>
				<div className={styles.verified_redirect_title}>
					<span>PURE | </span> {text}
				</div>
			</div>
		</div>
	);
};

export default Redirect;

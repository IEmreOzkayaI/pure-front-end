import PropTypes from "prop-types";
import EmptyInterviewInfoBoard from "../emptyInterviewInfoBoard/index.jsx";
import CustomModal from "../CustomModal.jsx";
import {useState} from "react";
import AddInterview from "../addInterview/index.jsx";

const CompanyDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <>
            {/*<div className={styles.company__dashboard__container}><div className={styles.company__dashboard__container__first__line}>*/}
            {/*    <DataTable text={"Genel Başvuru Sayım"}/>*/}
            {/*</div><div className={styles.company__dashboard__container__second__line}>*/}
            {/*    <div className={styles.company__dashboard__container__second__line__first__column}>*/}
            {/*        <DataTable text={"Mülakatlarım"}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles.company__dashboard__container__second__line__second__column}>*/}
            {/*        <DataTable text={"Mülakat Detaylarım"}/>*/}
            {/*    </div>*/}
            {/*</div></div>*/}
            <EmptyInterviewInfoBoard setIsModalOpen={setIsModalOpen}/>

            <CustomModal
                width={"100%"}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            >
                <div>
                    <AddInterview/>
                </div>
            </CustomModal>
        </>

    );
};

CompanyDashboard.propTypes = {
    clickCount: PropTypes.number,
};

export default CompanyDashboard;

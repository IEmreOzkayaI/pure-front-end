import styles from "./style.module.scss";
const EmptyInterviewInfoBoard = ({setIsModalOpen}) => {

    return (
        <>
            <div className={styles.empty__interview__info__board__container} onClick={() => setIsModalOpen(true)}>
                Henüz bir mülakat eklenmedi. <br/><br/>
                Eklemek için tıklayınız.

            </div>
        </>
    );

}

export default EmptyInterviewInfoBoard;

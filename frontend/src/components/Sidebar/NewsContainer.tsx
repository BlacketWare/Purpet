import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

interface NewsContainerProps {
    isOpen: boolean;
    onClick?: () => void;
}

export default function NewsContainer({ isOpen, onClick }: NewsContainerProps) {
    return (
        <div className={`${styles.container} ${isOpen ? styles.containerShown : ""}`}>
            <div className={styles.newsHeader}>
                <FontAwesomeIcon className={styles.newsIcon} icon={faNewspaper} />
                <div className={styles.headerText}>Purpet</div>
                <div className={styles.newsText}>News</div>
                <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} tabIndex={0} onClick={onClick} />
            </div>
            {/* <div className={styles.postsContainer}>
                    <div className={styles.cardContainer}>
                        <div className={styles.tagText}>Seasonal Event</div>
                        <div className={styles.newsHeaderText}>Winter Holiday Update!</div>
                        <img className={styles.image} src="https://media.blooket.com/image/upload/v1701746678/Media/holidayPost2023Small.jpg" draggable="false" />
                        <div className={styles.newsBody}>
                            <div>
                                Happy December! We hope your school year is going well! To celebrate the end of 2023 we've added the Blizzard Pack and new seasonal cosmetics in the Market. Plus users can also try out our limited-time game mode Santa's Workshop now! It'll be free for everyone on 12/18.
                                <br />
                            </div>
                        </div>
                        <div className={styles.dateRow}>
                            <FontAwesomeIcon className={styles.dateIcon} icon={faCalendarAlt} />
                            -999 days ago
                        </div>
                    </div>
                </div> */}
        </div>
    );
}

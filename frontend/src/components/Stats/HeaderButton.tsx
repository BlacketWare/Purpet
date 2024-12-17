import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

interface HeaderButtonProps {
    color: string;
    text: string;
    icon: any;
    onClick: () => void | null;
}
export default function HeaderButton({ color, text, icon, onClick }: HeaderButtonProps) {
    return (
        <>
            <div className={`${styles.button} ${styles.headerButton}`} role="button" tabIndex={0} onClick={onClick}>
                <div className={styles.shadow} />
                <div className={styles.edge} style={{ backgroundColor: color }} />
                <div className={styles.front} style={{ backgroundColor: color }}>
                    <div className={styles.headerButtonInside}>
                        <div className={styles.headerButtonIcon}>
                            <FontAwesomeIcon icon={icon} />
                        </div>
                        {text}
                    </div>
                </div>
            </div>
        </>
    );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faNewspaper, faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "@contexts/Auth";
import styles from "./styles.module.css";

interface MobileSidebarProps {
    isOpen: boolean;
    onClick?: () => void;
    newsClick?: () => void;
    pages: { name: string, path: string, icon: JSX.Element }[];
}

export default function MobileSidebar({ isOpen, onClick, newsClick, pages }: MobileSidebarProps) {
    const { logout } = useAuth();

    return (
        <div className={`${styles.mSidebar} ${isOpen ? styles.mSidebarOpen : ""}`}>
            <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} tabIndex={0} onClick={onClick} />
            {pages.map((page, index) => (
                <Link key={index} className={`${styles.pageButton} ${window.location.pathname === page.path ? styles.pageSelected : ""}`} to={page.path} onClick={onClick}>
                    {page.icon}
                    <div className={styles.pageText}>{page.name}</div>
                </Link>
            ))}
            <div className={`${styles.pageButton}`} role="button" tabIndex={0} onClick={() => logout()}>
                <FontAwesomeIcon icon={faSignOutAlt} className={styles.pageIcon} />
                <div className={styles.pageText}>Logout</div>
            </div>

            <div className={`${styles.bottomRow} ${styles.bottomRowMargin}`}>
                <Link className={styles.smallButton} to="/settings" onClick={onClick}>
                    <FontAwesomeIcon icon={faCog} className={styles.bottomIcon} />
                </Link>
                <div className={styles.smallButton} role="button" tabIndex={0} onClick={() => window.open("https://discord.gg/Yu42pbV5Vr", "_blank")}>
                    <FontAwesomeIcon icon={faDiscord} className={styles.bottomIcon} />
                </div>
                <div className={styles.smallButton} role="button" tabIndex={0} onClick={newsClick}>
                    <FontAwesomeIcon icon={faNewspaper} className={styles.bottomIcon} />
                </div>
            </div>
        </div>
    );
}

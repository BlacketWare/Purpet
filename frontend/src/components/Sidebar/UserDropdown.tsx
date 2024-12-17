import { useAuth } from "@contexts/Auth";
import { useBlooks } from "@contexts/Blook";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { constructBlook } from "@utils/ConstructUrl";
import styles from "./styles.module.css";

export default function UserDropdown() {
    const { user, logout } = useAuth();
    const { allBlooks } = useBlooks();

    if (!user) return null;
    if (!allBlooks) return null;

    return (
        <div className={styles.profileContainer} role="button" tabIndex={0}>
            <div className={styles.profileRow}>
                <div className={`${styles.blookContainer} ${styles.profileBlook}`}>
                    <img src={constructBlook(user.avatar.id)} draggable="false" className={styles.blook} />
                </div>
                <div style={{ color: user.color }}>{user.username}</div>
            </div>
            <FontAwesomeIcon icon={faAngleDown} className={styles.userDropdownIcon} />
            <div className={styles.userDropdownMenu}>
                <Link className={styles.userDropdownOption} to="/settings">
                    <FontAwesomeIcon icon={faCog} className={styles.userDropdownOptionIcon} />
                    Settings
                </Link>
                <div className={styles.userDropdownOption} role="button" tabIndex={0} onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} className={styles.userDropdownOptionIcon} />
                    Logout
                </div>
            </div>
        </div>
    );
}
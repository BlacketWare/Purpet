import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface MobileHeaderProps {
    onClick?: () => void;
}

export default function MobileHeader({ onClick }: MobileHeaderProps) {
    return (
        <div className={styles.mNavBar}>
            <Link className={styles.mPurpetText} to="/">Purpet</Link>
            <FontAwesomeIcon className={styles.mHamburgerIcon} icon={faBars} tabIndex={0} onClick={onClick} />
        </div>
    );
}

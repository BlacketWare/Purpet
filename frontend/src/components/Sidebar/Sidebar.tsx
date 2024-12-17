import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.css";

interface SidebarProps {
    newsClick?: () => void;
    pages: { name: string, path: string, icon: JSX.Element }[];
}

export default function Sidebar({ newsClick, pages }: SidebarProps) {
    return (
        <div className={styles.sidebar}>
            <Link className={styles.purpetText} to="/">Purpet</Link>
            {pages.map((page, index) => (
                <Link key={index} className={`${styles.pageButton} ${window.location.pathname === page.path ? styles.pageSelected : ""}`} to={page.path}>
                    {page.icon}
                    <div className={styles.pageText}>{page.name}</div>
                </Link>
            ))}

            <div className={styles.bottomRow}>
                <Link data-tooltip-content="Settings" data-tooltip-id="settings" className={styles.smallButton} to="/settings">
                    <Tooltip id="settings" place="left" />
                    <FontAwesomeIcon icon={faCog} className={styles.bottomIcon} />
                </Link>
                <div data-tooltip-content="Discord" data-tooltip-id="discord" className={styles.smallButton} role="button" tabIndex={0} onClick={() => window.open("https://discord.gg/Yu42pbV5Vr", "_blank")}>
                    <Tooltip id="discord" place="top" />
                    <FontAwesomeIcon icon={faDiscord} className={styles.bottomIcon} />
                </div>
                <div data-tooltip-content="News" data-tooltip-id="news" className={styles.smallButton} role="button" tabIndex={0} onClick={newsClick}>
                    <Tooltip id="news" place="top" />
                    <FontAwesomeIcon icon={faNewspaper} className={styles.bottomIcon} />
                </div>
            </div>
        </div>
    );
}

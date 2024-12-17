import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faTrophy, faComments, faBalanceScale, faScroll, faHammer, faUsers, faStore, faSuitcase, faShop, faGavel } from "@fortawesome/free-solid-svg-icons";
import SidebarComponent from "./Sidebar";
import MobileHeader from "./MobileHeader";
import MobileSidebar from "./MobileSidebar";
import UserDropdown from "./UserDropdown";
import NewsContainer from "./NewsContainer";
import styles from "./styles.module.css";

const pages = [
    {
        name: "Stats",
        path: "/stats",
        icon: <FontAwesomeIcon icon={faChartBar} className={styles.pageIcon} />
    },
    {
        name: "Leaderboard",
        path: "/leaderboard",
        icon: <FontAwesomeIcon icon={faTrophy} className={styles.pageIcon} />
    },
    {
        name: "Chat",
        path: "/chat",
        icon: <FontAwesomeIcon icon={faComments} className={styles.pageIcon} />
    },
    {
        name: "Market",
        path: "/market",
        icon: <FontAwesomeIcon icon={faStore} className={styles.pageIcon} />
    },
    {
        name: "Blooks",
        path: "/blooks",
        icon: <FontAwesomeIcon icon={faSuitcase} className={styles.pageIcon} />
    },
    {
        name: "Auctions",
        path: "/auctions",
        icon: <FontAwesomeIcon icon={faGavel} className={styles.pageIcon} />
    },
    {
        name: "Trading Plaza",
        path: "/trading",
        icon: <FontAwesomeIcon icon={faBalanceScale} className={styles.pageIcon} />
    },
    {
        name: "Quests",
        path: "/quests",
        icon: <FontAwesomeIcon icon={faScroll} className={styles.pageIcon} />
    },
    {
        name: "Crafting",
        path: "/crafting",
        icon: <FontAwesomeIcon icon={faHammer} className={styles.pageIcon} />
    },
    {
        name: "Clubs",
        path: "/clubs",
        icon: <FontAwesomeIcon icon={faUsers} className={styles.pageIcon} />
    },
    {
        name: "Store",
        path: "/store",
        icon: <FontAwesomeIcon icon={faShop} className={styles.pageIcon} />
    }
];

export default function Sidebar({ additionalRow }: { additionalRow?: JSX.Element }) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [newsOpen, setNewsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={styles.topRightRow}>
                {additionalRow}
                <UserDropdown />
            </div>
            <MobileHeader onClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className={`${styles.modal} ${styles.modalTransition} ${sidebarOpen ? styles.modalOpen : ""}`} />
            <MobileSidebar isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} newsClick={() => setNewsOpen(!newsOpen)} pages={pages} />
            {newsOpen && <div className={styles.modal} onClick={() => setNewsOpen(!newsOpen)} />}
            <NewsContainer isOpen={newsOpen} onClick={() => setNewsOpen(!newsOpen)} />
            <SidebarComponent newsClick={() => setNewsOpen(!newsOpen)} pages={pages} />
        </>
    );
}

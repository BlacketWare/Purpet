import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faFileUpload, faGavel, faMedal, faMoneyBillWave, faPalette, faTrophy, faCrown, faScroll } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

const perks = [
    {
        perk: "Plus Badge & Role",
        description: "Get a special badge and role in game, and on our Discord server!",
        icon: <FontAwesomeIcon icon={faMedal} className={styles.perkIcon} />
    },
    {
        perk: "Username Colours",
        description: "Customise your username with a variety of colours!",
        icon: <FontAwesomeIcon icon={faPalette} className={styles.perkIcon} />
    },
    {
        perk: "100mb File Uploads",
        description: "Upload files up to 100mb in size to use in game!",
        icon: <FontAwesomeIcon icon={faFileUpload} className={styles.perkIcon} />
    },
    {
        perk: "Unlimited Auctions",
        description: "Create as many auctions as you like!",
        icon: <FontAwesomeIcon icon={faGavel} className={styles.perkIcon} />
    },
    {
        perk: "1000 Inventory Slots",
        description: "Store up to 1000 items in your inventory!",
        icon: <FontAwesomeIcon icon={faBoxes} className={styles.perkIcon} />
    },
    {
        perk: "5% Fee on Auctions",
        description: "Pay a lower fee on auctions, saving you money!",
        icon: <FontAwesomeIcon icon={faMoneyBillWave} className={styles.perkIcon} />
    },
    {
        perk: "200 Extra daily coins",
        description: "Get an extra 200 coins every day!",
        icon: <FontAwesomeIcon icon={faCrown} className={styles.perkIcon} />
    },
    {
        perk: "Exclusive Auctions",
        description: "Access auctions that are only available to premium users!",
        icon: <FontAwesomeIcon icon={faTrophy} className={styles.perkIcon} />
    },
    {
        perk: "Bonus Quests",
        description: "Unlock special quests that give you extra rewards!",
        icon: <FontAwesomeIcon icon={faScroll} className={styles.perkIcon} />
    }
];

export default function MiddleWrapper() {
    return (
        <>
            <div className={styles.middleHeader}>Perks of Premium</div>
            <div className={styles.middlePerks}>
                {perks.map((perk, i) => (
                    <div className={styles.perkContainer} key={i}>
                        {perk.icon}
                        <div className={styles.perkInfo}>
                            <div className={styles.perkTitle}>{perk.perk}</div>
                            {perk.description}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
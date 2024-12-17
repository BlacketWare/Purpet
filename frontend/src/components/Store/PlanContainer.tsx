import styles from "./styles.module.css";

const plans = [
    {
        name: "Basic",
        price: "Free",
        subText: "forever",
        details: [
            "10 Auctions at a time",
            "100 Inventory Slots",
            "10% Fee on Auctions"
        ],
        button: "Already Owned"
    },
    {
        name: "Premium",
        price: "$4.99",
        subText: "per month",
        details: [
            "Unlimited Auctions",
            "1000 Inventory Slots",
            "5% Fee on Auctions",
            "Plus Badge & Role",
            "Username Colours",
            "100mb File Uploads",
            "200 Extra daily coins",
            "Exclusive Auctions",
            "Bonus Quests"
        ],
        button: "Purchase"
    },
    {
        name: "Pro",
        price: "$9.99",
        subText: "forever",
        details: [
            "100 Auctions at a time",
            "500 Inventory Slots",
            "7% Fee on Auctions",
            "10mb File Uploads",
            "Discounts on Store Items"
        ],
        button: "Purchase"
    }
];

export default function PlanContainer() {
    return (
        <>
            {plans.map((plan, i) => (
                <div className={styles.plan} key={i}>
                    <div className={styles.planBackgroundContainer}>
                        <div className={`${styles.planBackground} ${styles[`plan${i + 1}`]}`} />
                    </div>
                    <div className={styles.planTop}>{plan.name}</div>
                    <div className={styles.planPrice}>{plan.price}</div>
                    <div className={styles.planSubText}>{plan.subText}</div>
                    {plan.details.map((detail, i) => (
                        <>
                            <div className={styles.planDetail} key={i}>
                                {detail}
                            </div>
                            {i !== plan.details.length - 1 && <div className={styles.planSpacer} />}
                        </>
                    ))}
                    <div className={`${styles.button} ${styles.planButton}`}>
                        <div className={styles.shadow} />
                        <div className={styles.edge} style={{ backgroundColor: "var(--colors-tertiary)" }} />
                        <div className={`${styles.front} ${styles.planButtonInside}`} style={{ backgroundColor: "var(--colors-tertiary)" }}>{plan.button}</div>
                    </div>
                </div>
            ))}
        </>
    );
}
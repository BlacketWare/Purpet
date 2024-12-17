import { Helmet } from "react-helmet";
import PlanContainer from "@components/Store/PlanContainer";
import MiddleWrapper from "@components/Store/MiddleWrapper";
import styles from "./styles.module.css";

export default function Store() {
    return (
        <>
            <Helmet>
                <title>Store | Purpet</title>
                <meta name="description" content="Purchase items in the Purpet Store!" />
            </Helmet>

            <div className="profileBody">
                <div className={styles.header}>Store</div>
                <div className={styles.planContainer}>
                    <PlanContainer />
                </div>
                <div className={styles.middleWrapper}>
                    <MiddleWrapper />
                </div>
            </div>
        </>
    );
}
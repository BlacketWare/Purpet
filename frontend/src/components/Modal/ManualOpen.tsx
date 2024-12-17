import { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.css";

interface ManualOpenProps {
    open: boolean;
    pack: string;
    price: number;
    tooltipContent: JSX.Element;
    onClick: () => void;
    cancelClick: () => void;
}

export default function ManualOpen({ open, pack, price, tooltipContent, onClick, cancelClick }: ManualOpenProps) {
    return (
        <>
            {open && <div className={styles.modal}>
                <form className={styles.container} onSubmit={(e: FormEvent) => { e.preventDefault(); onClick(); }}>
                    <div className={styles.text}>
                        <div>
                            Purchase the {pack} Pack
                            <FontAwesomeIcon icon={faQuestionCircle} className={styles.rateIcon} data-tooltip-id="packRates" />
                            <Tooltip className={styles.blooketTooltip} id="packRates" place="left">
                                <div>Pack Rates:</div>
                                {tooltipContent}
                            </Tooltip> for {price.toLocaleString()} tokens?
                        </div>
                    </div>
                    <div className={styles.holder}>
                        <div className={styles.buttonContainer}>
                            <div className={styles.button} onClick={onClick}>
                                <div className={styles.shadow} />
                                <div className={styles.edge} style={{ backgroundColor: "#590080" }} />
                                <div className={`${styles.front} ${styles.buttonInside}`} style={{ backgroundColor: "#590080" }}>
                                    Yes
                                </div>
                            </div>
                            <div className={styles.button} onClick={() => cancelClick()}>
                                <div className={styles.shadow} />
                                <div className={styles.edge} style={{ backgroundColor: "#590080" }} />
                                <div className={`${styles.front} ${styles.buttonInside}`} style={{ backgroundColor: "#590080" }}>
                                    No
                                </div>
                            </div>
                        </div>
                    </div>
                    <input className={styles.hiddenSubmit} type="submit" />
                </form>
            </div>}
        </>
    );
}
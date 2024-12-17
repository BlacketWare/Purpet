import styles from "./styles.module.css";

export default function Loader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}>
                <div className={styles.loaderShadow}></div>
                <img src="https://cdn.purpet.xyz/global/loaderBlook.svg" draggable="false" className={styles.loaderBlook} />
            </div>
        </div>
    );
}
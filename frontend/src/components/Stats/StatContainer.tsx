import styles from "./styles.module.css";

interface StatContainerProps {
    title: string;
    num: number;
    img: string;
    isToken: boolean;
}

export default function StatContainer({ title, num, img, isToken }: StatContainerProps) {
    return (
        <div className={styles.statContainer}>
            <div className={styles.statTitle}>{title}</div>
            <div className={styles.statNum}>{num}</div>
            <img className={isToken ? styles.tokenImg : styles.statImg} src={img} draggable="false" />
        </div>
    );
}
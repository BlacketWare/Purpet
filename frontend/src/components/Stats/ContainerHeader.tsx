import styles from "./styles.module.css";

interface ContainerHeaderProps {
    title: string;
}

export default function ContainerHeader({ title }: ContainerHeaderProps) {
    return (
        <div className={styles.containerHeader}>
            <div className={styles.containerHeaderInside}>
                {title}
            </div>
        </div>
    );
}
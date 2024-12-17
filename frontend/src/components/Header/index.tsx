import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface HeaderProps {
    rightLink?: {
        text: string;
        to: string | "/";
    }
}

export default function Header({ rightLink }: HeaderProps) {
    return (
        <div className={styles.header}>
            <Link className={styles.purpetText} to="/">Purpet</Link>
            {rightLink && <Link className={styles.headerRight} to={rightLink?.to}>{rightLink?.text}</Link>}
        </div>
    );
}
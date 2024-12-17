import { useAuth } from "@contexts/Auth";
import { useBlooks } from "@contexts/Blook";
import { constructBlook } from "@utils/ConstructUrl";
import styles from "./styles.module.css";
import axios from "axios";

interface BlookCustomizerProps {
    open: boolean;
    onClick: () => void | null;
}

export default function BlookCustomizer({ open, onClick }: BlookCustomizerProps) {
    const { user } = useAuth();
    const { allBlooks: blooks } = useBlooks();

    if (!user) return null;
    if (!blooks) return null;

    const setToAvatar = (blook: string) => axios.post("/users/me/changeavatar", { blook: parseInt(blook) }).then(() => {
            // user.avatar = blooks[blook].image;
            user.avatar.id = blook;
            onClick();
        }).catch(() => onClick());
    
    return (
        <>
            {open && <div className={styles.modal}>
                <div className={styles.modalButton} role="button" tabIndex={0} onClick={onClick} />
                <div className={styles.blookCustomizer}>
                    <div className={styles.blooksHolder}>
                        {Object.keys(user.blooks).length > 0 && Object.keys(user.blooks).map((blook: any, i: number) => {
                            console.log(blook);

                            return (
                                <div className={styles.blookHolder} role="button" tabIndex={0} onClick={() => setToAvatar(blook)} key={i}>
                                    <div className={styles.blookContainer}>
                                        <img className={styles.blook} src={constructBlook(blook)} draggable="false" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>}
        </>
    );
}

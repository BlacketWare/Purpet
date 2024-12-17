import { Helmet } from "react-helmet";
import { useState } from "react";
import { useAuth } from "@contexts/Auth";
import { useBlooks } from "@contexts/Blook";
import { usePacks } from "@contexts/Pack";
import { constructBlook, constructBackground } from "@utils/ConstructUrl";
import { useRarities } from "@contexts/Rarity";
import { Textfit } from "react-textfit";
import { colour } from "@utils/Colour";
import WithPacks from "@components/Blooks/WithPacks";
import WithoutPacks from "@components/Blooks/WithoutPacks";
import styles from "./style.module.css";

interface Blook {
    id: number;
}

// interface Pack {
//     id: string;
//     backgroundId: string;
// }

export default function Blooks() {
    const { user } = useAuth();
    const { allBlooks: blooks } = useBlooks();
    const { packs } = usePacks();
    const { rarities } = useRarities();

    if (!user) return null;
    if (!blooks.length) return null;
    if (!packs) return null;
    if (!rarities) return null;

    const [rightBlook, setRightBlook] = useState(blooks.find((blook: Blook) => blook.id === user.avatar.id));
    const [packsShowing, setPacksShowing] = useState(true);
    const [mLeftShowing, setMLeftShowing] = useState(false);

    return (
        <>
            <Helmet>
                <title>Blooks | Purpet</title>
                <meta name="description" content="Manage and sell your blooks!"></meta>
            </Helmet>

            <div className="profileBody">
                <div className={styles.topButtonRow}>
                    <div className={styles.settingButton} role="button" tabIndex={0} onClick={() => setPacksShowing(!packsShowing)}>{packsShowing ? "Hide" : "Show"} Packs</div>
                </div>

                <div className={`${styles.left} ${mLeftShowing ? styles.mShowLeft : ""}`}>
                    {packsShowing ? <WithPacks styles={styles} setRightBlook={setRightBlook} setMLeftShowing={setMLeftShowing} /> : <WithoutPacks styles={styles} setRightBlook={setRightBlook} setMLeftShowing={setMLeftShowing} />}
                </div>

                <div className={`${styles.button} ${styles.mBlooksButton}`} role="button" tabIndex={0} onClick={() => { setMLeftShowing(!mLeftShowing); setPacksShowing(false); }}>
                    <div className={styles.shadow} />
                    <div className={styles.edge} />
                    <div className={styles.front}>
                        <div className={styles.mBlooksButtonInside}>
                            Change Blook
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <img className={styles.rightBackground} src={constructBackground(rightBlook.packId)} draggable="false" />
                    <div className={styles.rightTopText}>
                        <Textfit className={styles.highlightedName} min={1} max={40} mode="single">
                            {rightBlook.name}
                        </Textfit>
                        <div className={styles.highlightedRarity} style={{ color: `#${colour(rarities.find((rarity: any) => rarity.id === rightBlook.rarityId)?.colourId)}` }}>
                            {rarities.find((rarity: any) => rarity.id === rightBlook.rarityId)?.name}
                        </div>
                    </div>
                    <div className={`${styles.blookContainer} ${styles.rightBlook}`}>
                        <img className={styles.blook} src={constructBlook(rightBlook.id)} draggable="false" />
                    </div>
                    <div className={styles.highlightedBottom}>{Object.keys(user.blooks).length > 0 ? user.blooks[rightBlook.id].toLocaleString() : 0} Owned</div>
                    <div className={styles.rightBottom} />
                </div>

                <div className={styles.rightButtonRow}>
                    <div className={`${styles.button} ${styles.rightButton}`} role="button" tabIndex={0}>
                        <div className={styles.shadow} />
                        <div className={styles.edge} />
                        <div className={styles.front}>
                            <div className={styles.rightButtonInside}>
                                <img className={styles.rightButtonImg} src="https://cdn.purpet.xyz/market/token.svg" draggable="false" />
                                Sell
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
import { usePacks } from "@contexts/Pack";
import { useBlooks } from "@contexts/Blook";
import { constructBlook } from "@utils/ConstructUrl";
import { colour } from "@utils/Colour";
import { useAuth } from "@contexts/Auth";
import { useRarities } from "@contexts/Rarity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

interface WithPacksProps {
    styles: any;
    setRightBlook: any;
    setMLeftShowing: any;
}

interface Pack {
    id: string;
    name: string;
    description: string | null;
    price: number;
    hidden: boolean;
    assetId: string;
    innerColourId: number;
    outerColourId: number;
    blooks: string[];
    asset: {
        id: string;
        path: string;
    }
}

export default function WithPacks({ styles, setRightBlook, setMLeftShowing }: WithPacksProps) {
    const { user } = useAuth();
    const { packs } = usePacks();
    const { allBlooks } = useBlooks();
    const { rarities } = useRarities();

    if (!user) return null;
    if (!packs) return null;
    if (!allBlooks) return null;
    if (!rarities) return null;

    return (
        <>
            <div className={styles.soloBlooksHolder}>
                {packs.filter((pack: Pack) => !pack.hidden).sort((a: Pack, b: Pack) => a.name.localeCompare(b.name)).map((pack: Pack, i: number) => {
                    return pack.blooks.map((blook: any, j: number) => <div className={styles.blookContainerHolder} key={i} role="button" tabIndex={0}>
                        {user.blooks[blook.id] > 0 ? (
                            <>
                                <div className={`${styles.blookContainerInside} ${styles.blookInside}`} onClick={() => { setRightBlook(allBlooks.find((blook: any) => blook === blook)); setMLeftShowing(false); }} key={j}>
                                    <img className={styles.blook} src={constructBlook(blook.id)} draggable="false" />
                                </div>
                                <div className={styles.blookText} style={{ backgroundColor: `#${colour(rarities.find((rarity: any) => rarity.id === allBlooks.find((blook: any) => blook.id === blook.id)?.rarityId)?.colourId)}` }}>
                                    {user.blooks[blook.id] ? user.blooks[blook.id].toLocaleString() : 0}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`${styles.blookContainerInside} ${styles.blookInside} ${styles.lockedBlook}`} key={j}>
                                    <img className={styles.blook} src={constructBlook(blook.id)} draggable="false" />
                                </div>
                                <FontAwesomeIcon className={styles.blookLock} icon={faLock} style={{ cursor: "default" }} />
                            </>
                        )}
                    </div>);
                })}
            </div>
        </>
    );
}
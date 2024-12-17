import { Textfit } from "react-textfit";
import { useBlooks } from "@contexts/Blook";
import { usePacks } from "@contexts/Pack";
import { useRarities } from "@contexts/Rarity";
import { constructBlook, constructPack, constructBackground } from "@utils/ConstructUrl";
import { colour } from "@utils/Colour";
import styles from "./styles.module.css";

interface PackOpenerProps {
    pack: string;
    unlockedBlook: string;
    isNew: boolean;
    opening: boolean;
    canOpen: boolean;
    handleBigClick: () => void;
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

interface Blook {
    id: string;
    packId: string;
    name: string;
    description: string | null;
    chance: number;
    assetId: string;
    rarityId: string;
    asset: {
        id: string;
        path: string;
    }
}

interface Rarity {
    id: string;
    name: string;
    colourId: number;
}

export default function PackOpener({ pack, unlockedBlook, isNew, opening, canOpen, handleBigClick }: PackOpenerProps) {
    const { allBlooks } = useBlooks();
    const { rarities } = useRarities();
    const { packs: marketPacks } = usePacks();

    if (!marketPacks) return null;
    if (!allBlooks) return null;
    if (!rarities) return null;

    const packData: Pack = marketPacks.find((p: Pack) => p.id === pack);
    const blookIds = packData.blooks.map((e: any) => e.id);
    const packBlooks = allBlooks.filter((blook: Blook) => blookIds.includes(blook.id));
    const totalChance = packBlooks.reduce((acc: number, blook: Blook) => acc + blook.chance, 0);

    const unlockedBlookChance = packBlooks.find((blook: Blook) => blook.id === unlockedBlook).chance;
    const unlockedBlookRealChance = (unlockedBlookChance / totalChance) * 100;

    return (
        <div className={styles.openBackground} style={{ background: `radial-gradient(circle, #${colour(packData.innerColourId)} 0%, #${colour(packData.outerColourId)} 100%)` }}>
            <div className={`${styles.openContainer} ${opening ? styles[`openingContainer${rarities.find((rarity: Rarity) => rarity.id === allBlooks.find((blook: Blook) => blook.id === unlockedBlook).rarityId).name}`] : ""}`}>
                <img src={constructBackground(pack)} className={styles.blookBackground} draggable="false" />

                <div className={`${styles.blookContainer} ${styles.unlockedBlookImage}`}>
                    <img src={constructBlook(unlockedBlook)} className={styles.blook} draggable="false" alt="Blook" />
                </div>
                <div className={styles.unlockedText}>
                    <Textfit mode="single" min={1} max={40} throttle={50} className={styles.unlockedBlook}>
                        <span style={{ fontFamily: "Titan One" }}>{allBlooks.find((blook: Blook) => blook.id === unlockedBlook).name}</span>
                    </Textfit>
                    <div className={styles.rarityText} style={{ color: colour(rarities.find((rarity: Rarity) => rarity.id === allBlooks.find((blook: Blook) => blook.id === unlockedBlook).rarityId).colourId) }}>
                        <span style={{ fontFamily: "Titan One" }}>{rarities.find((rarity: Rarity) => rarity.id === allBlooks.find((blook: Blook) => blook.id === unlockedBlook).rarityId).name}</span>
                    </div>
                </div>
                <div className={styles.bottomText}>{unlockedBlookRealChance.toPrecision(3)}% {isNew ? "- NEW!" : ""}</div>
                <div className={styles.bottomShadow} />
            </div>
            <div className={`${styles.openPackContainer} ${opening ? styles.openingPackContainer : ""}`} role="button" tabIndex={0}>
                <div className={`${styles.openPackTop} ${opening ? styles.isOpeningPackTop : ""}`} style={{ backgroundImage: "url(https://cdn.purpet.xyz/market/packSeal.svg)" }} />
                <img src={constructPack(pack)} className={`${styles.openPack} ${opening ? styles.isOpeningPack : ""}`} alt={pack} draggable="false" />
            </div>
            <div className={`${styles.openBigButton} ${canOpen ? styles.canOpen : ""}`} role="button" tabIndex={0} onClick={() => handleBigClick()} />
        </div>
    );
}
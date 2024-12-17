import { Helmet } from "react-helmet";
import { useAuth } from "@contexts/Auth";
import { usePacks } from "@contexts/Pack";
import { useBlooks } from "@contexts/Blook";
import { useRarities } from "@contexts/Rarity";
import { useEffect, useState, useRef, RefObject } from "react";
import { Game, Scale, WEBGL } from "phaser";
import { constructPack } from "@utils/ConstructUrl";
import { colour } from "@utils/Colour";
import axios, { AxiosResponse } from "axios";
import Particles from "@utils/Particles.js";
import PackOpener from "@components/Market/PackOpener";
import ManualOpen from "@components/Modal/ManualOpen";
import Sidebar from "@components/Sidebar";
import styles from "./styles.module.css";

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

type ParticlesScene = Phaser.Scene & {
    initParticles: () => void;
    game: Game;
}

interface Config {
    type: number;
    parent: string | HTMLDivElement | null;
    width: string;
    height: string;
    transparent: boolean;
    scale: { mode: number; autoCenter: number };
    physics: { default: string };
    scene: ParticlesScene;
}

interface GameState {
    type: number;
    parent: string;
    width: string;
    height: string;
    transparent: boolean;
    scale: { mode: number; autoCenter: number; };
    physics: { default: string; };
    scene: ParticlesScene;
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

const useGame = (config: Config, containerRef: RefObject<HTMLDivElement>) => {
    const [game, setGame] = useState<Game | null>(null);
    const oldConfig = useRef<Config | null>(null);

    useEffect(() => {
        if ((!game && containerRef.current) || config !== oldConfig.current) {
            if (!containerRef.current) return;
            oldConfig.current = config;
            const newGame = new Game({ ...config, parent: containerRef.current });
            config.scene.game = newGame;
            config.scene.initParticles();
            setGame(newGame);
        }
        return () => {
            game?.destroy(true);
        };
    }, [config, containerRef, game]);

    return game;
};

export default function Market() {
    const { user, setUser } = useAuth();
    const { allBlooks } = useBlooks();
    const { rarities } = useRarities();
    const { packs: marketPacks } = usePacks();

    if (!marketPacks) return null;
    if (!allBlooks) return null;
    if (!rarities) return null;

    const [tokens, setTokens] = useState<number>(0);
    const [instantOpen, setInstantOpen] = useState<boolean>(localStorage.getItem("instantOpen") === "true" ? true : false);
    const [currentPack, setCurrentPack] = useState<string>("Debug");
    const [currentBlooks, setCurrentBlooks] = useState<string[]>([]);
    const [openPack, setOpenPack] = useState<boolean>(false);
    const [canOpen, setCanOpen] = useState<boolean>(false);
    const [doneOpening, setDoneOpening] = useState<boolean>(false);
    const [opening, setOpening] = useState<boolean>(false);
    const [unlockedBlook, setUnlockedBlook] = useState<string>("");
    const [isNew, setIsNew] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(false);
    const [showingModal, setShowingModal] = useState<boolean>(false);
    const [game, setGame] = useState<GameState>({
        type: WEBGL,
        parent: "phaser-market",
        width: "100%",
        height: "100%",
        transparent: true,
        scale: { mode: Scale.NONE, autoCenter: Scale.CENTER_BOTH },
        physics: { default: "arcade" },
        scene: {
            game: {} as Game,
            initParticles: () => { },
        } as ParticlesScene,
    });
    const gameRef = useRef<HTMLDivElement | null>(null);
    useGame(game, gameRef);
    useEffect(() => setTokens(user.tokens), [user.tokens]);
    const setInstantOpenLocal = (instantOpen: boolean) => {
        localStorage.setItem("instantOpen", instantOpen.toString());
        setInstantOpen(instantOpen);
    };

    const purchasePack = async (pack: string) => {
        setCurrentPack(pack);
        setCurrentBlooks(marketPacks.find((p: Pack) => p.id === pack)?.blooks || []);

        if (instantOpen) {
            await axios.post("/game/openPack", { pack }).then((response: AxiosResponse) => {
                setUnlockedBlook(response.data.id);
                setIsNew(response.data.isNew ?? false);
                setTokens(user.tokens - marketPacks.find((p: Pack) => p.id === pack)?.price);
                setUser({
                    ...user, tokens: user.tokens - marketPacks.find((p: Pack) => p.id === pack)?.price,
                    blooks: { ...user.blooks, [response.data.id]: user.blooks[response.data.id] ? user.blooks[response.data.id] + 1 : 1 },
                    stats: { ...user.stats, packs: user.stats.packs += 1 }
                });

                setGame({
                    type: WEBGL, parent: "phaser-market", width: "100%", height: "100%", transparent: true,
                    scale: { mode: Scale.NONE, autoCenter: Scale.CENTER_BOTH },
                    physics: { default: "arcade" },
                    scene: new Particles("Uncommon")
                });
                setOpenPack(true);
                setCanOpen(true);
                setDoneOpening(false);
                setOpening(false);
            });
        } else setShowingModal(true);
    };

    const purchaseManually = async (pack: string) => {
        await axios.post("/game/openPack", { pack }).then((response: AxiosResponse) => {
            setUnlockedBlook(response.data.id);
            setIsNew(response.data.isNew ?? false);
            setTokens(user.tokens - marketPacks.find((p: Pack) => p.id === pack)?.price);
            setUser({
                ...user, tokens: user.tokens - marketPacks.find((p: Pack) => p.id === pack)?.price,
                blooks: { ...user.blooks, [response.data.id]: user.blooks[response.data.id] ? user.blooks[response.data.id] + 1 : 1 },
                stats: { ...user.stats, packs: user.stats.packs += 1 }
            });
            setGame({
                type: WEBGL, parent: "phaser-market", width: "100%", height: "100%", transparent: true,
                scale: { mode: Scale.NONE, autoCenter: Scale.CENTER_BOTH },
                physics: { default: "arcade" },
                scene: new Particles("Uncommon")
            });
            setOpenPack(true);
            setCanOpen(true);
            setDoneOpening(false);
            setOpening(false);
        });
    };

    const handleBigClick = async () => {
        if (!opening && canOpen && !waiting) {
            startOpening();
            setWaiting(true);
            setTimeout(() => {
                setWaiting(false);
            }, 750);
            await new Promise(r => setTimeout(r, 500));
            game.scene.game.events.emit("start-particles", rarities.find((r: any) => r.id === allBlooks.find((b: any) => b.id === unlockedBlook)?.rarityId)?.name || "");
        } else if (doneOpening) {
            setDoneOpening(false);
            setOpenPack(false);
            setCanOpen(false);
            setOpening(false);
            setUnlockedBlook("");
            setIsNew(false);
        } else if (opening && !waiting) setDoneOpening(true);
    };

    const startOpening = () => setOpening(true);

    return (
        <>
            <Helmet>
                <title>Market | Purpet</title>
                <meta name="description" content="Unlock new blooks and customize your profile with the Purpet market!" />
            </Helmet>

            <Sidebar additionalRow={<div className={styles.tokenBalance}>
                <img className={styles.tokenBalanceIcon} src="https://cdn.purpet.xyz/market/token.svg" draggable="false" />
                {tokens.toLocaleString()}
            </div>} />

            <div className="profileBody">
                <div className={styles.header}>Market</div>
                <div className={styles.mTokenBalance}>
                    <img className={styles.tokenBalanceIcon} src="https://cdn.purpet.xyz/market/token.svg" draggable="false" />
                    {tokens.toLocaleString()}
                </div>

                <div className={styles.flex}>
                    <div className={styles.mInstantButton} role="button" tabIndex={0} onClick={() => setInstantOpenLocal(!instantOpen)}>
                        Instant Open: {instantOpen ? "On" : "Off"}
                    </div>
                </div>

                <div className={styles.storeContainer}>
                    <img className={styles.cashierBlook} src="https://cdn.purpet.xyz/market/cashier.svg" draggable="false" />
                    <img className={styles.storeImg} src="https://cdn.purpet.xyz/market/store.svg" draggable="false" />
                    <div className={styles.instantButton} role="button" tabIndex={0} onClick={() => setInstantOpenLocal(!instantOpen)}>
                        Instant Open: {instantOpen ? "On" : "Off"}
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div className={styles.packsWrapper}>
                        {Object.values(marketPacks).sort((a: any, b: any) => a.price - b.price || a.name.localeCompare(b.name)).reverse().filter((pack: any) => !pack.hidden).map((pack: any, i) => (
                            <div className={styles.packContainer} key={i} style={{ background: `radial-gradient(circle, #${colour(pack.innerColourId)} 0%, #${colour(pack.outerColourId)} 100%)` }} onClick={() => purchasePack(pack.id)}>
                                <div className={styles.packImgContainer}>
                                    <img className={styles.packShadow} src={constructPack(pack.id)} draggable="false" />
                                    <img className={styles.packImg} src={constructPack(pack.id)} draggable="false" />
                                </div>
                                <div className={styles.packBottom}>
                                    <img className={styles.packPriceImg} src="https://cdn.purpet.xyz/market/token.svg" draggable="false" />
                                    {pack.price.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.subheader}>Weekly Shop</div>
                    <div className={styles.weeklyWrapper}>

                    </div>
                </div>
            </div>

            {showingModal && <ManualOpen
                open={showingModal}
                pack={marketPacks.find((p: Pack) => p.id === currentPack)?.name || ""}
                price={marketPacks.find((p: Pack) => p.id === currentPack)?.price || 0}
                tooltipContent={currentBlooks.map((b: any, i: number) => <div key={i}>{allBlooks.find((blook: Blook) => blook.id === b.id)?.name}: {allBlooks.find((blook: Blook) => blook.id === b.id)?.chance.toString()}%</div>)}
                onClick={() => {
                    setShowingModal(false);
                    purchaseManually(currentPack);
                }}
                cancelClick={() => setShowingModal(false)}
            />}

            {openPack && <PackOpener pack={marketPacks.find((p: Pack) => p.id === currentPack)?.id || ""} unlockedBlook={unlockedBlook} isNew={isNew} opening={opening} canOpen={canOpen} handleBigClick={handleBigClick} />}
        </>
    );
}

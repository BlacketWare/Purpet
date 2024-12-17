import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@contexts/Auth";
import { useBlooks } from "@contexts/Blook";
import { constructBlook, constructBanner } from "@utils/ConstructUrl";
import { faUser, faStore, faSuitcase, faMoneyBill, faReply } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosResponse } from "axios";
import Modal from "@components/Modal";
import BlookCustomizer from "@components/Modal/BlookCustomizer";
import BannerCustomizer from "@components/Modal/BannerCustomizer";
import StatContainer from "@components/Stats/StatContainer";
import ContainerHeader from "@components/Stats/ContainerHeader";
import HeaderButton from "@components/Stats/HeaderButton";
import styles from "./styles.module.css";

interface User {
    // username?: string;
    // role?: string;
    // avatar?: string;
    // banner?: string;
    // tokens?: number;
    // blooks?: any;
    // stats?: any;
    // color?: string;
    id?: string;
    username?: string;
    avatar?: {
        id: string;
    };
    banner?: {
        id: string;
    };
    tokens?: number;
    blooks?: any;
    group?: {
        name: string;
    };
    stats?: {
        packs: number;
        messages: number;
    };
    lastDailyTokenClaim?: number;
}

interface ModalConfig {
    open: boolean;
    title: string;
    inputs: any[];
    buttons: any[];
}

export default function Stats() {
    const { user, setUser } = useAuth();
    const { allBlooks } = useBlooks();

    if (!allBlooks) return null;

    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<User>({});
    const [blookCustomizer, setBlookCustomizer] = useState<boolean>(false);
    const [bannerCustomizer, setBannerCustomizer] = useState<boolean>(false);
    const [modalLoading, setModalLoading] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        open: false,
        title: "",
        inputs: [],
        buttons: []
    });

    useEffect(() => {
        if (new URLSearchParams(window.location.search).get("name")) {
            axios.get(`/users/${new URLSearchParams(window.location.search).get("name")}`).then((response: AxiosResponse) => {
                setUserInfo(response.data);
                setLoading(false);
            }).catch(() => {
                setUserInfo(user);
                setLoading(false);
            });
        } else {
            setUserInfo(user);
            setLoading(false);
        }
    }, [user]);

    const viewUser = (username: string) => {
        navigate(`/stats?name=${username}`);
        setModalLoading(true);

        axios.get(`/users/${username}`).then((response: AxiosResponse) => {
            setUserInfo(response.data);
            setLoading(false);
            setModalConfig({
                open: false,
                title: "",
                inputs: [],
                buttons: []
            });
            setModalLoading(false);
        }).catch(() => {
            navigate("/stats");
            setUserInfo(user);
            setLoading(false);
            setModalLoading(false);
            setModalConfig({
                open: true,
                title: "Error",
                inputs: [],
                buttons: [
                    { text: "Close", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }
                ]
            });
        });
    };

    return (
        <>
            {!loading && <>
                <Helmet>
                    <title>{userInfo.username} | Purpet</title>
                    <meta name="description" content={`View ${userInfo.username}'s stats.`} />
                </Helmet>

                <div className="profileBody">
                    <div className={styles.fullContainer}>
                        <div className={styles.headerRow}>
                            <div className={styles.headerLeft}>
                                <div className={styles.headerLeftRow}>
                                    <div className={styles.headerBlookContainer}
                                        style={{ cursor: new URLSearchParams(window.location.search).get("name") ? "default" : "pointer" }}
                                        role={new URLSearchParams(window.location.search).get("name") ? "none" : "button"}
                                        tabIndex={new URLSearchParams(window.location.search).get("name") ? -1 : 0}
                                        onClick={() => new URLSearchParams(window.location.search).get("name") ? null : setBlookCustomizer(true)}
                                    >
                                        <div className={`${styles.blookContainer} ${styles.headerBlook}`}>
                                            <img className={styles.blook} src={constructBlook(userInfo.avatar?.id)} draggable="false" />
                                        </div>
                                    </div>
                                    <div className={styles.headerInfo}>
                                        <div className={styles.headerBanner}
                                            style={{ cursor: new URLSearchParams(window.location.search).get("name") ? "default" : "pointer" }}
                                            role={new URLSearchParams(window.location.search).get("name") ? "none" : "button"}
                                            tabIndex={new URLSearchParams(window.location.search).get("name") ? -1 : 0}
                                            onClick={() => new URLSearchParams(window.location.search).get("name") ? null : setBannerCustomizer(true)}
                                        >
                                            <img className={styles.headerBg} src={constructBanner(userInfo.banner?.id)} draggable="false" />
                                            <div className={styles.headerName}>{userInfo.username}</div>
                                            <div className={styles.headerRole}>{userInfo.group?.name}</div>
                                        </div>
                                        <div className={styles.levelBarContainer}>
                                            <div className={styles.levelBar}>
                                                <div className={styles.levelBarInside} style={{ transform: "scaleX(0)" }} />
                                            </div>
                                            <div className={styles.levelStarContainer}>
                                                <img className={styles.levelStar} src="https://cdn.purpet.xyz/stats/levelStar.svg" draggable="false" />
                                                <div className={styles.levelStarText}>0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.headerLeftButtons}>
                                    <HeaderButton text="View User" icon={faUser} color="#9a49aa" onClick={() => setModalConfig({
                                        open: true,
                                        title: "View User",
                                        inputs: [
                                            { type: "text", placeholder: "Username", ref: usernameRef, maxLength: 16 }
                                        ],
                                        buttons: [
                                            { text: "View", color: "#590080", onClick: () => viewUser(usernameRef.current?.value || "") },
                                            { text: "Cancel", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }
                                        ]
                                    })} />
                                    {new URLSearchParams(window.location.search).get("name") ? <>
                                        <HeaderButton text="Back" icon={faReply} color="#eb6234" onClick={() => { navigate("/stats"); setUserInfo(user); }} />
                                    </> : <>
                                        <HeaderButton text="Unlock Blooks" icon={faStore} color="#ffa31e" onClick={() => navigate("/market")} />
                                        <HeaderButton text="Manage Blooks" icon={faSuitcase} color="#1e92ff" onClick={() => navigate("/blooks")} />
                                        {new Date(user.lastDailyTokenClaim).getTime() < new Date().setUTCHours(0, 0, 0, 0) && <HeaderButton text="Claim Tokens" icon={faMoneyBill} color="#00c20c" onClick={() => axios.post("/game/claimdailytokens").then((res: AxiosResponse) => setUser({ ...user, tokens: user.tokens + parseInt(res.data), lastDailyTokenClaim: Date.now() }))} />}
                                    </>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottomContainer}>
                            <div className={styles.left}>
                                <div className={styles.statsContainer}>
                                    <ContainerHeader title="Stats" />
                                    <div className={styles.statsWrapper}>
                                        <StatContainer title="Tokens" num={userInfo.tokens?.toLocaleString()} img="https://cdn.purpet.xyz/market/token.svg" isToken={true} />
                                        <StatContainer title="Unlocked Blooks" num={`${Object.values(userInfo.blooks).filter((blook: any) => blook).length} / ${Object.keys(allBlooks).length}`} img="https://cdn.purpet.xyz/stats/unlockIcon.svg" isToken={false} />
                                        <StatContainer title="Packs Opened" num={userInfo.stats?.packs.toLocaleString()} img="https://cdn.purpet.xyz/stats/packIcon.svg" isToken={false} />
                                        <StatContainer title="Messages Sent" num={userInfo.stats?.messages.toLocaleString()} img="https://cdn.purpet.xyz/stats/messageIcon.svg" isToken={false} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.right}>
                                <div className={`${styles.friendsContainer} ${styles.noFriendsContainer}`}>
                                    <ContainerHeader title="Friends" />

                                    {new URLSearchParams(window.location.search).get("name") ? <>
                                        {/* <div className={styles.friendContainer} /> */}
                                        <div className={styles.noFriends}>You currently have no mutuals.</div>
                                    </> : <>
                                        <div className={styles.friendContainer}>
                                            <img className={styles.headerBg} src="https://cdn.purpet.xyz/banners/outerSpace.svg" />
                                            <div className={`${styles.blookContainer} ${styles.friendBlook}`}>
                                                <img className={styles.blook} src={constructBlook("3")} draggable="false" />
                                            </div>
                                            <div className={styles.userInfo}>
                                                <div className={styles.friendName}>monkxy</div>
                                                <div>Owner</div>
                                            </div>
                                        </div>
                                        {/* <div className={styles.noFriends}>You currently have no friends.</div> */}
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal open={modalConfig.open} loading={modalLoading} title={modalConfig.title} inputs={modalConfig.inputs} buttons={modalConfig.buttons} />
                <BlookCustomizer open={blookCustomizer} onClick={() => setBlookCustomizer(false)} />
                <BannerCustomizer open={bannerCustomizer} onClick={() => setBannerCustomizer(false)} />
            </>}
        </>
    );
}

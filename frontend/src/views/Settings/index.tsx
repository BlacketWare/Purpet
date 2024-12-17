import { Helmet } from "react-helmet";
import { useState, useRef } from "react";
import { useAuth } from "@contexts/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboard, faPencil, faComments } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import Modal from "@components/Modal";
import styles from "./styles.module.css";

interface ModalConfig {
    open: boolean;
    title: string;
    inputs: any[];
    buttons: any[];
}

export default function Settings() {
    const { user, logout } = useAuth();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const [modalLoading, setModalLoading] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        open: false,
        title: "",
        inputs: [],
        buttons: []
    });

    return (
        <>
            <Helmet>
                <title>Settings | Purpet</title>
                <meta name="description" content="Manage your account settings." />
            </Helmet>

            <div className="profileBody">
                <div className={styles.header}>Settings</div>
                <div className={styles.mainContainer}>
                    <div className={styles.infoContainer}>
                        <div className={styles.headerRow}>
                            <div className={styles.headerIcon}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={styles.infoHeader}>Profile</div>
                        </div>
                        <div className={styles.text}>
                            <b>Username:</b> <span style={{ color: user.color }}>{user.username}</span>
                        </div>
                        <div className={styles.text}>
                            <b>Role:</b> {user.group.name}
                        </div>
                        <div className={styles.text}>
                            <b>Joined:</b> {new Date(user.createdAt).toLocaleString()}
                        </div>
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.headerRow}>
                            <div className={styles.headerIcon}>
                                <FontAwesomeIcon icon={faClipboard} />
                            </div>
                            <div className={styles.infoHeader}>Plan</div>
                        </div>
                        <div className={styles.subscriptionText}>
                            <div className={styles.purpetText}>Purpet</div>
                            <div className={styles.planText}>Basic</div>
                        </div>
                        {/* <div className={`${styles.button} ${styles.upgradeButton}`}>
                            <div className={styles.shadow} />
                            <div className={styles.edge} style={{ backgroundColor: "#ff7b24" }} />
                            <div className={`${styles.front} ${styles.upgradeButtonInside}`} style={{ backgroundColor: "#ff7b24" }}>
                                Upgrade Now!
                            </div>
                        </div> */}
                        {user.username === "monkxy" ? <a className={`${styles.button} ${styles.upgradeButton}`} href={`https://api.purpet.xyz/api/discord/link?token=${localStorage.getItem("token")}`} target="_blank" rel="noopener noreferrer">
                            <div className={styles.shadow} />
                            <div className={styles.edge} style={{ backgroundColor: "#ff7b24" }} />
                            <div className={`${styles.front} ${styles.upgradeButtonInside}`} style={{ backgroundColor: "#ff7b24" }}>
                                Discord Link
                            </div>
                        </a> : <div className={`${styles.button} ${styles.upgradeButton}`}>
                            <div className={styles.shadow} />
                            <div className={styles.edge} style={{ backgroundColor: "#ff7b24" }} />
                            <div className={`${styles.front} ${styles.upgradeButtonInside}`} style={{ backgroundColor: "#ff7b24" }}>
                                Upgrade Now!
                            </div>
                        </div>}
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.headerRow}>
                            <div className={styles.headerIcon}>
                                <FontAwesomeIcon icon={faPencil} />
                            </div>
                            <div className={styles.infoHeader}>Edit Info</div>
                        </div>
                        <div>
                            <div className={styles.link} onClick={() => setModalConfig({
                                open: true,
                                title: "Change Username",
                                inputs: [
                                    { placeholder: "New Username", type: "text", value: "", ref: usernameRef, maxLength: 20, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") },
                                    { placeholder: "Password", type: "password", value: "", ref: passwordRef, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") }
                                ],
                                buttons: [
                                    { text: "Change", color: "#590080", onClick: () => { axios.patch("/auth/changeusername", { username: usernameRef.current?.value, password: passwordRef.current?.value }).then(() => { setModalConfig({ open: false, title: "", inputs: [], buttons: [] }); setModalLoading(false); logout(); }).catch(() => { setModalConfig({ open: true, title: "Error", inputs: [], buttons: [{ text: "Close", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }] }); setModalLoading(false); }); } },
                                    { text: "Cancel", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }
                                ]
                            })}>Change Username</div>
                        </div>
                        <div>
                            {/* {user.hasPassword ? <div className={styles.link} onClick={() => setModalConfig({
                                open: true,
                                title: "Change Password",
                                inputs: [
                                    { placeholder: "Old Password", type: "password", value: "", ref: passwordRef, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") },
                                    { placeholder: "New Password", type: "password", value: "", ref: newPasswordRef, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") }
                                ],
                                buttons: [
                                    { text: "Change", color: "#590080", onClick: () => { axios.put("/api/user/password/change", { oldPassword: passwordRef.current?.value, newPassword: newPasswordRef.current?.value }).then(() => { setModalConfig({ open: false, title: "", inputs: [], buttons: [] }); setModalLoading(false); logout(); }).catch(() => { setModalConfig({ open: true, title: "Error", inputs: [], buttons: [{ text: "Close", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }] }); setModalLoading(false); }); } },
                                    { text: "Cancel", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }
                                ]
                            })}>Change Password</div> : <div className={styles.link} onClick={() => setModalConfig({
                                open: true,
                                title: "Add Password",
                                inputs: [
                                    { placeholder: "Password", type: "password", value: "", ref: passwordRef, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") }
                                ],
                                buttons: [
                                    { text: "Add", color: "#590080", onClick: () => { axios.put("/api/user/password/new", { password: passwordRef.current?.value }).then(() => { setModalConfig({ open: false, title: "", inputs: [], buttons: [] }); setModalLoading(false); logout(); }).catch(() => { setModalConfig({ open: true, title: "Error", inputs: [], buttons: [{ text: "Close", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }] }); setModalLoading(false); }); } },
                                    { text: "Cancel", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }
                                ]
                            })}>Add Password</div>} */}
                            <div className={styles.link} onClick={() => setModalConfig({
                                open: true,
                                title: "Change Password",
                                inputs: [
                                    { placeholder: "Old Password", type: "password", value: "", ref: passwordRef, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") },
                                    { placeholder: "New Password", type: "password", value: "", ref: newPasswordRef, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") }
                                ],
                                buttons: [
                                    { text: "Change", color: "#590080", onClick: () => { axios.patch("/auth/changepassword", { oldPassword: passwordRef.current?.value, newPassword: newPasswordRef.current?.value }).then(() => { setModalConfig({ open: false, title: "", inputs: [], buttons: [] }); setModalLoading(false); logout(); }).catch(() => { setModalConfig({ open: true, title: "Error", inputs: [], buttons: [{ text: "Close", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }] }); setModalLoading(false); }); } },
                                    { text: "Cancel", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }
                                ]
                            })}>Change Password</div>
                        </div>
                        <div>
                            <div className={styles.link} onClick={() => setModalConfig({
                                open: true,
                                title: "Delete Account",
                                inputs: [
                                    { placeholder: "Password", type: "password", value: "", ref: passwordRef, onChange: (e: any) => e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "") }
                                ],
                                buttons: [
                                    { text: "Delete", color: "#590080", onClick: () => { axios.post("/auth/deleteaccount", { data: { password: passwordRef.current?.value } }).then(() => { setModalConfig({ open: false, title: "", inputs: [], buttons: [] }); setModalLoading(false); logout(); }).catch(() => { setModalConfig({ open: true, title: "Error", inputs: [], buttons: [{ text: "Close", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }] }); setModalLoading(false); }); } },
                                    { text: "Cancel", color: "#590080", onClick: () => setModalConfig({ open: false, title: "", inputs: [], buttons: [] }) }
                                ]
                            })}>Permenantly Delete Account</div>
                        </div>
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.headerRow}>
                            <div className={styles.headerIcon}>
                                <FontAwesomeIcon icon={faComments} />
                            </div>
                            <div className={styles.infoHeader}>Social</div>
                        </div>
                        <div>
                            <a className={styles.link} href="https://discord.gg/3YzJYz9Z2K" target="_blank" rel="noopener noreferrer">
                                <div className={styles.socialIcon}>
                                    <FontAwesomeIcon icon={faDiscord} />
                                </div>
                                Discord
                            </a>
                        </div>
                        <div>
                            <a className={styles.link} href="https://twitter.com/PlayPurpet" target="_blank" rel="noopener noreferrer">
                                <div className={styles.socialIcon}>
                                    <FontAwesomeIcon icon={faXTwitter} />
                                </div>
                                Twitter (@PlayPurpet)
                            </a>
                        </div>
                        <div>
                            <a className={styles.link} href="https://www.youtube.com/channel/UC5CvQCtv7bxN6_NL6YQ0Vmg" target="_blank" rel="noopener noreferrer">
                                <div className={styles.socialIcon}>
                                    <FontAwesomeIcon icon={faYoutube} />
                                </div>
                                YouTube (@notmonkxy)
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <Modal open={modalConfig.open} loading={modalLoading} title={modalConfig.title} inputs={modalConfig.inputs} buttons={modalConfig.buttons} />
        </>
    );
}

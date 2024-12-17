import { Helmet } from "react-helmet";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Input from "@components/Chat/Input";
import styles from "./styles.module.css";

export default function Chat() {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Helmet>
                <title>Chat | Purpet</title>
                <meta name="description" content="Chat with other users on Purpet" />
            </Helmet>

            <div className="profileBody">
                <div className={styles.chatContainer}>
                    <ul className={styles.chatMessages}>
                        <li className={styles.chatMessage}>
                            <div>
                                <div className={`${styles.chatMessageBlookContainer} ${styles.chatMessageBlook} `}>
                                    <img className={styles.blook} src="https://cdn.purpet.xyz/blooks/monkxy.png" />
                                </div>
                            </div>
                            <div>
                                <div className={styles.usernameContainer}>
                                    <Link className={styles.chatUsername} to="/stats?name=mokxy">monkxy</Link>
                                </div>
                                <div className={styles.chatMessageContent}>
                                    test
                                </div>
                            </div>
                        </li>
                    </ul>
                    <form className={styles.chatMessageForm} autoComplete="off" tabIndex={0} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.chatMessageInputContainer}>
                            {/* <input className={styles.chatMessageInput} type="text" placeholder="Message..." ref={inputRef} maxLength={2000} tabIndex={0} /> */}
                            <Input ref={inputRef} />
                            <button className={styles.chatMessageSend} type="submit" tabIndex={0}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
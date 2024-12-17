import { FormEvent, useState } from "react";
import Loader from "@components/Loader";
import styles from "./styles.module.css";
import axios from "axios";

interface ModalProps {
    open: boolean;
    loading: boolean;
    title: string;
    inputs: {
        placeholder: string;
        type: string;
        value: string;
        ref: any;
        maxLength?: number | 999;
        onChange: (e: any) => void;
    }[];
    buttons: {
        text: string;
        color: string;
        onClick: () => void;
    }[];
}

export default function Modal({ open, loading, title, inputs, buttons }: ModalProps) {
    const [error, setError] = useState({ error: false, message: "" });

    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        setError({ error: true, message: error.response?.data.message || "Something went wrong." });
        return Promise.reject(error);
    });

    return (
        <>
            {open && <div className={styles.modal}>
                <form className={styles.container} onSubmit={(e: FormEvent) => { e.preventDefault(); buttons[0].onClick(); }}>
                    <div className={styles.text}>{title}</div>
                    {error.error && <div className={styles.error}>{error.message}</div>}
                    <div className={styles.holder}>
                        {inputs.length > 0 && <div className={styles.numRow}>
                            {inputs.map((input, i) => (
                                <div className={styles.inputContainer} key={i}>
                                    <input className={styles.input} type={input.type} placeholder={input.placeholder} ref={input.ref} maxLength={input.maxLength} />
                                </div>
                            ))}
                        </div>}
                        {buttons.length > 0 && <div className={styles.buttonContainer}>
                            {!loading ? buttons.map((button, i) => (
                                <div className={styles.button} role="button" tabIndex={0} onClick={button.onClick} key={i}>
                                    <div className={styles.shadow} />
                                    <div className={styles.edge} style={{ backgroundColor: button.color }} />
                                    <div className={`${styles.front} ${styles.buttonInside}`} style={{ backgroundColor: button.color }}>
                                        {button.text}
                                    </div>
                                </div>
                            )) : <Loader />}
                        </div>}
                    </div>
                    <input className={styles.hiddenSubmit} type="submit" />
                </form>
            </div>}
        </>
    );
}

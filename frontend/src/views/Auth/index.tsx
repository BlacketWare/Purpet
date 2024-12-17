import { useRef, useState, useEffect, MutableRefObject, MouseEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@contexts/Auth";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
// import OrContainer from "@components/Auth/OrContainer";
import ErrorContainer from "@components/Auth/ErrorContainer";
import Header from "@components/Header";
import Loader from "@components/Loader";
import styles from "./styles.module.css";

interface Error {
    error: boolean;
    message: string;
    username: boolean;
    password: boolean;
    check: boolean;
}

export default function Auth({ type }: { type: "Login" | "Register" }) {
    const reCaptchaRef = useRef<ReCAPTCHA>() as MutableRefObject<ReCAPTCHA>;
    const usernameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>({ error: false, message: "", username: false, password: false, check: false });

    const { user, getLoggedIn } = useAuth();

    if (user) return <Navigate to="/stats" />;

    useEffect(() => {
        setError({ error: false, message: "", username: false, password: false, check: false });
        setLoading(false);
    }, []);

    const login = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        setError({ error: false, message: "", username: false, password: false, check: false });
        reCaptchaRef.current.reset();
        if (!validate()) return setLoading(false);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        axios.post("/auth/login", { username, password }).then(() => {
            getLoggedIn();
        }).catch((err) => {
            setError({ error: true, message: err.response?.data.message || "Something went wrong.", username: false, password: false, check: false });
            setLoading(false);
        });
    };

    const register = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        setError({ error: false, message: "", username: false, password: false, check: false });
        reCaptchaRef.current.reset();
        if (!validate()) return setLoading(false);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        axios.post("/auth/register", { username, password }).then(() => {
            getLoggedIn();
        }).catch((err) => {
            setError({ error: true, message: err.response?.data.message || "Something went wrong.", username: false, password: false, check: false });
            setLoading(false);
        });
    };

    // const googleLogin = async (token: string) => {
    //     setLoading(true);
    //     setError({ error: false, message: "", username: false, password: false, check: false });

    //     axios.post("/api/auth/google/login", { token }).then(() => {
    //         getLoggedIn();
    //     });
    // }

    // const googleSignup = async (token: string) => {
    //     setLoading(true);
    //     setError({ error: false, message: "", username: false, password: false, check: false });

    //     axios.post("/api/auth/google/signup", { token }).then(() => {
    //         getLoggedIn();
    //     }).catch((err) => {
    //         setError({ error: true, message: err.response?.data.error || "An error occurred.", username: false, password: false, check: false });
    //         setLoading(false);
    //     });
    // }

    const validate = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            setError({ error: true, message: "Please fill out all fields.", username: true, password: true, check: false });
            return false;
        }

        if (username.length < 3) {
            setError({ error: true, message: "Username must be at least 3 characters.", username: true, password: false, check: false });
            return false;
        }

        if (password.length < 6) {
            setError({ error: true, message: "Password must be at least 6 characters.", username: false, password: true, check: false });
            return false;
        }

        return true;
    };

    return (
        <GoogleOAuthProvider clientId="88612164691-l4e34nkf05sd20g346c07ofdm8depoon.apps.googleusercontent.com">
            <Helmet>
                <title>{type} | Purpet</title>
                <meta name="description" content={`${type} to Purpet.`} />
            </Helmet>

            <Header rightLink={{ text: type === "Login" ? "Register" : "Login", to: type === "Login" ? "/register" : "/login" }} />

            <ReCAPTCHA
                sitekey="6LfqCVEpAAAAAF2Qsv0nK5KuiLmVyL5oTrHe3NIc"
                theme="dark"
                size="invisible"
                ref={reCaptchaRef}
                onAbort={() => {
                    setError({ error: true, message: "reCAPTCHA failed.", username: false, password: false, check: false });
                    setLoading(false);
                }}
                onErrored={() => {
                    setError({ error: true, message: "reCAPTCHA failed.", username: false, password: false, check: false });
                    setLoading(false);
                }}
            />

            <div className="regularBody">
                <div className={styles.container}>
                    <div className={styles.containerHeader}>{type}</div>
                    {/* <div className={styles.googleWrapper}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                if (type === "Login") googleLogin(credentialResponse.credential as string);
                                else googleSignup(credentialResponse.credential as string);
                            }}
                            text={type === "Login" ? "signin_with" : "signup_with"} />
                    </div> */}

                    {/* <OrContainer /> */}

                    <form>
                        <div className={`${styles.inputContainer} ${error.username && `${styles.inputError}`}`}>
                            <FontAwesomeIcon icon={faUser} className={`${styles.inputIcon} ${error.username && `${styles.iconError}`}`} />
                            <input className={styles.input} type="text" placeholder="Username" ref={usernameRef} onChange={() => setError({ error: false, message: "", username: false, password: false, check: false })} maxLength={16} />
                        </div>
                        <div className={`${styles.inputContainer} ${error.password && `${styles.inputError}`}`}>
                            <FontAwesomeIcon icon={faLock} className={`${styles.inputIcon} ${error.password && `${styles.iconError}`}`} />
                            <input className={styles.input} type="password" placeholder="Password" ref={passwordRef} onChange={() => setError({ error: false, message: "", username: false, password: false, check: false })} />
                        </div>
                        {!loading && <button className={styles.button} tabIndex={0} type="submit" onClick={(e) => type === "Login" ? login(e) : register(e)}>{type}</button>}
                    </form>

                    {error.error && <ErrorContainer errorText={error.message} />}
                    {loading && <Loader />}

                    <div className={styles.switchType}>
                        {type === "Login" ? "Don't have an account?" : "Already have an account?"} <Link className={styles.switchAuthType} to={type === "Login" ? "/register" : "/login"}>{type === "Login" ? "Register" : "Login"}</Link> instead.
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

import { Helmet } from "react-helmet";
// import styles from "./styles.module.css";
import Header from "@components/Header";

export default function Terms() {
    return (
        <>
            <Helmet>
                <title>Terms | Purpet</title>
                <meta name="description" content="Read up on our terms of service." />
            </Helmet>

            <Header />
        </>
    );
}
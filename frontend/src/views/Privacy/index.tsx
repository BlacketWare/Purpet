import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import styles from "./styles.module.css";
import Header from "@components/Header";

export default function Privacy() {
    return (
        <>
            <Helmet>
                <title>Privacy | Purpet</title>
                <meta name="description" content="Read up on our privacy policy." />
            </Helmet>

            <Header />
        </>
    );
}
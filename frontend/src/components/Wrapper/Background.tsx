import Background from "@components/Background";

export default function BackgroundWrapper({ children }: { children: JSX.Element }) {
    return (
        <>
            <Background />
            {children}
        </>
    );
}

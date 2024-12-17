import { useAuth } from "@contexts/Auth";
import { useBanners } from "@contexts/Banner";
import { constructBanner } from "@utils/ConstructUrl";
import styles from "./styles.module.css";
import axios from "axios";

interface BannerCustomizerProps {
    open: boolean;
    onClick: () => void | null;
}

export default function BannerCustomizer({ open, onClick }: BannerCustomizerProps) {
    const { user } = useAuth();
    const { allBanners: banners } = useBanners();

    if (!user) return null;
    if (!banners) return null;

    const setToBanner = (banner: string) => {
        // axios.put("/api/user/banner", { banner }).then(() => {
        //     user.banner = banners[banner].image;
        //     onClick();
        // }).catch(() => onClick());
        axios.post("/users/me/changebanner", { banner: banner }).then(() => {
            user.banner.id = banner;
            onClick();
        }).catch(() => onClick());
    };

    return (
        <>
            {open && <div className={styles.modal}>
                <div className={styles.modalButton} role="button" tabIndex={0} onClick={onClick} />
                <div className={styles.bannerCustomizer}>
                    <div className={styles.bannersHolder}>
                        {banners.length > 0 && banners.map((banner: any, i: number) => (
                            <div className={styles.banner} role="button" tabIndex={0} onClick={() => setToBanner(banner.id)} key={i}>
                                <img className={styles.banner} src={constructBanner(banner.id)} draggable="false" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </>
    );
}

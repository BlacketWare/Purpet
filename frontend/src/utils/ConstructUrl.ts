import { useBlooks } from "@contexts/Blook";
import { useBanners } from "@contexts/Banner";
import { usePacks } from "@contexts/Pack";

type Pack = {
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

type Blook = {
    id: number;
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

type Banner = {
    id: string;
    name: string;
    description: string | null;
    assetId: string;
    asset: {
        id: string;
        path: string;
    }
}

const constructPack = (id: string) => `https://cdn.purpet.xyz${usePacks().packs.find((pack: Pack) => pack.id === id)?.asset.path}`;
const constructBackground = (id: string) => `https://cdn.purpet.xyz${usePacks().packs.find((pack: Pack) => pack.id === id)?.background.path}`;
const constructBlook = (id: string) =>  `https://cdn.purpet.xyz${useBlooks().allBlooks.find((blook: Blook) => blook.id === parseInt(id))?.asset.path}`;
const constructBanner = (id: string) => `https://cdn.purpet.xyz${useBanners().allBanners.find((banner: Banner) => banner.id === id)?.asset.path}`;

export { constructPack, constructBackground, constructBlook, constructBanner };
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
    console.log("Seeding database")

    const defaultBlookResource = await prisma.resource.create({
        data: {
            path: "/blooks/default.svg",
        },
    })

    const defaultBannerResource = await prisma.resource.create({
        data: {
            path: "/banners/default.svg",
        },
    })

    const commonColour = await prisma.colour.create({})

    const common = await prisma.rarity.create({
        data: {
            name: "Common",
            colourId: commonColour.id,
        },
    })

    const defaultPackBackground = await prisma.resource.create({
        data: {
            path: "/blooks/backgrounds/default.svg",
        },
    })

    const defaultPack = await prisma.pack.create({
        data: {
            name: "Default",
            description: "Default pack",
            price: 0,
            hidden: true,
            assetId: defaultBlookResource.id,
            innerColourId: commonColour.id,
            outerColourId: commonColour.id,
            backgroundId: defaultPackBackground.id,
        },
    })

    const defaultBlook = await prisma.blook.create({
        data: {
            name: "Default",
            packId: defaultPack.id,
            assetId: defaultBlookResource.id,
            rarityId: common.id,
            chance: 1,
        },
    })

    const defaultBanner = await prisma.banner.create({
        data: {
            name: "Default",
            description: "Default banner",
            assetId: defaultBannerResource.id,
        },
    })

    const userGroup = await prisma.group.create({
        data: {
            name: "User",
            description: "Default group",
        },
    })

    console.log("Seeding complete")
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
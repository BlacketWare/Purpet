import { useColours } from "@contexts/Colour";

type Colour = {
    id: number;
    hex: string;
};

const colour = (color: number) => useColours().colours.find((c: Colour) => c.id === color)?.hex;

export { colour };
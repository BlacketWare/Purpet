declare module "*.module.css" {
    const content: { [className: string]: string };
    export default content;
}

declare module "@components/*" {
    const content: ComponentType;
    export default content;
}

declare module "@contexts/*";
declare module "@contexts" {
    const content: ComponentType;
    export default content;
}


declare module "@utils/*";
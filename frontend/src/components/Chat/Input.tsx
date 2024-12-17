import { RefObject, CSSProperties, useMemo, useCallback } from "react";
import { Editor, Transforms, Range, createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, ReactEditor, withReact, useSelected, useFocused } from "slate-react";
import styles from "./styles.module.css";

interface InputProps {
    ref: RefObject<HTMLInputElement>;
}

interface MentionElement {
    type: "mention";
    children: Descendant[];
    character: string;
}

interface ElementProps {
    attributes: any;
    children: any;
    element: MentionElement;
    leaf: any;
}

const Mention = ({ attributes, children, element }: ElementProps) => {
    const selected = useSelected();
    const focused = useFocused();

    const style: CSSProperties = {
        padding: "3px 3px 2px",
        margin: "0 1px",
        verticalAlign: "baseline",
        display: "inline-block",
        borderRadius: "4px",
        backgroundColor: "#eee",
        fontSize: "0.9em",
        boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
    };

    if (element.children[0].bold) style.fontWeight = "bold"
    if (element.children[0].italic) style.fontStyle = "italic"

    return (
        <span
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.character.replace(" ", "-")}`}
            style={style}
        >
            @{element.character}
            {children}
        </span>
    );
};

const Leaf = ({ attributes, children, leaf }: ElementProps) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.code) children = <code>{children}</code>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;


    return <span {...attributes}>{children}</span>;
};

const Element = (props) => {
    const { attributes, children, element } = props;
    switch (element.type) {
        case "mention":
            return <Mention {...props} />;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const withMentions = (editor) => {
    const { isInline, isVoid, markableVoid } = editor;

    editor.isInline = (element: MentionElement) => element.type === "mention" ? true : isInline(element);
    editor.isVoid = (element: MentionElement) => element.type === "mention" ? true : isVoid(element);
    editor.markableVoid = (element: MentionElement) => element.type === "mention" || markableVoid(element);

    return editor;
};

export default function Input({ ref }: InputProps) {
    const renderElement = useCallback((props) => <Element {...props} />, [])
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
    const editor = useMemo(() => withMentions(withReact(withHistory(createEditor()))), []);

    const onKeyDown = useCallback((event) => { }, []);

    return (
        <div className={styles.chatMessageInput}>
            <Slate
                editor={editor}
                initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}
                onChange={(newValue) => {
                    console.log(newValue);
                }}
            >
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                    placeholder="Enter a message..."
                />
            </Slate>
        </div>
    );
}
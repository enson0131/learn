import * as Y from "yjs";

const ydoc = new Y.Doc();

// You can define a Y.Text as a top-level type or a nested type

// Method 1: Define a top-level type
const ytext = ydoc.getText("my text type");
// Method 2: Define Y.Text that can be included into the Yjs document
// const ytextNested = new Y.Text();

// Nested types can be included as content into any other shared type
// ydoc.getMap("another shared structure").set("my nested text", ytextNested);

// Common methods
ytext.insert(0, "abc"); // insert three elements
ytext.format(1, 2, { bold: true }); // delete second element
ytext.toString(); // => 'abc'
ytext.delete(0, 1);
ytext.insert(0, "enson");
ytext.toDelta(); // => [{ insert: 'a' }, { insert: 'bc', attributes: { bold: true }}]

console.log(ytext.toDelta());

export default function CollaborativeDoc() {
  return <div>协同文档{ytext.toString()}</div>;
}

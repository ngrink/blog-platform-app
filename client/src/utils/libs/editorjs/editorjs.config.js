// import Paragraph from '@editorjs/paragraph';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';


export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
}

export const styles = {
    header: {
        h1: {fontSize: "36px", fontWeight: 700},
        h2: {fontSize: "30px", fontWeight: 700},
        h3: {fontSize: "24px", fontWeight: 700},
        h4: {fontSize: "21px", fontWeight: 700},
        h5: {fontSize: "19px", fontWeight: 700},
        h6: {fontSize: "16px", fontWeight: 700},
    },
    table: {
        th: {backgroundColor: "transparent", borderBottom: "1px solid rgba(0,0,0,0.25)"},
        // td: {color: "black"}
    }
}

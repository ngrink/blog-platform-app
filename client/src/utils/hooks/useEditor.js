import { useCallback, useMemo, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";

import { EDITOR_JS_TOOLS } from "../libs/editorjs";


export const useEditor = (defaultValue) => {
    const ReactEditorJS = useMemo(() => {
        return createReactEditorJS()
    }, [])

    const editorInstance = useRef(null);

    const handleInitialize = useCallback((instance) => {
        editorInstance.current = instance
    }, [])

    const getData = useCallback(async () => {
        const data = await editorInstance.current.save();
        return data;
    }, [])

    const setData = useCallback(async (data) => {
        await editorInstance.current.render(data);
    }, [])

    const element = (
        <ReactEditorJS
            onInitialize={handleInitialize}
            defaultValue={defaultValue}
            tools={EDITOR_JS_TOOLS}
        />
    )

    return {element, getData, setData}
}

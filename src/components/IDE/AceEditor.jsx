import {useEffect, useRef, useState} from "react";
import styles from "./AceEditor.module.scss";
import ace from "ace-builds";
import {FaRegMoon} from "react-icons/fa";
import {BsFillSunFill} from "react-icons/bs";
import "ace-builds/src-min-noconflict/theme-nord_dark.js"; // Import the theme directly
import "ace-builds/src-min-noconflict/theme-chrome"; // Import the theme directly
import "ace-builds/src-min-noconflict/mode-javascript"; // Import the mode directly
import "ace-builds/src-min-noconflict/mode-c_cpp"; // Import the mode directly
import "ace-builds/src-min-noconflict/mode-java"; // Import the mode directly
import "ace-builds/src-min-noconflict/mode-python"; // Import the mode directly
import "ace-builds/src-min-noconflict/mode-php";
import useAceEditor from "./useAceEditor.jsx"; // Import the mode directly

const AceEditor = () => {
    const {editorRef , handleEditorContent} = useAceEditor();

    return (
        <div className={styles.editor} id='ace-editor' onKeyUp={handleEditorContent}></div>
    )


};

export default AceEditor;

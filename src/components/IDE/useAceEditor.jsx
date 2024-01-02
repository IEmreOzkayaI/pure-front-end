import {useEffect, useRef, useState} from "react";
import ace from "ace-builds";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentQuestion} from "../../redux/toolkit/interviewManagementSlice.js";

const useAceEditor = () => {
        const dispatch = useDispatch();
        const editorRef = useRef(null);
        const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);
        useEffect(() => {
            initializeEditor();
        }, []);

        useEffect(() => {
            updateEditorModeAndValue();
        }, [currentQuestion?.mode , currentQuestion?.question]);

        const initializeEditor = () => {
            const editor = ace.edit("ace-editor");
            setEditorTheme(editor);
            setEditorMode(editor);
            setEditorValue(editor);
            editorRef.current = editor;
        };

        const setEditorTheme = (editor) => {
            editor.setTheme("ace/theme/nord_dark");
        };

        const setEditorMode = (editor) => {
            currentQuestion?.mode ? editor.session.setMode(currentQuestion?.mode) : editor.session.setMode("ace/mode/javascript");
        };

        const setEditorValue = (editor) => {
            const language = currentQuestion && typeof currentQuestion.mode === 'string' ? currentQuestion.mode.split('/')[2] : 'javascript';
            editorRef.current?.setValue(currentQuestion?.question.missing_part[language === "csp" ? "csharp" : language]);
        };

        const updateEditorModeAndValue = () => {
            setEditorMode(editorRef.current);
            setEditorValue(editorRef.current);


        };

        const handleEditorContent = () => {
            dispatch(setCurrentQuestion({...currentQuestion, code: editorRef.current.getValue()}));
        };

        return {editorRef, handleEditorContent};
    }
;

export default useAceEditor;
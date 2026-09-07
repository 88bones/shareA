import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

interface CodeEditorProps {
  text: string;
  onChange: (text: string) => void;
}

const CodeEditor = ({ text, onChange }: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: text,
      extensions: [
        basicSetup,
        javascript({ typescript: true }),
        EditorView.updateListener.of((update) => {
          if (
            update.docChanged &&
            update.transactions.some((transaction) =>
              transaction.isUserEvent("input"),
            )
          ) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === text) return;

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: text,
      },
    });
  }, [text]);

  return <div ref={editorRef} className="min-h-dvh bg-cyan text-white" />;
};

export default CodeEditor;

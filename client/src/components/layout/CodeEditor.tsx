import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import { Decoration, type DecorationSet, WidgetType } from "@codemirror/view";
import { socket } from "../../libs/socket";

interface RemoteCursor {
  userId: string;
  position: number;
}

class CursorWidget extends WidgetType {
  private readonly userId: string;
  private readonly color: string;

  constructor(userId: string, color: string) {
    super();
    this.userId = userId;
    this.color = color;
  }

  toDOM() {
    const cursor = document.createElement("span");
    cursor.style.borderLeft = `2px solid ${this.color}`;
    cursor.style.display = "inline-block";
    cursor.style.height = "1.25em";
    cursor.style.marginLeft = "-1px";
    cursor.style.position = "relative";
    cursor.style.verticalAlign = "text-bottom";
    const label = document.createElement("span");
    label.textContent = this.userId.slice(0, 6);
    label.style.backgroundColor = this.color;
    label.style.color = "#111827";
    label.style.fontSize = "10px";
    label.style.left = "-2px";
    label.style.padding = "1px 3px";
    label.style.position = "absolute";
    label.style.top = "-16px";
    label.style.whiteSpace = "nowrap";
    cursor.append(label);
    return cursor;
  }
}

const setRemoteCursors = StateEffect.define<RemoteCursor[]>();
const remoteCursorsField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update: (decorations, transaction) => {
    decorations = decorations.map(transaction.changes);
    for (const effect of transaction.effects) {
      if (effect.is(setRemoteCursors)) {
        decorations = Decoration.set(
          effect.value
            .filter(({ position }) => position <= transaction.state.doc.length)
            .map(({ userId, position }) =>
              Decoration.widget({
                widget: new CursorWidget(userId, getCursorColor(userId)),
                side: -1,
              }).range(position),
            ),
        );
      }
    }
    return decorations;
  },
  provide: (field) => EditorView.decorations.from(field),
});

const getCursorColor = (userId: string) => {
  const colors = ["#f97316", "#22c55e", "#38bdf8", "#e879f9", "#facc15"];
  const hash = [...userId].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );
  return colors[hash % colors.length];
};

interface CodeEditorProps {
  text: string;
  onChange: (text: string) => void;
  roomId: string | undefined;
  userId: string;
}

const CodeEditor = ({ text, onChange, roomId, userId }: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const remoteCursorsRef = useRef(new Map<string, RemoteCursor>());
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
        remoteCursorsField,
        // javascript({ typescript: true }),
        EditorView.updateListener.of((update) => {
          if (update.selectionSet || update.docChanged) {
            socket.emit("cursorPosition", {
              roomId,
              userId,
              position: update.state.selection.main.head,
            });
          }

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

    const handleCursorPosition = ({
      userId: remoteUserId,
      position,
    }: RemoteCursor) => {
      if (remoteUserId === userId) return;
      remoteCursorsRef.current.set(remoteUserId, {
        userId: remoteUserId,
        position,
      });
      view.dispatch({
        effects: setRemoteCursors.of([...remoteCursorsRef.current.values()]),
      });
    };

    const handleCursorLeave = ({
      userId: remoteUserId,
    }: {
      userId: string;
    }) => {
      remoteCursorsRef.current.delete(remoteUserId);
      view.dispatch({
        effects: setRemoteCursors.of([...remoteCursorsRef.current.values()]),
      });
    };

    socket.on("cursorPosition", handleCursorPosition);
    socket.on("cursorLeave", handleCursorLeave);

    return () => {
      socket.off("cursorPosition", handleCursorPosition);
      socket.off("cursorLeave", handleCursorLeave);
      remoteCursorsRef.current.clear();
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

  return <div ref={editorRef} className="text-white min-h-dvh bg-cyan" />;
};

export default CodeEditor;

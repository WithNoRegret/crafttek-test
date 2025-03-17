import { EditorEvents, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import s from './textEditor.module.scss';

export interface MenuBarProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuBar = ({ setIsEditing }: MenuBarProps) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className={s.controlGroup}>
      <div className={s.buttonGroup}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`${s.button} ${editor.isActive('bold') ? s.isActive : ''}`}
        >
          𝐁
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`${s.button} ${editor.isActive('italic') ? s.isActive : ''}`}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={`${s.button} ${editor.isActive('strike') ? s.isActive : ''}`}
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${s.button} ${editor.isActive('bulletList') ? s.isActive : ''}`}
        >
          <img src="icons/list.png" alt="bullet list" height={16} width={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${s.button} ${editor.isActive('orderedList') ? s.isActive : ''}`}
        >
          <img src="icons/orderedList.png" alt="bullet list" height={16} width={16} />
        </button>
        <button 
          onClick={() => setIsEditing(false)}
          className={`${s.button} ${s.isActive}`}
        >
          Сохранить</button>
      </div>
    </div>
  )
}

export interface TextEditorProps {
  content: string;
  onUpdate: (props: EditorEvents["update"]) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; 
}

export const TextEditor = ({ content, onUpdate, setIsEditing }: TextEditorProps) => {

  return (
    <EditorProvider
      slotBefore={<MenuBar setIsEditing={setIsEditing} />}
      extensions={[StarterKit]}
      content={content}
      onUpdate={onUpdate}
      editorContainerProps={{
        className: s.editorContainer,
      }}
    ></EditorProvider>
  )
}
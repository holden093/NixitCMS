import { useEffect, useMemo, useRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import type { NewsEditorValue } from '@/pages/admin/news/newsForm'

interface NewsRichTextEditorProps {
  label: string
  description: string
  value: NewsEditorValue
  onChange: (nextValue: NewsEditorValue) => void
  onRequestLibrary: () => void
  onUploadImage: (file: File) => Promise<{ src: string; alt: string }>
  libraryImage?: { src: string; alt: string; token: string } | null
}

interface ToolbarButtonProps {
  label: string
  active?: boolean
  onClick: () => void
}

function ToolbarButton({ label, active = false, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-2 text-xs font-medium transition ${
        active
          ? 'border-ink bg-stone-100 text-ink'
          : 'border-line bg-white text-ink-soft hover:border-ink hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

export function NewsRichTextEditor({
  label,
  description,
  value,
  onChange,
  onRequestLibrary,
  onUploadImage,
  libraryImage = null,
}: NewsRichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const serializedValue = useMemo(() => JSON.stringify(value.json), [value.json])
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: false,
      }),
    ],
    content: value.json,
    onUpdate({ editor: nextEditor }) {
      onChange({
        json: nextEditor.getJSON(),
        html: nextEditor.getHTML(),
      })
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    const currentSerialized = JSON.stringify(editor.getJSON())
    if (currentSerialized !== serializedValue) {
      editor.commands.setContent(value.json, { emitUpdate: false })
    }
  }, [editor, serializedValue, value.json])

  useEffect(() => {
    if (!editor || !libraryImage) {
      return
    }

    editor.chain().focus().setImage({ src: libraryImage.src, alt: libraryImage.alt }).run()
  }, [editor, libraryImage])

  const promptForLink = () => {
    if (!editor) {
      return
    }

    const currentHref = editor.getAttributes('link').href as string | undefined
    const nextHref = window.prompt('Inserisci URL del link', currentHref ?? '')

    if (nextHref === null) {
      return
    }

    if (!nextHref.trim()) {
      editor.chain().focus().unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: nextHref.trim() }).run()
  }

  const handleFileUpload = async (file: File | null) => {
    if (!editor || !file) {
      return
    }

    const uploaded = await onUploadImage(file)
    editor.chain().focus().setImage(uploaded).run()
  }

  return (
    <div className="space-y-4 border border-line bg-stone-50 p-5">
      <div className="space-y-2">
        <p className="text-base font-semibold text-ink">{label}</p>
        <p className="text-sm leading-6 text-ink-soft">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <ToolbarButton label="Bold" active={Boolean(editor?.isActive('bold'))} onClick={() => editor?.chain().focus().toggleBold().run()} />
        <ToolbarButton label="Italic" active={Boolean(editor?.isActive('italic'))} onClick={() => editor?.chain().focus().toggleItalic().run()} />
        <ToolbarButton label="H2" active={Boolean(editor?.isActive('heading', { level: 2 }))} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolbarButton label="H3" active={Boolean(editor?.isActive('heading', { level: 3 }))} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} />
        <ToolbarButton label="Bullet" active={Boolean(editor?.isActive('bulletList'))} onClick={() => editor?.chain().focus().toggleBulletList().run()} />
        <ToolbarButton label="Numbered" active={Boolean(editor?.isActive('orderedList'))} onClick={() => editor?.chain().focus().toggleOrderedList().run()} />
        <ToolbarButton label="Quote" active={Boolean(editor?.isActive('blockquote'))} onClick={() => editor?.chain().focus().toggleBlockquote().run()} />
        <ToolbarButton label="Link" active={Boolean(editor?.isActive('link'))} onClick={promptForLink} />
        <ToolbarButton label="Libreria" onClick={onRequestLibrary} />
        <ToolbarButton label="Carica immagine" onClick={() => fileInputRef.current?.click()} />
      </div>

      <div className="border border-line bg-white p-4">
        <EditorContent editor={editor} className="news-editor-content editorial-prose min-h-[20rem] max-w-none" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={event => {
          void handleFileUpload(event.target.files?.[0] ?? null)
          event.currentTarget.value = ''
        }}
      />
    </div>
  )
}

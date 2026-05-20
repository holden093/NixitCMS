import ReactMarkdown from 'react-markdown'

export function MarkdownPreviewPane({ value }: { value: string }) {
  return (
    <div className="border border-line bg-stone-50 p-5">
      <p className="eyebrow mb-4">Anteprima contenuto</p>
      <div className="prose editorial-prose max-w-none">
        {value.trim() ? (
          <ReactMarkdown>{value}</ReactMarkdown>
        ) : (
          <p className="text-sm text-muted">Nessun contenuto da mostrare in anteprima.</p>
        )}
      </div>
    </div>
  )
}

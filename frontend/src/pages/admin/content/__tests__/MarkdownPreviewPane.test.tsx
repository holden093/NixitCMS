import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownPreviewPane } from '../MarkdownPreviewPane'

describe('MarkdownPreviewPane', () => {
  it('renders allowed markdown formatting', () => {
    const { container } = render(<MarkdownPreviewPane value="This is **bold** and *italic*." />)

    expect(container.querySelector('strong')).toHaveTextContent('bold')
    expect(container.querySelector('em')).toHaveTextContent('italic')
  })

  it('does not render image markdown because img is not allowed', () => {
    const { container } = render(<MarkdownPreviewPane value="![alt text](https://example.com/image.jpg)" />)

    expect(container.querySelector('img')).not.toBeInTheDocument()
  })

  it('does not render raw HTML script tags', () => {
    const { container } = render(<MarkdownPreviewPane value='<script>alert("xss")</script>' />)

    expect(container.querySelector('script')).not.toBeInTheDocument()
  })

  it('shows the empty state when value is empty', () => {
    render(<MarkdownPreviewPane value="   " />)

    expect(screen.getByText('Nessun contenuto da mostrare in anteprima.')).toBeInTheDocument()
  })
})

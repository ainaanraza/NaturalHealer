import React from 'react'

// Format inline styles: **bold**, *italic*, `code`
function formatInlineStyles(text) {
  // Escape raw HTML from the model before adding our own tags
  text = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  text = text.replace(/_(.+?)_/g, '<em>$1</em>')
  text = text.replace(/`(.+?)`/g, '<code>$1</code>')

  return text
}

// Turn the model's light markdown into paragraphs, headings and lists
export function formatMessageText(text) {
  const lines = text.split('\n')
  const formatted = []
  let listItems = []
  let listType = null // 'bullet' or 'number'

  const flushList = () => {
    if (listItems.length > 0) {
      const ListTag = listType === 'number' ? 'ol' : 'ul'
      formatted.push(
        <ListTag key={`list-${formatted.length}`}>
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ListTag>
      )
      listItems = []
      listType = null
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    // Blank lines just end a list; spacing comes from CSS
    if (!trimmed) {
      flushList()
      return
    }

    const bulletMatch = trimmed.match(/^[*\-•]\s+(.+)$/)
    if (bulletMatch) {
      if (listType !== 'bullet') flushList()
      listType = 'bullet'
      listItems.push(formatInlineStyles(bulletMatch[1]))
      return
    }

    const numberMatch = trimmed.match(/^(\d+)\.\s+(.+)$/)
    if (numberMatch) {
      if (listType !== 'number') flushList()
      listType = 'number'
      listItems.push(formatInlineStyles(numberMatch[2]))
      return
    }

    flushList()

    // "> " lines are callouts, used by the server's safety notices
    const callout = trimmed.match(/^>\s?(.*)$/)
    if (callout) {
      formatted.push(
        <p key={`c-${index}`} className="msg-callout" dangerouslySetInnerHTML={{ __html: formatInlineStyles(callout[1]) }} />
      )
      return
    }

    const heading = trimmed.match(/^(#{1,6})\s*(.+)$/)
    if (heading) {
      formatted.push(
        <h4 key={`h-${index}`} dangerouslySetInnerHTML={{ __html: formatInlineStyles(heading[2]) }} />
      )
    } else {
      formatted.push(
        <p key={`p-${index}`} dangerouslySetInnerHTML={{ __html: formatInlineStyles(trimmed) }} />
      )
    }
  })

  flushList()
  return formatted
}

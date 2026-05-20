import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

type AdminTableAlign = 'left' | 'center' | 'right'

function getAlignClass(align: AdminTableAlign) {
  if (align === 'center') {
    return 'text-center'
  }

  if (align === 'right') {
    return 'text-right'
  }

  return 'text-left'
}

export function AdminTable({
  children,
  className = '',
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table
        {...props}
        className={[
          'min-w-full border-collapse',
          className,
        ].filter(Boolean).join(' ')}
      >
        {children}
      </table>
    </div>
  )
}

export function AdminTableHead({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className={[
        'bg-stone-100',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </thead>
  )
}

export function AdminTableBody({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      {...props}
      className={className}
    >
      {children}
    </tbody>
  )
}

export function AdminTableRow({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className={[
        'border-b border-line transition-colors last:border-b-0',
        'data-[variant=body]:hover:bg-stone-50',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </tr>
  )
}

export function AdminTableHeaderCell({
  children,
  className = '',
  align = 'left',
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & {
  align?: AdminTableAlign
}) {
  return (
    <th
      {...props}
      className={[
        'px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted',
        getAlignClass(align),
        className,
      ].filter(Boolean).join(' ')}
    >
      {children as ReactNode}
    </th>
  )
}

export function AdminTableCell({
  children,
  className = '',
  align = 'left',
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  align?: AdminTableAlign
}) {
  return (
    <td
      {...props}
      className={[
        'px-4 py-4 align-top text-sm text-ink-soft',
        getAlignClass(align),
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </td>
  )
}

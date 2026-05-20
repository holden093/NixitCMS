import * as Tabs from '@radix-ui/react-tabs'

interface AdminTabsProps {
  value: string
  onValueChange: (value: string) => void
  tabs: Array<{ value: string, label: string }>
  compact?: boolean
}

export function AdminTabs({
  value,
  onValueChange,
  tabs,
  compact = false,
}: AdminTabsProps) {
  return (
    <Tabs.Root value={value} onValueChange={onValueChange}>
      <Tabs.List className={[
        'inline-flex flex-wrap gap-2 rounded-[1.4rem] border border-slate-200/90 bg-slate-50/90 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
        compact ? '' : 'w-full',
      ].join(' ')}>
        {tabs.map(tab => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={[
              'rounded-[1rem] px-4 py-2.5 text-sm font-semibold text-slate-500 transition',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100',
              'data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-[0_10px_25px_rgba(15,23,42,0.08)]',
              compact ? '' : 'flex-1',
            ].join(' ')}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

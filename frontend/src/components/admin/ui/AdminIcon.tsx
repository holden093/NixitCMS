import type { SVGProps } from 'react'
import {
  AlertTriangle,
  Building2,
  CalendarCog,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileStack,
  Globe2,
  Image,
  ImagePlus,
  Images,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  MapPinned,
  Newspaper,
  Palette,
  Save,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  WandSparkles,
  X,
} from 'lucide-react'

const ICONS = {
  'alert-triangle': AlertTriangle,
  'building-2': Building2,
  'calendar-cog': CalendarCog,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  eye: Eye,
  'eye-off': EyeOff,
  'file-stack': FileStack,
  'globe-2': Globe2,
  image: Image,
  'image-plus': ImagePlus,
  images: Images,
  'layout-dashboard': LayoutDashboard,
  'lock-keyhole': LockKeyhole,
  'log-out': LogOut,
  mail: Mail,
  'map-pinned': MapPinned,
  newspaper: Newspaper,
  palette: Palette,
  save: Save,
  search: Search,
  'settings-2': Settings2,
  sparkles: Sparkles,
  'trash-2': Trash2,
  'wand-sparkles': WandSparkles,
  x: X,
} as const

export type AdminIconName = keyof typeof ICONS

interface AdminIconProps extends SVGProps<SVGSVGElement> {
  name: AdminIconName
}

export function AdminIcon({ name, strokeWidth = 1.8, ...props }: AdminIconProps) {
  const Icon = ICONS[name]
  return <Icon strokeWidth={strokeWidth} aria-hidden={props['aria-label'] ? undefined : true} {...props} />
}

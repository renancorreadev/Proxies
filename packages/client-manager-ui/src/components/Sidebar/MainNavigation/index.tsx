import {
  BarChart,
  BookOpenText,
  Braces,
  Home,
  SquareStack,
  Trophy,
} from 'lucide-react'
import { NavItem } from './NavItems'

export function MainNavigation() {
  return (
    <nav className="space-y-0.5">
      <NavItem title="Home" icon={Home} />
      <NavItem title="Events" icon={BarChart} />
      <NavItem title="Clients" icon={SquareStack} />
      <NavItem title="Points" icon={Trophy} />
      <NavItem title="Metadata" icon={Braces} />
      <NavItem title="Documentation" icon={BookOpenText} />
    </nav>
  )
}

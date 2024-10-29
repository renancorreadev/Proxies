import { HeaderDesktop } from './Desktop';
import { HeaderMobile } from './Mobile';
import { useIsMobile } from '@/hooks/useIsMobile';

export function Header() {
  const isMobile = useIsMobile();

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}

import { HeaderDesktop } from './Desktop';
import { HeaderMobile } from './Mobile';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useUserStore } from '@/store/store';
export function Header() {
  const { email, token } = useUserStore();
  const isMobile = useIsMobile();

  return isMobile ? (
    <HeaderMobile email={email} token={token} />
  ) : (
    <HeaderDesktop email={email} token={token} />
  );
}

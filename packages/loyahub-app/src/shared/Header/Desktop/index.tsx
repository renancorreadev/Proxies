import { Login } from '@/components/app/Authentication/Login';
import { NavigationMenuHeader } from './Navitation';
import { HeaderProfile } from '../HeaderProfile';

interface HeaderProps {
  readonly email: string | null;
  readonly token: string | null;
}

export function HeaderDesktop({ email, token }: HeaderProps) {
  return (
    <header className="w-full bg-slate-950 flex justify-around p-4 items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 bg-slate-200 rounded-3xl p-2">
          <a href="/">
            <img
              src="./src/assets/images/logo.png"
              alt="Loyahub"
              className="w-14 h-14"
            />
          </a>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-300">
          Loyahub
        </h1>
      </div>

      <NavigationMenuHeader />

      {email && token ? <HeaderProfile /> : <Login />}
    </header>
  );
}

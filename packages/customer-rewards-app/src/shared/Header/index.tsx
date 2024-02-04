import { Login } from "@/components/Login";
import { NavigationMenuHeader } from "./Navitation";
import { useUserStore } from "@/store/store";
import { UserProfile } from "@/components/User/UserProfile";


export function Header() {
  const { email, token } = useUserStore();

  console.log("email:", email, "token:", token);

  
  return (
    <header className="w-full bg-slate-950 flex justify-around p-4">
      <h1 className="text-2xl font-bold tracking-tight text-slate-300">
        CustomerRewards
      </h1>

      <NavigationMenuHeader />

      {email && token && <UserProfile />}
      {!email && !token && <Login />}


    </header>
  );
}

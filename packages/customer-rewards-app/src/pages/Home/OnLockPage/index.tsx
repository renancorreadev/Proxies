import { useUserStore } from '@/store/store';

export function HomeOnLockPage() {
  const isLogged = useUserStore((state) => state.isLogged);

  return (
    <div className="flex center justify-center  my-5">
      <h2 className="text-3xl font-bold tracking-tight text-slate-600">
        IsLogged: {isLogged.toString()}
      </h2>
    </div>
  );
}

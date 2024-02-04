import { useUserStore } from '@/store/store';

export const UserProfile = () => {
  const { email } = useUserStore();

  return (
    <div>
      <span className="text-lg tracking-tight text-slate-300 mb-4">
        {email && <p>Email: {email}</p>}
      </span>
    </div>
  );
};

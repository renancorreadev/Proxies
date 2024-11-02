// src/components/ui/Toaster.tsx
import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster, ToasterProps as SonnerProps } from 'sonner';

interface ToasterProps extends SonnerProps {}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme === 'dark' ? 'dark' : 'light'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toaster:bg-background toaster:text-foreground toaster:border-border toaster:shadow-lg',
          description: 'toast:text-muted-foreground',
          actionButton: 'toast:bg-primary toast:text-primary-foreground',
          cancelButton: 'toast:bg-muted toast:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

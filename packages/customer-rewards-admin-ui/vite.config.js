import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  plugins: [react(), tsconfigPaths()],
};

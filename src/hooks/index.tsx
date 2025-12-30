import type React from 'react';

import { AuthProvider } from './auth';

const AppProvider = ({ children }: { children?: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;

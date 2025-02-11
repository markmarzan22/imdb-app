'use client';

import { ThemeProvider } from '@material-tailwind/react';

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}

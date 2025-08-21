'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/lib/i18n';
import { PageCacheProvider } from './PageCacheProvider';

interface AppProvidersProps {
    children: ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
        },
    },
});

export default function AppProviders({ children }: AppProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <PageCacheProvider>
                    <PermissionGate>
                        {children}
                    </PermissionGate>
                </PageCacheProvider>
            </LanguageProvider>
        </QueryClientProvider>
    );
}

function PermissionGate({ children }: { children: ReactNode }) {
    // const { isAuthenticated, isLoading, user, error } = useAuth();
    // const router = useRouter();
    // const pathname = usePathname() || '/';

    // useEffect(() => {
    //     if (isLoading) return;

    //     const isPublic = PUBLIC_PATHS.includes(pathname);

    //     if (!isAuthenticated && !isPublic) {
    //         router.replace('/auth/pin');
    //         return;
    //     }

    //     if (isAuthenticated && user) {
    //         const role = user.role as UserRole;
    //         if (!isPublic && !hasPermission(pathname, role)) {
    //             router.replace('/');
    //         }
    //     }
    // }, [isAuthenticated, isLoading, user, pathname, router]);

    return <>{children}</>;
}



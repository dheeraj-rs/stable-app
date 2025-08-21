export type UserRole = 'admin' | 'superadmin' | 'user' | 'moderator';

export interface RoutePermission {
  path: string;
  roles: UserRole[];
  title: string;
  description?: string;
}

// Publicly accessible paths that do not require authentication
export const PUBLIC_PATHS: string[] = ['/', '/auth/pin', '/auth/set-pin'];

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  {
    path: '/',
    roles: ['admin', 'superadmin', 'user', 'moderator'],
    title: 'Dashboard',
    description: 'Main dashboard accessible to all authenticated users',
  },
  {
    path: '/dashboard',
    roles: ['admin', 'superadmin', 'user', 'moderator'],
    title: 'Dashboard',
    description: 'Main dashboard accessible to all authenticated users',
  },
  {
    path: '/elements',
    roles: ['admin', 'superadmin', 'user', 'moderator'],
    title: 'Elements',
    description: 'UI elements and components',
  },
  {
    path: '/add-elements',
    roles: ['admin', 'superadmin'],
    title: 'Add Elements',
    description: 'Add new UI elements (Admin and Superadmin only)',
  },
  {
    path: '/document',
    roles: ['admin', 'superadmin', 'user', 'moderator'],
    title: 'Documentation',
    description: 'Documentation and guides',
  },
  {
    path: '/folder',
    roles: ['admin', 'superadmin', 'user', 'moderator'],
    title: 'Folder Management',
    description: 'File and folder management',
  },
  {
    path: '/knowledge',
    roles: ['admin', 'superadmin', 'user', 'moderator'],
    title: 'Knowledge Base',
    description: 'Knowledge base and resources',
  },
  {
    path: '/portfolio',
    roles: ['admin', 'superadmin', 'user', 'moderator'],
    title: 'Portfolio',
    description: 'Portfolio management',
  },
  {
    path: '/settings',
    roles: ['user', 'moderator', 'admin', 'superadmin'],
    title: 'Settings',
    description: 'System settings (Admin and Superadmin only)',
  },
  {
    path: '/software',
    roles: ['admin', 'superadmin'],
    title: 'Software Management',
    description: 'Software and tools management (Admin and Superadmin only)',
  },
  {
    path: '/webconfig',
    roles: ['admin', 'superadmin'],
    title: 'Web Configuration',
    description: 'Web configuration settings (Admin and Superadmin only)',
  },
  {
    path: '/website-builder',
    roles: ['superadmin'],
    title: 'Website Builder',
    description: 'Website builder tool (Superadmin only)',
  },
  {
    path: '/websites',
    roles: ['admin', 'superadmin'],
    title: 'Websites',
    description: 'Website management (Admin and Superadmin only)',
  },
];

// Normalize path to remove trailing slashes (except root) and ensure leading slash
const normalizePath = (path: string): string => {
  if (!path) return '/';
  let normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
};

// Find the most specific matching route permission for a given path
export const getRoutePermission = (
  path: string
): RoutePermission | undefined => {
  const currentPath = normalizePath(path);
  // Prefer longest matching prefix to allow hierarchical permissions
  const matches = ROUTE_PERMISSIONS.filter((route) => {
    const routePath = normalizePath(route.path);
    if (routePath === '/') return currentPath === '/';
    return currentPath === routePath || currentPath.startsWith(`${routePath}/`);
  });
  if (matches.length === 0) return undefined;
  return matches.sort(
    (a, b) => normalizePath(b.path).length - normalizePath(a.path).length
  )[0];
};

export const hasPermission = (path: string, userRole: UserRole): boolean => {
  const route = getRoutePermission(path);
  if (!route) {
    // If no specific permission is defined, allow access
    return true;
  }
  return route.roles.includes(userRole);
};

export const getAccessibleRoutes = (userRole: UserRole): RoutePermission[] => {
  return ROUTE_PERMISSIONS.filter((route) => route.roles.includes(userRole));
};

export const getRoleHierarchy = (role: UserRole): number => {
  const hierarchy = {
    user: 1,
    moderator: 2,
    admin: 3,
    superadmin: 4,
  };
  return hierarchy[role] || 0;
};

export const canAccessRoute = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => {
  return getRoleHierarchy(userRole) >= getRoleHierarchy(requiredRole);
};

// Feature-level permissions for Settings page
export type SettingFeature =
  | 'profile'
  | 'language'
  | 'theme'
  | 'layout'
  | 'website_generation'
  | 'seo'
  | 'notifications'
  | 'advanced'
  | 'security';

export const SETTINGS_FEATURE_PERMISSIONS: Record<SettingFeature, UserRole[]> =
  {
    profile: ['user', 'moderator', 'admin', 'superadmin'],
    language: ['user', 'moderator', 'admin', 'superadmin'],
    theme: ['user', 'moderator', 'admin', 'superadmin'],
    layout: ['moderator', 'admin', 'superadmin'],
    website_generation: ['admin', 'superadmin'],
    seo: ['admin', 'superadmin'],
    notifications: ['user', 'moderator', 'admin', 'superadmin'],
    advanced: ['moderator', 'admin', 'superadmin'],
    security: ['admin', 'superadmin'],
  };

export const canUseSetting = (
  feature: SettingFeature,
  userRole: UserRole
): boolean => {
  const allowedRoles = SETTINGS_FEATURE_PERMISSIONS[feature];
  return allowedRoles.includes(userRole);
};

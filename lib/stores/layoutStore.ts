import { create } from 'zustand';
import { LayoutConfig, LayoutState } from '@/types';

// Types
export interface LayoutStore {
  layoutConfig: LayoutConfig;
  layoutState: LayoutState;
  activeMenu: string;
  setLayoutConfig: (config: Partial<LayoutConfig>) => void;
  setLayoutState: (state: Partial<LayoutState>) => void;
  setActiveMenu: (menu: string) => void;
  onMenuToggle: () => void;
  onConfigToggle: () => void;
  onBottombarToggle: () => void;
  onTopbarToggle: () => void;
  onNavbarStickyToggle: () => void;
  onBottombarStickyToggle: () => void;
  onSidebarAutoOverlayToggle: () => void;
  showProfileSidebar: () => void;
  isOverlay: () => boolean;
  isDesktop: () => boolean;
}

// Default values
const defaultLayoutConfig: LayoutConfig = {
  ripple: false,
  inputStyle: 'outlined',
  menuMode: 'static',
  colorScheme: 'dark',
  theme: 'd-admin-dark',
  scale: 14,
  secretKey: '',
};

const defaultLayoutState: LayoutState = {
  staticMenuDesktopInactive: false,
  staticConfigDesktopInactive: true,
  staticBottombarDesktopInactive: true,
  overlayMenuActive: false,
  overlayConfigActive: false,
  overlayBottombarActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  topbarAutoHide: false,
  staticMenuMobileActive: false,
  staticConfigMobileActive: false,
  staticBottombarMobileHide: false,
  menuHoverActive: false,
  sidebarAutoOverlayActive: true,
  searchSidebarItems: [],
  navbarStickyToggle: false,
  bottombarStickyToggle: true,
};

// Create the store
export const useLayoutStore = create<LayoutStore>((set, get) => ({
  // Initial state
  layoutConfig: { ...defaultLayoutConfig },
  layoutState: { ...defaultLayoutState },
  activeMenu: '',

  // State setters
  setLayoutConfig: (config) =>
    set((state) => ({
      layoutConfig: { ...state.layoutConfig, ...config },
    })),

  setLayoutState: (newState) =>
    set((state) => ({
      layoutState: { ...state.layoutState, ...newState },
    })),

  setActiveMenu: (menu) => set({ activeMenu: menu }),

  // Toggle actions
  onMenuToggle: () => {
    const { layoutState, isOverlay, isDesktop } = get();

    if (isOverlay()) {
      set({
        layoutState: {
          ...layoutState,
          overlayMenuActive: !layoutState.overlayMenuActive,
        },
      });
    } else if (isDesktop()) {
      set({
        layoutState: {
          ...layoutState,
          staticMenuDesktopInactive: !layoutState.staticMenuDesktopInactive,
        },
      });
    } else {
      set({
        layoutState: {
          ...layoutState,
          staticMenuMobileActive: !layoutState.staticMenuMobileActive,
        },
      });
    }
  },

  onConfigToggle: () => {
    const { layoutState, isOverlay, isDesktop } = get();

    if (isOverlay()) {
      set({
        layoutState: {
          ...layoutState,
          overlayConfigActive: !layoutState.overlayConfigActive,
        },
      });
    } else if (isDesktop()) {
      set({
        layoutState: {
          ...layoutState,
          staticConfigDesktopInactive: !layoutState.staticConfigDesktopInactive,
        },
      });
    } else {
      set({
        layoutState: {
          ...layoutState,
          staticConfigMobileActive: !layoutState.staticConfigMobileActive,
        },
      });
    }
  },

  onBottombarToggle: () => {
    const { layoutState, isOverlay, isDesktop } = get();

    if (isOverlay()) {
      set({
        layoutState: {
          ...layoutState,
          overlayBottombarActive: !layoutState.overlayBottombarActive,
        },
      });
    } else if (isDesktop()) {
      set({
        layoutState: {
          ...layoutState,
          staticBottombarDesktopInactive:
            !layoutState.staticBottombarDesktopInactive,
        },
      });
    } else {
      set({
        layoutState: {
          ...layoutState,
          staticBottombarMobileHide: !layoutState.staticBottombarMobileHide,
        },
      });
    }
  },

  onTopbarToggle: () =>
    set((state) => ({
      layoutState: {
        ...state.layoutState,
        topbarAutoHide: !state.layoutState.topbarAutoHide,
      },
    })),

  onNavbarStickyToggle: () =>
    set((state) => ({
      layoutState: {
        ...state.layoutState,
        navbarStickyToggle: !state.layoutState.navbarStickyToggle,
      },
    })),

  onBottombarStickyToggle: () =>
    set((state) => ({
      layoutState: {
        ...state.layoutState,
        bottombarStickyToggle: !state.layoutState.bottombarStickyToggle,
      },
    })),

  onSidebarAutoOverlayToggle: () =>
    set((state) => ({
      layoutState: {
        ...state.layoutState,
        sidebarAutoOverlayActive: !state.layoutState.sidebarAutoOverlayActive,
      },
    })),

  showProfileSidebar: () =>
    set((state) => ({
      layoutState: {
        ...state.layoutState,
        profileSidebarVisible: !state.layoutState.profileSidebarVisible,
      },
    })),

  // Utility functions
  isOverlay: () => get().layoutConfig.menuMode === 'overlay',
  isDesktop: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 991;
  },
}));

// Export hooks for easier access
export const useLayoutConfig = () =>
  useLayoutStore((state) => state.layoutConfig);
export const useLayoutState = () =>
  useLayoutStore((state) => state.layoutState);
export const useActiveMenu = () => useLayoutStore((state) => state.activeMenu);
export const useSetLayoutConfig = () =>
  useLayoutStore((state) => state.setLayoutConfig);
export const useSetLayoutState = () =>
  useLayoutStore((state) => state.setLayoutState);
export const useSetActiveMenu = () =>
  useLayoutStore((state) => state.setActiveMenu);

// ========== INDIVIDUAL ACTION HOOKS - For Backward Compatibility ==========
export const useOnMenuToggle = () =>
  useLayoutStore((state) => state.onMenuToggle);
export const useOnConfigToggle = () =>
  useLayoutStore((state) => state.onConfigToggle);
export const useOnBottombarToggle = () =>
  useLayoutStore((state) => state.onBottombarToggle);
export const useOnTopbarToggle = () =>
  useLayoutStore((state) => state.onTopbarToggle);
export const useOnNavbarStickyToggle = () =>
  useLayoutStore((state) => state.onNavbarStickyToggle);
export const useOnBottombarStickyToggle = () =>
  useLayoutStore((state) => state.onBottombarStickyToggle);
export const useOnSidebarAutoOverlayToggle = () =>
  useLayoutStore((state) => state.onSidebarAutoOverlayToggle);
export const useShowProfileSidebar = () =>
  useLayoutStore((state) => state.showProfileSidebar);

// ========== GROUPED ACTION HOOKS - Reduced Bundle Size ==========
export const useLayoutActions = () =>
  useLayoutStore((state) => ({
    onMenuToggle: state.onMenuToggle,
    onConfigToggle: state.onConfigToggle,
    onBottombarToggle: state.onBottombarToggle,
    onTopbarToggle: state.onTopbarToggle,
    showProfileSidebar: state.showProfileSidebar,
  }));

export const useLayoutStickyActions = () =>
  useLayoutStore((state) => ({
    onNavbarStickyToggle: state.onNavbarStickyToggle,
    onBottombarStickyToggle: state.onBottombarStickyToggle,
    onSidebarAutoOverlayToggle: state.onSidebarAutoOverlayToggle,
  }));

export const useLayoutUtils = () =>
  useLayoutStore((state) => ({
    isOverlay: state.isOverlay,
    isDesktop: state.isDesktop,
  }));


// ========== PERFORMANCE-OPTIMIZED SELECTORS ==========
export const useLayoutSelector = <T>(selector: (state: LayoutStore) => T) =>
  useLayoutStore(selector);

// ========== COMPUTED STATE HOOKS - Memoized ==========
export const useIsMenuActive = () =>
  useLayoutStore(
    (state) =>
      state.layoutState.overlayMenuActive ||
      state.layoutState.staticMenuMobileActive ||
      !state.layoutState.staticMenuDesktopInactive
  );

export const useIsConfigActive = () =>
  useLayoutStore(
    (state) =>
      state.layoutState.overlayConfigActive ||
      state.layoutState.staticConfigMobileActive ||
      !state.layoutState.staticConfigDesktopInactive
  );

// ============================================================================
// CACHE MANAGEMENT UTILITIES
// ============================================================================

// Clear all cached layout data
export const clearLayoutCache = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('layout-store');
    // Force reload the store with default values
    const store = useLayoutStore.getState();
    store.setLayoutConfig(defaultLayoutConfig);
    store.setLayoutState(defaultLayoutState);
    store.setActiveMenu('');
  }
};

// Export current layout state for backup
export const exportLayoutState = () => {
  const state = useLayoutStore.getState();
  return {
    layoutConfig: state.layoutConfig,
    layoutState: state.layoutState,
    activeMenu: state.activeMenu,
    timestamp: new Date().toISOString(),
  };
};

// Import layout state from backup
export const importLayoutState = (backupData: {
  layoutConfig: LayoutConfig;
  layoutState: LayoutState;
  activeMenu: string;
}) => {
  const { setLayoutConfig, setLayoutState, setActiveMenu } =
    useLayoutStore.getState();
  setLayoutConfig(backupData.layoutConfig);
  setLayoutState(backupData.layoutState);
  setActiveMenu(backupData.activeMenu);
};

// Check if layout cache exists
export const hasLayoutCache = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('layout-store') !== null;
  }
  return false;
};

// Get cache size in bytes
export const getLayoutCacheSize = (): number => {
  if (typeof window !== 'undefined') {
    const cache = localStorage.getItem('layout-store');
    return cache ? new Blob([cache]).size : 0;
  }
  return 0;
};

// ============================================================================
// RESPONSIVE BEHAVIOR INITIALIZATION
// ============================================================================
if (typeof window !== 'undefined') {
  const handleResize = () => {
    const { setLayoutConfig, isDesktop } = useLayoutStore.getState();
    if (!isDesktop()) {
      setLayoutConfig({ menuMode: 'overlay' });
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Initial check
}

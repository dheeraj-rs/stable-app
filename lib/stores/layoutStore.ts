import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LayoutConfig, LayoutState } from '@/types';

// Types
type LayoutStore = {
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
};

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

// Create the store with persistence
// Helper to check if we're on the client
const isClient = typeof window !== 'undefined';

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set, get) => ({
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
              staticConfigDesktopInactive:
                !layoutState.staticConfigDesktopInactive,
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
        const { layoutState, isDesktop } = get();

        if (isDesktop()) {
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
            sidebarAutoOverlayActive:
              !state.layoutState.sidebarAutoOverlayActive,
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
        if (!isClient) return true; // Default to desktop on server
        return window.innerWidth > 991;
      },
    }),
    {
      name: 'layout-storage',
      storage: isClient ? createJSONStorage(() => localStorage) : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      },
      partialize: (state) => ({
        layoutConfig: state.layoutConfig,
        layoutState: state.layoutState,
        activeMenu: state.activeMenu,
      }),
      // Skip hydration on the server
      skipHydration: !isClient,
      // Only rehydrate on the client
      onRehydrateStorage: () => (state) => {
        if (state && isClient) {
          // Ensure we have valid values after rehydration
          state.layoutConfig = { ...defaultLayoutConfig, ...state.layoutConfig };
          state.layoutState = { ...defaultLayoutState, ...state.layoutState };
        }
      },
    }
  )
);

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

// Action hooks
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

// Grouped action hooks
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

// Cache utilities
export const clearLayoutCache = () => {
  if (typeof window !== 'undefined') {
    useLayoutStore.persist.clearStorage();
    const store = useLayoutStore.getState();
    store.setLayoutConfig(defaultLayoutConfig);
    store.setLayoutState(defaultLayoutState);
    store.setActiveMenu('');
  }
};

export const exportLayoutState = () => {
  const state = useLayoutStore.getState();
  return {
    layoutConfig: state.layoutConfig,
    layoutState: state.layoutState,
    activeMenu: state.activeMenu,
    timestamp: new Date().toISOString(),
  };
};

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

export const hasLayoutCache = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('layout-storage') !== null;
  }
  return false;
};

export const getLayoutCacheSize = (): number => {
  if (typeof window !== 'undefined') {
    const cache = localStorage.getItem('layout-storage');
    return cache ? new Blob([cache]).size : 0;
  }
  return 0;
};

// Responsive behavior
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

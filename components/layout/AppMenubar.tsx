import { menuItems } from '@/public/demo/data/menuItems';
import { AppMenuItem } from '@/types';
import React, { RefObject, useRef, useState, useEffect } from 'react';
import AppMenuitem from './AppMenuitem';
import AppMenuSearch from './AppMenuSearch';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useTranslatedMenuItems } from '@/hooks/useTranslatedMenuItems';
import { useLayoutState } from '@/lib/stores/layoutStore';

const AppMenubar = ({ menubarRef }: { menubarRef: React.RefObject<HTMLDivElement> }) => {
    const searchRef = useRef<HTMLDivElement>(null);
    const layoutState = useLayoutState();
    const filteredMenuItems = useMenuItems();
    const [isClient, setIsClient] = useState(false);

    // Ensure we're on the client side to prevent hydration mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Use filtered menu items if available and client-side, otherwise fall back to search results or original menu
    const originalItems: AppMenuItem[] = layoutState?.searchSidebarItems?.length
        ? (layoutState.searchSidebarItems as AppMenuItem[])
        : (isClient && filteredMenuItems.length > 0)
            ? filteredMenuItems
            : menuItems;

    // Translate the menu items
    const items = useTranslatedMenuItems(originalItems);

    return (
        <ul className="layout-menu">
            {items.map((item, i) => {
                return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
            })}
            <AppMenuSearch searchRef={searchRef as unknown as RefObject<HTMLDivElement>} menubarRef={menubarRef as unknown as RefObject<HTMLDivElement>} />
        </ul>
    );
};

export default AppMenubar;

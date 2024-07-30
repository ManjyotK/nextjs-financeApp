"use client";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import { usePathname } from "next/navigation";

/**
 * SiteNav component renders the navigation bar for the site.
 * It uses the NextUI library for styling.
 * The component is a functional component that uses React hooks.
 */

export default function App() {
  // State hook to manage the menu open state.
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // Hook to get the current pathname.
  const pathname:string = usePathname();

  // Array of menu items.
  const menuItems = [
    "Dashboard",
    "Categories",
    "Transactions"
  ];

  /**
   * Renders the navigation bar.
   * @returns {JSX.Element} The navigation bar component.
   */
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      {/* Navigation bar content for small screens */}
      <NavbarContent>
        {/* Menu toggle button */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        {/* Navigation brand link */}
        <NavbarBrand>
          <Link href="/" color="foreground" size="lg">
          <p className="font-bold text-inherit">Home</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation bar content for medium and larger screens */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Renders menu items */}
        {menuItems.map((item) => (
          <NavbarItem isActive={pathname === item} key={item}>
            {/* Link for each menu item */}
            <Link color={pathname === "/" + item.toLowerCase() ? "primary" : "foreground"}
              href={`/${item.toLowerCase()}`}>
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      {/* Right aligned content */}
      <NavbarContent justify="end">
        <div className="invisible sm:visible"> </div>
      </NavbarContent>
      {/* Dropdown menu for large screens */}
      <NavbarMenu>
        {/* Renders menu items */}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {/* Link for each menu item */}
            <Link
              color={
                index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

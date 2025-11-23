// Basic NavigationMenu component using Radix UI and Tailwind
import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';

export const NavigationMenu = NavigationMenuPrimitive.Root;
export const NavigationMenuList = NavigationMenuPrimitive.List;
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger;
export const NavigationMenuContent = NavigationMenuPrimitive.Content;
export const NavigationMenuLink = NavigationMenuPrimitive.Link;

export function navigationMenuTriggerStyle() {
  return 'px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors';
}
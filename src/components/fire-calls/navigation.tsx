'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Phone,
  Map,
  Settings,
  Users,
  FileText,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  activeCallsCount?: number;
  className?: string;
}

export function Navigation({ activeCallsCount = 0, className }: NavigationProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      href: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      active: pathname === '/'
    },
    {
      href: '/calls',
      label: 'Active Calls',
      icon: Phone,
      active: pathname === '/calls',
      badge: activeCallsCount > 0 ? activeCallsCount.toString() : undefined
    },
    {
      href: '/map',
      label: 'Map View',
      icon: Map,
      active: pathname === '/map'
    },
    {
      href: '/units',
      label: 'Units',
      icon: Users,
      active: pathname === '/units'
    },
    {
      href: '/reports',
      label: 'Reports',
      icon: FileText,
      active: pathname === '/reports'
    },
    {
      href: '/alerts',
      label: 'Alerts',
      icon: Bell,
      active: pathname === '/alerts'
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
      active: pathname === '/settings'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Navigation sidebar */}
      <nav
        className={cn(
          'fixed left-0 top-0 z-30 h-full w-64 transform bg-card border-r border-border transition-transform duration-200 ease-in-out',
          isCollapsed && '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-fire-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🔥</span>
            </div>
            <div>
              <h1 className="font-bold text-foreground">Fire Dept</h1>
              <p className="text-xs text-muted-foreground">Command Center</p>
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="lg:hidden p-1 hover:bg-muted rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted',
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setIsCollapsed(true)}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge
                  variant="outline"
                  className="ml-auto text-xs px-1.5 py-0.5 bg-fire-red/10 text-fire-red border-fire-red"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <div>Vigilance Fire Department</div>
            <div className="mt-1">Emergency Response System</div>
          </div>
        </div>
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className={cn(
          'fixed top-4 left-4 z-40 p-2 bg-card border border-border rounded-lg shadow-lg lg:hidden transition-transform',
          !isCollapsed && 'translate-x-64'
        )}
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Main content spacer */}
      <div className="lg:ml-64" />
    </>
  );
}
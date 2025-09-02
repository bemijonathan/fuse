'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navigationItems = [
        {
            name: 'Workflow Builder',
            href: '/',
            icon: (
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            description: 'Build and manage healthcare workflows'
        },
        {
            name: 'Workflows',
            href: '/workflows',
            icon: (
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            description: 'View and manage created workflows'
        },
        {
            name: 'Audit Logs',
            href: '/logs',
            icon: (
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            description: 'Monitor system activities and logs'
        }
    ];

    const quickActions = [
        {
            name: 'New Workflow',
            icon: '➕',
            action: () => console.log('New workflow'),
            color: 'btn-primary'
        },
        {
            name: 'Import',
            icon: '📥',
            action: () => console.log('Import'),
            color: 'btn-secondary'
        },
        {
            name: 'Export',
            icon: '📤',
            action: () => console.log('Export'),
            color: 'btn-accent'
        }
    ];

    return (
        <div className="min-h-screen bg-base-200">
            {/* Top Navigation Bar */}
            <div className="navbar bg-base-100 shadow-lg border-b border-base-200 sticky top-0 z-50">
                <div className="navbar-start">
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="btn btn-ghost btn-circle lg:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="text-xl font-bold text-primary">
                            🔗 Fuse
                        </div>
                        <div className="hidden sm:block text-sm opacity-60">
                            Healthcare Workflow Orchestrator
                        </div>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <div role="tablist" className="tabs tabs-boxed">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                role="tab"
                                className={`tab gap-2 ${pathname === item.href ? 'tab-active' : ''}`}
                            >
                                {item.icon}
                                <span className="hidden xl:inline">{item.name}</span>
                                <span className="xl:hidden">{item.name.split(' ')[0]}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="flex items-center gap-3">
                        <div className="badge badge-success badge-sm">
                            <span className="hidden sm:inline">HIPAA Compliant</span>
                            <span className="sm:hidden">✓</span>
                        </div>

                        {/* Quick Actions Dropdown */}
                        <div className="dropdown dropdown-end">
                            <button type="button" tabIndex={0} className="btn btn-ghost btn-circle">
                                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                </svg>
                            </button>
                            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow-lg border border-base-200">
                                {quickActions.map((action) => (
                                    <li key={action.name}>
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${action.color} w-full justify-start gap-2`}
                                            onClick={action.action}
                                        >
                                            <span>{action.icon}</span>
                                            {action.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* User Menu */}
                        <div className="dropdown dropdown-end">
                            <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    👤
                                </div>
                            </button>
                            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-200">
                                <li><button type="button" className="text-sm">Profile Settings</button></li>
                                <li><button type="button" className="text-sm">Organization</button></li>
                                <li><button type="button" className="text-sm">Security</button></li>
                                <div className="divider my-1"></div>
                                <li><button type="button" className="text-sm text-error">Sign Out</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="flex flex-col h-full pt-16 lg:pt-0">
                        {/* Sidebar Header */}
                        <div className="p-4 border-b border-base-200">
                            <h2 className="text-lg font-semibold text-base-content">Navigation</h2>
                        </div>

                        {/* Navigation Items */}
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                                        pathname === item.href
                                            ? 'bg-primary text-primary-content shadow-md'
                                            : 'hover:bg-base-200 text-base-content'
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <div className={`flex-shrink-0 ${
                                        pathname === item.href ? 'text-primary-content' : 'text-base-content/70 group-hover:text-base-content'
                                    }`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm">{item.name}</div>
                                        <div className={`text-xs mt-0.5 ${
                                            pathname === item.href
                                                ? 'text-primary-content/80'
                                                : 'text-base-content/50 group-hover:text-base-content/70'
                                        }`}>
                                            {item.description}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </nav>

                        {/* Sidebar Footer */}
                        <div className="p-4 border-t border-base-200">
                            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                                    👤
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-base-content">Healthcare Admin</div>
                                    <div className="text-xs text-base-content/60">admin@fuse-health.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <button
                        type="button"
                        className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 lg:ml-0">
                    <main className="min-h-screen">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

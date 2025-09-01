'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
    currentPage: 'flow' | 'logs';
}

export default function Navigation({ currentPage }: NavigationProps) {
    const pathname = usePathname();

    return (
        <div className="navbar bg-base-100 shadow-lg border-b border-base-200">
            <div className="navbar-start">
                <div className="flex items-center gap-4">
                    <div className="text-xl font-bold text-primary">
                        🔗 Fuse
                    </div>
                    <div className="hidden sm:block text-sm opacity-60">
                        Healthcare Workflow Orchestrator
                    </div>
                </div>
            </div>

            <div className="navbar-center">
                <div role="tablist" className="tabs tabs-boxed">
                    <Link
                        href="/"
                        role="tab"
                        className={`tab gap-2 ${currentPage === 'flow' ? 'tab-active' : ''}`}
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="hidden sm:inline">Workflow Builder</span>
                        <span className="sm:hidden">Builder</span>
                    </Link>
                    <Link
                        href="/logs"
                        role="tab"
                        className={`tab gap-2 ${currentPage === 'logs' ? 'tab-active' : ''}`}
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="hidden sm:inline">Audit Logs</span>
                        <span className="sm:hidden">Logs</span>
                    </Link>
                </div>
            </div>

            <div className="navbar-end">
                <div className="flex items-center gap-3">
                    <div className="badge badge-success badge-sm">
                        <span className="hidden sm:inline">HIPAA Compliant</span>
                        <span className="sm:hidden">✓</span>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                👤
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-200">
                            <li><a className="text-sm">Profile Settings</a></li>
                            <li><a className="text-sm">Organization</a></li>
                            <li><a className="text-sm">Security</a></li>
                            <div className="divider my-1"></div>
                            <li><a className="text-sm text-error">Sign Out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

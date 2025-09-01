'use client';

import { LogFilter } from './types';

interface LogsFiltersProps {
    filters: LogFilter;
    onFiltersChange: (filters: LogFilter) => void;
    totalLogs: number;
    filteredCount: number;
}

export default function LogsFilters({
    filters,
    onFiltersChange,
    totalLogs,
    filteredCount
}: LogsFiltersProps) {

    const updateFilter = (key: keyof LogFilter, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-lg mb-4">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                    Filters
                </h2>

                {/* Results Count */}
                <div className="stats stats-vertical shadow-sm mb-4">
                    <div className="stat py-3">
                        <div className="stat-title text-xs">Showing</div>
                        <div className="stat-value text-lg">{filteredCount}</div>
                        <div className="stat-desc">of {totalLogs} total logs</div>
                    </div>
                </div>

                {/* Search */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Search</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Search workflows, patients, organizations..."
                        className="input input-bordered input-sm"
                        value={filters.searchTerm}
                        onChange={(e) => updateFilter('searchTerm', e.target.value)}
                    />
                </div>

                {/* Status Filter */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Status</span>
                    </label>
                    <select
                        className="select select-bordered select-sm"
                        value={filters.status}
                        onChange={(e) => updateFilter('status', e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="completed">✅ Completed</option>
                        <option value="running">🔄 Running</option>
                        <option value="error">❌ Error</option>
                        <option value="cancelled">⏹️ Cancelled</option>
                    </select>
                </div>

                {/* Date Range */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Date Range</span>
                    </label>
                    <select
                        className="select select-bordered select-sm"
                        value={filters.dateRange}
                        onChange={(e) => updateFilter('dateRange', e.target.value)}
                    >
                        <option value="all">All Time</option>
                        <option value="1d">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                </div>

                {/* Node Type */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Integration Type</span>
                    </label>
                    <select
                        className="select select-bordered select-sm"
                        value={filters.nodeType}
                        onChange={(e) => updateFilter('nodeType', e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="trigger">🎯 Triggers</option>
                        <option value="action">⚡ Actions</option>
                        <option value="condition">🔀 Conditions</option>
                        <option value="integration">🔗 Integrations</option>
                    </select>
                </div>

                {/* Clear Filters */}
                <div className="card-actions">
                    <button
                        className="btn btn-outline btn-sm w-full"
                        onClick={() => onFiltersChange({
                            status: 'all',
                            dateRange: 'all',
                            nodeType: 'all',
                            searchTerm: ''
                        })}
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}

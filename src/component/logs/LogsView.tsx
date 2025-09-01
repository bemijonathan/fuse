'use client';

import { useState } from 'react';
import Navigation from '@/component/shared/Navigation';
import LogsList from './LogsList';
import LogsFilters from './LogsFilters';
import LogDetails from './LogDetails';
import { mockWorkflowLogs, WorkflowLog, LogFilter } from './types';

export default function LogsView() {
    const [logs] = useState<WorkflowLog[]>(mockWorkflowLogs);
    const [filteredLogs, setFilteredLogs] = useState<WorkflowLog[]>(logs);
    const [selectedLog, setSelectedLog] = useState<WorkflowLog | null>(null);
    const [filters, setFilters] = useState<LogFilter>({
        status: 'all',
        dateRange: 'all',
        nodeType: 'all',
        searchTerm: ''
    });

    const handleFilterChange = (newFilters: LogFilter) => {
        setFilters(newFilters);

        let filtered = logs;

        // Filter by status
        if (newFilters.status !== 'all') {
            filtered = filtered.filter(log => log.status === newFilters.status);
        }

        // Filter by node type
        if (newFilters.nodeType !== 'all') {
            filtered = filtered.filter(log =>
                log.steps.some(step => step.nodeType === newFilters.nodeType)
            );
        }

        // Filter by search term
        if (newFilters.searchTerm) {
            const searchLower = newFilters.searchTerm.toLowerCase();
            filtered = filtered.filter(log =>
                log.workflowId.toLowerCase().includes(searchLower) ||
                log.patientId?.toLowerCase().includes(searchLower) ||
                log.organizationName.toLowerCase().includes(searchLower) ||
                log.steps.some(step =>
                    step.action.toLowerCase().includes(searchLower) ||
                    step.details.toLowerCase().includes(searchLower)
                )
            );
        }

        // Filter by date range
        const now = new Date();
        if (newFilters.dateRange !== 'all') {
            const days = {
                '1d': 1,
                '7d': 7,
                '30d': 30
            }[newFilters.dateRange] || 0;

            if (days > 0) {
                const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(log => new Date(log.startTime) >= cutoff);
            }
        }

        setFilteredLogs(filtered);
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navigation currentPage="logs" />

            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Workflow Audit Logs</h1>
                    <p className="text-base-content/70">
                        Complete audit trail of healthcare workflow executions with HIPAA-compliant logging
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <LogsFilters
                            filters={filters}
                            onFiltersChange={handleFilterChange}
                            totalLogs={logs.length}
                            filteredCount={filteredLogs.length}
                        />
                    </div>

                    {/* Logs List with Accordion History */}
                    <div className="lg:col-span-3">
                        <LogsList
                            logs={filteredLogs}
                            selectedLogId={selectedLog?.id}
                            onLogSelect={setSelectedLog}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

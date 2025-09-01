'use client';

import { useState } from 'react';
import { WorkflowLog } from './types';

interface LogsListProps {
    logs: WorkflowLog[];
    selectedLogId?: string;
    onLogSelect: (log: WorkflowLog) => void;
}

export default function LogsList({ logs, selectedLogId, onLogSelect }: LogsListProps) {
    const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
    const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

    const formatDuration = (seconds?: number) => {
        if (!seconds) return 'N/A';
        return `${seconds.toFixed(1)}`;
    };

    const formatTime = (timeString: string) => {
        return new Date(timeString).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusIndicator = (status: WorkflowLog['status']) => {
        if (status === 'completed') return { color: 'bg-green-500', icon: '✓' };
        if (status === 'running') return { color: 'bg-blue-500 animate-pulse', icon: '○' };
        if (status === 'error') return { color: 'bg-red-500', icon: '!' };
        if (status === 'cancelled') return { color: 'bg-yellow-500', icon: '⏸' };
        return { color: 'bg-gray-400', icon: '○' };
    };

    const toggleLogExpansion = (logId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        const newExpanded = new Set(expandedLogs);
        if (newExpanded.has(logId)) {
            newExpanded.delete(logId);
        } else {
            newExpanded.add(logId);
        }
        setExpandedLogs(newExpanded);
    };

    const toggleStepExpansion = (stepId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        const newExpanded = new Set(expandedSteps);
        if (newExpanded.has(stepId)) {
            newExpanded.delete(stepId);
        } else {
            newExpanded.add(stepId);
        }
        setExpandedSteps(newExpanded);
    };

    const copyToClipboard = (text: string, event: React.MouseEvent) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text);
    };

    if (logs.length === 0) {
        return (
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body text-center py-12">
                    <div className="text-6xl mb-4 opacity-50">📋</div>
                    <h3 className="text-lg font-medium mb-2">No Logs Found</h3>
                    <p className="text-base-content/60">
                        No workflow logs match your current filters. Try adjusting your search criteria.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-0">
                {/* Header */}
                <div className="p-4 border-b border-base-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Workflow Executions</h2>
                        <div className="text-sm opacity-60">
                            {logs.length} result{logs.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>

                {/* Accordion List */}
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                    {logs.map((log) => {
                        const indicator = getStatusIndicator(log.status);
                        const isExpanded = expandedLogs.has(log.id);

                        return (
                            <div key={log.id} className="border-b border-base-200 last:border-b-0">
                                {/* Main Log Entry */}
                                <div
                                    className={`hover:bg-base-50 cursor-pointer transition-colors ${selectedLogId === log.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                        }`}
                                    onClick={() => onLogSelect(log)}
                                >
                                    <div className="p-4">
                                        <div className="flex items-start gap-3">
                                            {/* Status Indicator */}
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mt-1 ${indicator.color}`}>
                                                {indicator.icon}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-medium text-sm truncate">
                                                        {log.status === 'error' ? 'Unknown error name' :
                                                            log.status === 'completed' ? 'Workflow executed' :
                                                                'Workflow executing'}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs opacity-60">
                                                            {formatTime(log.startTime)}
                                                        </span>
                                                        <button
                                                            className="btn btn-ghost btn-xs"
                                                            onClick={(e) => toggleLogExpansion(log.id, e)}
                                                        >
                                                            {isExpanded ? 'Show less' : 'Show more'} ↓
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Basic Info */}
                                                <div className="text-sm space-y-1">
                                                    <div><span className="font-medium">Status:</span> {log.status}</div>
                                                    <div><span className="font-medium">Workflow:</span> {log.workflowName}</div>
                                                    <div><span className="font-medium">Organization:</span> {log.organizationName}</div>
                                                    <div><span className="font-medium">Runtime (in seconds):</span> {formatDuration(log.duration)}</div>
                                                    {log.patientId && (
                                                        <div><span className="font-medium">Patient ID:</span> {log.patientId}</div>
                                                    )}
                                                </div>

                                                {/* Progress Bar for Running */}
                                                {log.status === 'running' && (
                                                    <div className="mt-3">
                                                        <progress
                                                            className="progress progress-primary w-full h-1"
                                                            value={log.metadata.completedSteps}
                                                            max={log.metadata.totalSteps}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Run History */}
                                {isExpanded && (
                                    <div className="bg-base-50">
                                        {/* Steps Timeline */}
                                        <div className="space-y-0">
                                            {log.steps.map((step, index) => {
                                                const stepIndicator = getStatusIndicator(step.status);
                                                const isStepExpanded = expandedSteps.has(step.id);

                                                return (
                                                    <div key={step.id} className="border-b border-base-200 last:border-b-0">
                                                        <div
                                                            className="p-4 hover:bg-base-100 cursor-pointer flex items-start gap-3"
                                                            onClick={(e) => toggleStepExpansion(step.id, e)}
                                                        >
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mt-1 ${stepIndicator.color}`}>
                                                                {stepIndicator.icon}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h4 className={`font-medium ${step.status === 'error' ? 'text-red-600' : ''}`}>
                                                                        {step.nodeName} {step.status === 'error' ? 'failed' : step.status}
                                                                    </h4>
                                                                    <span className="text-sm opacity-60">
                                                                        {formatTime(step.startTime)}
                                                                    </span>
                                                                    <button className="btn btn-ghost btn-xs ml-auto">
                                                                        {isStepExpanded ? '↑' : '↓'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {isStepExpanded && (
                                                            <div className="px-4 pb-4 ml-9">
                                                                <div className="bg-base-100 border border-base-200 rounded-lg p-4">
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <p className="text-sm font-mono text-gray-600 flex-1">
                                                                            {step.errorMessage || step.details}
                                                                        </p>
                                                                        <button
                                                                            className="btn btn-outline btn-xs ml-3"
                                                                            onClick={(e) => copyToClipboard(step.errorMessage || step.details, e)}
                                                                        >
                                                                            Copy error
                                                                        </button>
                                                                    </div>

                                                                    {step.errorMessage && (
                                                                        <div className="text-xs font-mono bg-red-50 p-3 rounded border border-red-200 overflow-x-auto">
                                                                            <div className="whitespace-pre-wrap break-words">
                                                                                {step.errorMessage}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Developer info for this step */}
                                                                <div className="mt-3">
                                                                    <details className="group">
                                                                        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                                                                            Developer info ↓
                                                                        </summary>
                                                                        <div className="mt-2 text-xs space-y-1 bg-base-100 p-3 rounded border">
                                                                            <div><span className="font-medium">Step ID:</span> {step.id}</div>
                                                                            <div><span className="font-medium">Node Type:</span> {step.nodeType}</div>
                                                                            <div><span className="font-medium">Action:</span> {step.action}</div>
                                                                            <div><span className="font-medium">Duration:</span> {formatDuration(step.duration)}s</div>
                                                                            {step.metadata && (
                                                                                <div className="mt-2">
                                                                                    <span className="font-medium">Metadata:</span>
                                                                                    <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-x-auto">
                                                                                        {JSON.stringify(step.metadata, null, 2)}
                                                                                    </pre>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </details>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Global Developer Info */}
                                        <div className="p-4 border-t border-base-200">
                                            <details className="group">
                                                <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                                                    Developer info ↓
                                                </summary>
                                                <div className="mt-3 text-xs space-y-2 bg-base-100 p-3 rounded border">
                                                    <div><span className="font-medium">Session ID:</span> {log.metadata.sessionId}</div>
                                                    <div><span className="font-medium">IP Address:</span> {log.metadata.ipAddress}</div>
                                                    <div><span className="font-medium">User Agent:</span> {log.metadata.userAgent}</div>
                                                    <div><span className="font-medium">User Role:</span> {log.userRole}</div>
                                                    <div><span className="font-medium">Total Steps:</span> {log.metadata.totalSteps}</div>
                                                    <div><span className="font-medium">Completed Steps:</span> {log.metadata.completedSteps}</div>
                                                    <div><span className="font-medium">Error Steps:</span> {log.metadata.errorSteps}</div>
                                                </div>
                                            </details>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
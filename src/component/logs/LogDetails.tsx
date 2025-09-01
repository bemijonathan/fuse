'use client';

import { useState } from 'react';
import { WorkflowLog, WorkflowStep } from './types';

interface LogDetailsProps {
    log: WorkflowLog | null;
    onClose: () => void;
}

export default function LogDetails({ log, onClose }: LogDetailsProps) {
    const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
    const [showDevInfo, setShowDevInfo] = useState(false);

    if (!log) {
        return (
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body text-center py-12">
                    <div className="text-4xl mb-4 opacity-50">👆</div>
                    <h3 className="text-lg font-medium mb-2">Select a Log</h3>
                    <p className="text-sm opacity-60">
                        Choose a workflow execution from the list to view detailed audit information.
                    </p>
                </div>
            </div>
        );
    }

    const toggleStepExpansion = (stepId: string) => {
        const newExpanded = new Set(expandedSteps);
        if (newExpanded.has(stepId)) {
            newExpanded.delete(stepId);
        } else {
            newExpanded.add(stepId);
        }
        setExpandedSteps(newExpanded);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const getStatusIndicator = (status: string) => {
        if (status === 'completed') return { color: 'bg-green-500', icon: '✓' };
        if (status === 'running') return { color: 'bg-blue-500 animate-pulse', icon: '○' };
        if (status === 'error') return { color: 'bg-red-500', icon: '!' };
        return { color: 'bg-gray-400', icon: '○' };
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

    const formatDuration = (seconds?: number) => {
        if (!seconds) return 'N/A';
        return `${seconds.toFixed(1)}`;
    };

    return (
        <div className="card bg-base-100 shadow-lg h-full">
            <div className="card-body p-0 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-base-200">
                    <div>
                        <h2 className="font-semibold text-base">Run history</h2>
                        <p className="text-sm opacity-60">{log.workflowName}</p>
                    </div>
                    <button
                        className="btn btn-ghost btn-sm btn-circle"
                        onClick={onClose}
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Main Workflow Status */}
                    <div className="p-4 border-b border-base-200">
                        <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mt-1 ${getStatusIndicator(log.status).color
                                }`}>
                                {getStatusIndicator(log.status).icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium">
                                        {log.status === 'error' ? 'Unknown error name' :
                                            log.status === 'completed' ? 'Workflow executed' :
                                                'Workflow executing'}
                                    </h3>
                                    <span className="text-sm opacity-60">
                                        {formatTime(log.startTime)}
                                    </span>
                                    <button
                                        className="btn btn-ghost btn-xs ml-auto"
                                        onClick={() => setShowDevInfo(!showDevInfo)}
                                    >
                                        {showDevInfo ? 'Show less' : 'Show more'} ↓
                                    </button>
                                </div>

                                {showDevInfo && (
                                    <div className="mt-3 space-y-2 text-sm">
                                        <div><span className="font-medium">Status:</span> {log.status}</div>
                                        <div><span className="font-medium">Workflow ID:</span> {log.workflowId}</div>
                                        <div><span className="font-medium">Organization:</span> {log.organizationName}</div>
                                        <div><span className="font-medium">Runtime (in seconds):</span> {formatDuration(log.duration)}</div>
                                        {log.patientId && (
                                            <div><span className="font-medium">Patient ID:</span> {log.patientId}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-0">
                        {log.steps.map((step, index) => {
                            const isExpanded = expandedSteps.has(step.id);
                            const stepStatus = getStatusIndicator(step.status);

                            return (
                                <div key={step.id} className="border-b border-base-200 last:border-b-0">
                                    <div
                                        className="p-4 hover:bg-base-50 cursor-pointer flex items-start gap-3"
                                        onClick={() => toggleStepExpansion(step.id)}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mt-1 ${stepStatus.color}`}>
                                            {stepStatus.icon}
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
                                                    {isExpanded ? '↑' : '↓'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-4 pb-4 ml-9">
                                            <div className="bg-base-100 border border-base-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-3">
                                                    <p className="text-sm font-mono text-gray-600 flex-1">
                                                        {step.errorMessage || step.details}
                                                    </p>
                                                    <button
                                                        className="btn btn-outline btn-xs ml-3"
                                                        onClick={() => copyToClipboard(step.errorMessage || step.details)}
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
                                                    <div className="mt-2 text-xs space-y-1 bg-base-50 p-3 rounded border">
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
                            <div className="mt-3 text-xs space-y-2 bg-base-50 p-3 rounded border">
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
            </div>
        </div>
    );
}
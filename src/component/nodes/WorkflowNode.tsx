import { Handle, Position } from '@xyflow/react';

interface WorkflowNodeData {
    label: string;
    description?: string;
    type?: string;
    status?: string;
    executionStatus?: 'running' | 'completed' | 'error';
    currentStep?: string;
    settings?: Record<string, unknown>;
}

interface WorkflowNodeProps {
    data: WorkflowNodeData;
    isConnectable: boolean;
    onClick?: () => void;
}

export default function WorkflowNode({ data, isConnectable, onClick }: WorkflowNodeProps) {
    const getCardStyle = () => {
        switch (data.executionStatus) {
            case 'running':
                return 'card bg-gradient-to-br from-warning/15 to-warning/5 shadow-lg border border-warning/40 animate-pulse';
            case 'completed':
                return 'card bg-gradient-to-br from-success/15 to-success/5 shadow-md border border-success/40';
            case 'error':
                return 'card bg-gradient-to-br from-error/15 to-error/5 shadow-md border border-error/40';
            default:
                return 'card bg-gradient-to-br from-base-100 to-base-50 shadow-sm border border-base-200/60 hover:shadow-md';
        }
    };

    const getStatusBadge = () => {
        switch (data.executionStatus) {
            case 'running':
                return (
                    <div className="badge badge-xs badge-warning gap-1 font-medium">
                        <span className="loading loading-spinner loading-xs"></span>
                        <span className="text-xs">running</span>
                    </div>
                );
            case 'completed':
                return <div className="badge badge-xs badge-success font-medium text-xs">✓</div>;
            case 'error':
                return <div className="badge badge-xs badge-error font-medium text-xs">✗</div>;
            default:
                return <div className="badge badge-xs badge-outline font-medium text-xs">{data.status || 'ready'}</div>;
        }
    };

    return (
        <button
            type="button"
            className={`${getCardStyle()} w-44 cursor-pointer hover:shadow-lg hover:border-primary/30 hover:scale-105 transition-all duration-200 group text-left`}
            onClick={onClick}
        >
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="!bg-primary/80 !border-primary/40 !w-2 !h-2"
            />
            <div className="card-body p-2">
                <div className="flex items-center justify-between mb-1">
                    <div className={`badge badge-xs ${data.type === 'trigger' ? 'badge-success' : 'badge-primary'} font-medium gap-1`}>
                        <span className="text-xs">⚡</span>
                        <span>{data.type || 'action'}</span>
                    </div>
                    {getStatusBadge()}
                </div>
                <h3 className="text-xs font-semibold leading-tight mb-1 line-clamp-2">{data.label}</h3>
                {data.description && (
                    <p className="text-xs text-base-content/50 leading-tight line-clamp-2 mb-1">{data.description}</p>
                )}
                {data.executionStatus === 'running' && data.currentStep && (
                    <div className="text-xs text-warning/70 font-medium mb-1 italic line-clamp-1">
                        {data.currentStep}
                    </div>
                )}
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        type="button"
                        className="btn btn-xs btn-ghost p-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.();
                        }}
                        aria-label="Node settings"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="!bg-primary/80 !border-primary/40 !w-2 !h-2"
            />
        </button>
    );
}

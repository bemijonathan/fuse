import { Handle, Position } from '@xyflow/react';

interface TriggerNodeData {
    label: string;
    description?: string;
    type?: string;
    status?: string;
    executionStatus?: 'running' | 'completed' | 'error';
    currentStep?: string;
    settings?: Record<string, unknown>;
}

interface TriggerNodeProps {
    data: TriggerNodeData;
    isConnectable: boolean;
    onClick?: () => void;
}

export default function TriggerNode({ data, isConnectable, onClick }: TriggerNodeProps) {
    const getCardStyle = () => {
        switch (data.executionStatus) {
            case 'running':
                return 'card bg-gradient-to-br from-warning/15 to-warning/5 shadow-lg border border-warning/40 animate-pulse';
            case 'completed':
                return 'card bg-gradient-to-br from-success/20 to-success/10 shadow-md border border-success/50';
            case 'error':
                return 'card bg-gradient-to-br from-error/15 to-error/5 shadow-md border border-error/40';
            default:
                return 'card bg-gradient-to-br from-success/10 to-success/5 shadow-sm border border-success/30 hover:shadow-md';
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
                return <div className="badge badge-xs badge-outline font-medium text-xs">{data.status || 'active'}</div>;
        }
    };

    return (
        <button
            type="button"
            className={`${getCardStyle()} w-44 cursor-pointer hover:shadow-lg hover:border-success/50 hover:scale-105 transition-all duration-200 group text-left`}
            onClick={onClick}
        >
            <div className="card-body p-2">
                <div className="flex items-center justify-between mb-1">
                    <div className="badge badge-xs badge-success font-medium text-xs gap-1">
                        <span className="text-xs">🎯</span>
                        <span>trigger</span>
                    </div>
                    {getStatusBadge()}
                </div>
                <h3 className="text-xs font-semibold leading-tight mb-1 line-clamp-2 text-success-content">{data.label}</h3>
                {data.description && (
                    <p className="text-xs text-success-content/50 leading-tight line-clamp-2 mb-1">{data.description}</p>
                )}
                {data.executionStatus === 'running' && data.currentStep && (
                    <div className="text-xs text-warning/70 font-medium mb-1 italic line-clamp-1">
                        {data.currentStep}
                    </div>
                )}
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        type="button"
                        className="btn btn-xs btn-success btn-outline p-1"
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
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="!bg-success/80 !border-success/40 !w-2 !h-2"
            />
        </button>
    );
}

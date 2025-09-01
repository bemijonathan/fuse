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
                return 'card bg-warning/10 shadow-md border border-warning/30 animate-pulse';
            case 'completed':
                return 'card bg-success/15 shadow-md border border-success/40';
            case 'error':
                return 'card bg-error/10 shadow-md border border-error/30';
            default:
                return 'card bg-success/8 shadow-sm border border-success/25';
        }
    };

    const getStatusBadge = () => {
        switch (data.executionStatus) {
            case 'running':
                return (
                    <div className="badge badge-sm badge-warning gap-1 font-normal">
                        <span className="loading loading-spinner loading-xs"></span>
                        <span className="text-xs">running</span>
                    </div>
                );
            case 'completed':
                return <div className="badge badge-sm badge-success font-normal text-xs">completed</div>;
            case 'error':
                return <div className="badge badge-sm badge-error font-normal text-xs">error</div>;
            default:
                return <div className="badge badge-sm badge-outline font-normal text-xs">{data.status || 'active'}</div>;
        }
    };

    return (
        <div
            className={`${getCardStyle()} w-56 cursor-pointer hover:shadow-md hover:border-success/40 transition-all duration-200`}
            onClick={onClick}
        >
            <div className="card-body p-3">
                <div className="flex items-center gap-2 mb-2">
                    <div className="badge badge-sm badge-success font-normal text-xs">trigger</div>
                    {getStatusBadge()}
                </div>
                <h3 className="text-sm font-medium leading-tight mb-1 text-success-content">{data.label}</h3>
                {data.description && (
                    <p className="text-xs text-success-content/60 leading-relaxed mb-2">{data.description}</p>
                )}
                {data.executionStatus === 'running' && data.currentStep && (
                    <div className="text-xs text-warning/80 font-normal mb-2 italic">
                        {data.currentStep}
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        className="btn btn-xs btn-success btn-outline opacity-70 hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.();
                        }}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>
    );
}

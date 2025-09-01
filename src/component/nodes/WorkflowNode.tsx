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
                return 'card bg-warning/10 shadow-md border border-warning/30 animate-pulse';
            case 'completed':
                return 'card bg-success/10 shadow-md border border-success/30';
            case 'error':
                return 'card bg-error/10 shadow-md border border-error/30';
            default:
                return 'card bg-base-100 shadow-sm border border-base-200/60';
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
                return <div className="badge badge-sm badge-outline font-normal text-xs">{data.status || 'ready'}</div>;
        }
    };

    return (
        <div
            className={`${getCardStyle()} w-56 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all duration-200`}
            onClick={onClick}
        >
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="!bg-primary/80 !border-primary/40 !w-2 !h-2"
            />
            <div className="card-body p-3">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`badge badge-sm ${data.type === 'trigger' ? 'badge-success' : 'badge-primary'} font-normal`}>
                        {data.type || 'action'}
                    </div>
                    {getStatusBadge()}
                </div>
                <h3 className="text-sm font-medium leading-tight mb-1">{data.label}</h3>
                {data.description && (
                    <p className="text-xs text-base-content/60 leading-relaxed mb-2">{data.description}</p>
                )}
                {data.executionStatus === 'running' && data.currentStep && (
                    <div className="text-xs text-warning/80 font-normal mb-2 italic">
                        {data.currentStep}
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        className="btn btn-xs btn-ghost opacity-60 hover:opacity-100 transition-opacity"
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
        </div>
    );
}

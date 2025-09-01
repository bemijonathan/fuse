// Export all node components
export { default as WorkflowNode } from './WorkflowNode';
export { default as TriggerNode } from './TriggerNode';

// Node types configuration
import WorkflowNode from './WorkflowNode';
import TriggerNode from './TriggerNode';

export const nodeTypes = {
    workflow: WorkflowNode,
    trigger: TriggerNode,
};

// Type definitions
export interface NodeData {
    label: string;
    description?: string;
    type?: string;
    status?: string;
    executionStatus?: 'running' | 'completed' | 'error';
    currentStep?: string;
}

export interface BaseNodeProps {
    data: NodeData;
    isConnectable: boolean;
}

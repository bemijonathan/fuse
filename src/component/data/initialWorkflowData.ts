import { WorkflowNode, WorkflowEdge } from '../hooks/useWorkflowExecution';

export const initialNodes: WorkflowNode[] = [
    {
        id: 'n1',
        type: 'trigger',
        position: { x: 50, y: 100 },
        data: {
            label: 'Epic EHR',
            description: 'Epic Healthcare EHR System',
            type: 'trigger',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                selectedTools: ['get-patient'],
                purpose: 'Patient data access for workflow initiation'
            }
        }
    },
    {
        id: 'n2',
        type: 'workflow',
        position: { x: 400, y: 100 },
        data: {
            label: 'Anthem Insurance',
            description: 'Anthem Healthcare Insurance',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                selectedTools: ['verify-eligibility'],
                purpose: 'Verify patient insurance eligibility'
            }
        }
    },
    {
        id: 'n3',
        type: 'workflow',
        position: { x: 750, y: 100 },
        data: {
            label: 'Fertility Clinic',
            description: 'Reproductive Health Clinic',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                selectedTools: ['schedule-consult'],
                purpose: 'Schedule fertility consultation'
            }
        }
    },
];

export const initialEdges: WorkflowEdge[] = [
    { id: 'n1-n2', source: 'n1', target: 'n2', style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'n2-n3', source: 'n2', target: 'n3', style: { stroke: '#3b82f6', strokeWidth: 2 } }
];

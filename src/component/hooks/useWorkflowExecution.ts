import { useState, useCallback } from 'react';

export interface WorkflowNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: {
        label: string;
        description?: string;
        type?: string;
        status?: string;
        executionStatus?: 'running' | 'completed' | 'error';
        currentStep?: string;
        settings?: Record<string, any>;
        nodeTemplate?: string;
    };
}

export interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
    style?: { stroke: string; strokeWidth: number };
    animated?: boolean;
}

export const useWorkflowExecution = (
    initialNodes: WorkflowNode[],
    initialEdges: WorkflowEdge[]
) => {
    const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
    const [edges, setEdges] = useState<WorkflowEdge[]>(initialEdges);
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionProgress, setExecutionProgress] = useState(0);

    // Add new node to workflow
    const addNode = useCallback((node: WorkflowNode) => {
        setNodes(prevNodes => [...prevNodes, node]);
    }, []);

    // Update existing node
    const updateNode = useCallback((updatedNode: WorkflowNode) => {
        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === updatedNode.id ? updatedNode : node
            )
        );
    }, []);

    // Delete node
    const deleteNode = useCallback((nodeId: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
        setEdges(prevEdges =>
            prevEdges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
        );
    }, []);

    // Workflow execution simulation
    const executeWorkflow = useCallback(async () => {
        if (isExecuting) return;

        setIsExecuting(true);
        setExecutionProgress(0);

        // Reset all nodes to initial state
        setNodes(prevNodes =>
            prevNodes.map(node => ({
                ...node,
                data: { ...node.data, executionStatus: undefined, currentStep: undefined }
            }))
        );

        // Reset edges to default style
        setEdges(prevEdges =>
            prevEdges.map(edge => ({
                ...edge,
                style: { stroke: '#3b82f6', strokeWidth: 4 },
                markerEnd: {
                    type: 'arrow',
                    color: '#3b82f6'
                },
                animated: false
            }))
        );

        // Execute each node in sequence
        const nodeOrder = ['n1', 'n2', 'n3'];
        const stepDetails: Record<string, string[]> = {
            'n1': [
                'Validating patient portal access...',
                'Processing registration form...',
                'Creating patient record...'
            ],
            'n2': [
                'Connecting to insurance API...',
                'Verifying coverage details...',
                'Checking deductibles and copays...'
            ],
            'n3': [
                'Finding available time slots...',
                'Booking appointment...',
                'Sending confirmation email...'
            ]
        };

        for (let i = 0; i < nodeOrder.length; i++) {
            const nodeId = nodeOrder[i];
            const steps = stepDetails[nodeId];

            // Highlight current edge if not first node
            if (i > 0) {
                const edgeId = `${nodeOrder[i - 1]}-${nodeId}`;
                setEdges(prevEdges =>
                    prevEdges.map(edge =>
                        edge.id === edgeId
                            ? {
                                ...edge,
                                style: { stroke: '#f59e0b', strokeWidth: 3 },
                                markerEnd: {
                                    type: 'arrow',
                                    color: '#f59e0b'
                                },
                                animated: true
                            }
                            : edge
                    )
                );
            }

            // Set node to running
            setNodes(prevNodes =>
                prevNodes.map(node =>
                    node.id === nodeId
                        ? {
                            ...node,
                            data: {
                                ...node.data,
                                executionStatus: 'running' as const,
                                currentStep: steps[0]
                            }
                        }
                        : node
                )
            );

            // Simulate step execution
            for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
                setNodes(prevNodes =>
                    prevNodes.map(node =>
                        node.id === nodeId
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                    currentStep: steps[stepIndex]
                                }
                            }
                            : node
                    )
                );

                await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s per step
            }

            // Mark node as completed
            setNodes(prevNodes =>
                prevNodes.map(node =>
                    node.id === nodeId
                        ? {
                            ...node,
                            data: {
                                ...node.data,
                                executionStatus: 'completed' as const,
                                currentStep: undefined
                            }
                        }
                        : node
                )
            );

            // Update edge to completed style
            if (i > 0) {
                const edgeId = `${nodeOrder[i - 1]}-${nodeId}`;
                setEdges(prevEdges =>
                    prevEdges.map(edge =>
                        edge.id === edgeId
                            ? {
                                ...edge,
                                style: { stroke: '#10b981', strokeWidth: 3 },
                                markerEnd: {
                                    type: 'arrow',
                                    color: '#10b981'
                                },
                                animated: false
                            }
                            : edge
                    )
                );
            }

            setExecutionProgress(((i + 1) / nodeOrder.length) * 100);
            await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause between nodes
        }

        setIsExecuting(false);
    }, [isExecuting]);

    // Reset workflow
    const resetWorkflow = useCallback(() => {
        setNodes(prevNodes =>
            prevNodes.map(node => ({
                ...node,
                data: { ...node.data, executionStatus: undefined, currentStep: undefined }
            }))
        );
        setEdges(initialEdges);
        setExecutionProgress(0);
    }, [initialEdges]);

    return {
        nodes,
        edges,
        isExecuting,
        executionProgress,
        setNodes,
        setEdges,
        executeWorkflow,
        resetWorkflow,
        addNode,
        updateNode,
        deleteNode
    };
};

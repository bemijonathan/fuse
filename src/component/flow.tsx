"use client";

import { useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, EdgeChange, Connection, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import components and utilities
import WorkflowNodeComponent from './nodes/WorkflowNode';
import TriggerNodeComponent from './nodes/TriggerNode';
import { ControlPanel, WorkflowStatusAlert, NodePalette, NodeSettingsModal } from './ui';
import { useWorkflowExecution, WorkflowNode } from './hooks';
import { initialNodes, initialEdges } from './data';
import { useState, useMemo } from 'react';

// Node data interfaces
interface NodeData {
    label: string;
    description?: string;
    type?: string;
    status?: string;
    executionStatus?: 'running' | 'completed' | 'error';
    currentStep?: string;
    settings?: Record<string, unknown>;
}

export default function Flow() {
    // Use the custom workflow execution hook
    const {
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
    } = useWorkflowExecution(initialNodes, initialEdges);

    // Node settings modal state
    const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    // Handle node click
    const handleNodeClick = useCallback((nodeId: string) => {
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
            setSelectedNode(node);
            setIsSettingsModalOpen(true);
        }
    }, [nodes]);

    // ReactFlow event handlers
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot) as typeof nodesSnapshot),
        [setNodes],
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [setEdges],
    );

    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [setEdges],
    );

    // Enhanced node types with click handlers
    const enhancedNodeTypes = useMemo(() => ({
        workflow: (props: { data: NodeData; isConnectable: boolean; id: string }) => (
            <WorkflowNodeComponent
                {...props}
                onClick={() => handleNodeClick(props.id)}
            />
        ),
        trigger: (props: { data: NodeData; isConnectable: boolean; id: string }) => (
            <TriggerNodeComponent
                {...props}
                onClick={() => handleNodeClick(props.id)}
            />
        )
    }), [handleNodeClick]);

    return (
        <div className="h-screen bg-base-200 relative">
            {/* Control Panel Component */}
            <ControlPanel
                isExecuting={isExecuting}
                executionProgress={executionProgress}
                onRunWorkflow={executeWorkflow}
                onResetWorkflow={resetWorkflow}
            />

            {/* Node Palette Component */}
            <NodePalette onAddNode={addNode} />

            {/* Workflow Status Alert Component */}
            <WorkflowStatusAlert
                isVisible={isExecuting}
                message="Healthcare workflow is executing..."
            />

            {/* Node Settings Modal */}
            <NodeSettingsModal
                node={selectedNode}
                isOpen={isSettingsModalOpen}
                onClose={() => {
                    setIsSettingsModalOpen(false);
                    setSelectedNode(null);
                }}
                onSave={updateNode}
                onDelete={deleteNode}
            />

            {/* ReactFlow Canvas */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={enhancedNodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                className="bg-base-200"
                connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
                defaultEdgeOptions={{
                    style: { stroke: '#3b82f6', strokeWidth: 2 },
                    markerEnd: {
                        type: 'arrow',
                        color: '#3b82f6'
                    }
                }}
            >
                {/* SVG Definitions for Arrow Markers */}
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="3"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                    </marker>
                    <marker
                        id="arrow-success"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="3"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                    <marker
                        id="arrow-warning"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="3"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                    </marker>
                </defs>
            </ReactFlow>
        </div>
    );
}
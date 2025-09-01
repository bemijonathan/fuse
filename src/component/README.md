# Healthcare Workflow Components

A modular, reusable component library for building healthcare workflow interfaces with DaisyUI styling and ReactFlow.

## 📁 Component Structure

```
src/component/
├── flow.tsx                    # Main orchestrator component
├── nodes/                      # ReactFlow node components
│   ├── WorkflowNode.tsx       # Action/workflow step nodes
│   ├── TriggerNode.tsx        # Workflow trigger nodes
│   └── index.ts               # Node exports & types
├── ui/                        # UI components
│   ├── ControlPanel.tsx       # Workflow controls (run, reset, progress)
│   ├── WorkflowStatusAlert.tsx # Status notifications
│   └── index.ts               # UI component exports
├── hooks/                     # Custom React hooks
│   ├── useWorkflowExecution.ts # Workflow execution logic
│   └── index.ts               # Hook exports
├── data/                      # Initial data & configurations
│   ├── initialWorkflowData.ts # Default nodes and edges
│   └── index.ts               # Data exports
├── index.ts                   # Main exports
└── README.md                  # This file
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { Flow } from '@/component';

export default function MyWorkflowPage() {
  return <Flow />;
}
```

### Using Individual Components

```tsx
import { 
  WorkflowNode, 
  TriggerNode, 
  ControlPanel, 
  useWorkflowExecution 
} from '@/component';
```

## 🔧 Component APIs

### `<Flow />`
Main orchestrator component that combines all workflow functionality.

**Props:** None (self-contained)

### `<WorkflowNode />`
DaisyUI-styled node for workflow actions.

**Props:**
- `data: NodeData` - Node content and state
- `isConnectable: boolean` - ReactFlow connectivity setting

**NodeData Interface:**
```tsx
interface NodeData {
  label: string;                    // Node title
  description?: string;             // Node description
  type?: string;                    // Node type (action, trigger)
  status?: string;                  // Base status (ready, pending)
  executionStatus?: 'running' | 'completed' | 'error'; // Execution state
  currentStep?: string;             // Current execution step
}
```

### `<TriggerNode />`
DaisyUI-styled node for workflow triggers.

**Props:** Same as WorkflowNode

### `<ControlPanel />`
Workflow execution controls with progress tracking.

**Props:**
```tsx
interface ControlPanelProps {
  isExecuting: boolean;           // Execution state
  executionProgress: number;      // Progress (0-100)
  onRunWorkflow: () => void;      // Run handler
  onResetWorkflow: () => void;    // Reset handler
}
```

### `<WorkflowStatusAlert />`
Status notification component.

**Props:**
```tsx
interface WorkflowStatusAlertProps {
  isVisible: boolean;             // Show/hide alert
  message?: string;               // Alert message
}
```

### `useWorkflowExecution(initialNodes, initialEdges)`
Custom hook for workflow execution logic.

**Parameters:**
- `initialNodes: WorkflowNode[]` - Starting nodes
- `initialEdges: WorkflowEdge[]` - Starting edges

**Returns:**
```tsx
{
  nodes: WorkflowNode[];          // Current nodes
  edges: WorkflowEdge[];          // Current edges
  isExecuting: boolean;           // Execution state
  executionProgress: number;      // Progress (0-100)
  setNodes: (nodes) => void;      // Node setter
  setEdges: (edges) => void;      // Edge setter
  executeWorkflow: () => void;    // Execute workflow
  resetWorkflow: () => void;      // Reset to initial state
}
```

## 🎨 DaisyUI Styling

All components use DaisyUI classes for consistent theming:

- **Cards**: `card`, `card-body`, `card-title`, `card-actions`
- **Buttons**: `btn`, `btn-primary`, `btn-ghost`, `btn-success`
- **Badges**: `badge`, `badge-success`, `badge-warning`, `badge-error`
- **Loading**: `loading`, `loading-spinner`
- **Progress**: `progress`, `progress-primary`
- **Alerts**: `alert`, `alert-info`

## 🏥 Healthcare Workflow Example

The default workflow simulates a patient onboarding process:

1. **Patient Registration** (Trigger)
   - Validates portal access
   - Processes registration form
   - Creates patient record

2. **Verify Insurance** (Action)
   - Connects to insurance API
   - Verifies coverage details
   - Checks deductibles/copays

3. **Schedule Appointment** (Action)
   - Finds available slots
   - Books appointment
   - Sends confirmation email

## 🔄 Execution Animation

The workflow execution includes:
- **Node States**: `ready` → `running` → `completed`
- **Visual Feedback**: Color changes, pulse animations, spinners
- **Edge Animation**: Flowing connections between nodes
- **Progress Tracking**: Real-time progress bar
- **Step Details**: Live step descriptions

## 🛠 Customization

### Adding New Node Types

1. Create a new component in `nodes/`
2. Add to `nodeTypes` in `nodes/index.ts`
3. Update TypeScript interfaces

### Custom Workflow Steps

Modify `stepDetails` in `useWorkflowExecution.ts`:

```tsx
const stepDetails = {
  'custom-node-id': [
    'Step 1 description...',
    'Step 2 description...',
    'Step 3 description...'
  ]
};
```

### Styling Customization

All styling uses DaisyUI classes. Customize by:
- Changing DaisyUI theme in `layout.tsx`
- Modifying class combinations in components
- Adding custom CSS classes

## 📦 Dependencies

- **ReactFlow**: Workflow canvas and node management
- **DaisyUI**: Component styling and theming
- **React**: Core functionality and hooks
- **TypeScript**: Type safety and interfaces

## 🎯 Perfect for:

- Healthcare workflow automation
- Medical process documentation
- Patient journey mapping
- Clinical decision trees
- Treatment protocol flows
- Administrative workflows

This modular architecture makes it easy to replicate, customize, and scale healthcare workflow interfaces across different applications and use cases.

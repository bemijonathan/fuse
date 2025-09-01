import { useState } from 'react';
import { nodeTemplates, NodeTemplate, createNodeFromTemplate } from '../data/nodeTemplates';
import { WorkflowNode } from '../hooks/useWorkflowExecution';

interface NodePaletteProps {
    onAddNode: (node: WorkflowNode) => void;
}

export default function NodePalette({ onAddNode }: NodePaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = [
        { id: 'all', label: 'All Organizations', icon: '🏢' },
        { id: 'trigger', label: 'EHR Systems', icon: '🏥' },
        { id: 'action', label: 'Healthcare Orgs', icon: '🩺' },
        { id: 'condition', label: 'Labs & Pharmacy', icon: '🔬' },
        { id: 'integration', label: 'Insurance', icon: '🛡️' }
    ];

    const filteredTemplates = selectedCategory === 'all'
        ? nodeTemplates
        : nodeTemplates.filter(template => template.category === selectedCategory);

    const handleAddNode = (template: NodeTemplate) => {
        // Calculate position for new node (to the right of existing nodes)
        const newPosition = {
            x: 100 + (Math.random() * 200), // Add some randomness to avoid overlap
            y: 100 + (Math.random() * 100)
        };

        const newNode = createNodeFromTemplate(template, newPosition);
        onAddNode(newNode);
        setIsOpen(false);
    };

    return (
        <>
            {/* Add Node Button */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    className="btn btn-primary gap-2 shadow-lg"
                    onClick={() => setIsOpen(true)}
                >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Node
                </button>
            </div>

            {/* Node Palette Modal */}
            <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
                <div className="modal-box w-11/12 max-w-5xl h-5/6 max-h-[90vh] p-0">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-base-200">
                        <h2 className="text-xl font-bold">Add New Node</h2>
                        <button
                            className="btn btn-sm btn-circle btn-ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Category Tabs */}
                    <div className="px-6 pt-4">
                        <div role="tablist" className="tabs tabs-boxed">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    role="tab"
                                    className={`tab gap-2 ${selectedCategory === category.id ? 'tab-active' : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <span className="text-lg">{category.icon}</span>
                                    <span className="hidden sm:inline">{category.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Node Templates Grid */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTemplates.map(template => (
                                <div
                                    key={template.type}
                                    className="card bg-base-200 hover:bg-base-300 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
                                    onClick={() => handleAddNode(template)}
                                >
                                    <div className="card-body p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="text-3xl group-hover:scale-110 transition-transform">
                                                {template.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="card-title text-base mb-1">{template.label}</h3>
                                                <p className="text-sm opacity-70 line-clamp-2">
                                                    {template.description}
                                                </p>
                                                <div className="card-actions justify-start mt-3">
                                                    <div className={`badge badge-sm ${template.category === 'trigger' ? 'badge-success' :
                                                        template.category === 'action' ? 'badge-primary' :
                                                            template.category === 'condition' ? 'badge-warning' :
                                                                'badge-info'
                                                        }`}>
                                                        {template.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">🔍</div>
                                <p className="text-lg opacity-70">No templates found for this category</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-base-200 p-4">
                        <div className="text-center">
                            <p className="text-sm opacity-60">
                                Click on any template to add it to your workflow
                            </p>
                        </div>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setIsOpen(false)}>close</button>
                </form>
            </dialog>
        </>
    );
}

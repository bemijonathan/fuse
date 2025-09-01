import { useState, useEffect } from 'react';
import { WorkflowNode } from '../hooks/useWorkflowExecution';

interface NodeSettingsModalProps {
    node: WorkflowNode | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedNode: WorkflowNode) => void;
    onDelete?: (nodeId: string) => void;
}

export default function NodeSettingsModal({
    node,
    isOpen,
    onClose,
    onSave,
    onDelete
}: NodeSettingsModalProps) {
    const [formData, setFormData] = useState<{
        label: string;
        description: string;
        status: string;
        settings: Record<string, unknown>;
    }>({
        label: '',
        description: '',
        status: 'disconnected',
        settings: {}
    });
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        if (node) {
            setFormData({
                label: node.data.label || '',
                description: node.data.description || '',
                status: node.data.status || 'ready',
                settings: node.data.settings || {}
            });
        }
    }, [node]);

    if (!isOpen || !node) return null;

    const handleSave = () => {
        const updatedNode: WorkflowNode = {
            ...node,
            data: {
                ...node.data,
                label: formData.label,
                description: formData.description,
                status: formData.status,
                settings: formData.settings
            }
        };
        onSave(updatedNode);
        onClose();
    };

    const handleSettingChange = (key: string, value: unknown) => {
        setFormData((prev: typeof formData) => ({
            ...prev,
            settings: {
                ...prev.settings,
                [key]: value
            }
        }));
    };

    const renderConnectionSettings = () => {
        const settings = formData.settings || {};

        return (
            <div className="space-y-5">
                <div className="alert alert-warning py-3">
                    <svg className="stroke-current shrink-0 w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <span className="text-xs">Connection credentials are encrypted and stored securely</span>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xs font-medium text-base-content/80">MCP Server URL</span>
                    </label>
                    <input
                        type="url"
                        className="input input-bordered input-sm text-sm"
                        value={(settings.mcpServerUrl as string) || ''}
                        onChange={(e) => handleSettingChange('mcpServerUrl', e.target.value)}
                        placeholder="https://api.organization.com/mcp"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xs font-medium text-base-content/80">API Key</span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered input-sm text-sm"
                        value={(settings.apiKey as string) || ''}
                        onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                        placeholder="Enter your API key"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xs font-medium text-base-content/80">Client/Organization ID</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered input-sm text-sm"
                        value={(settings.clientId || settings.providerId || settings.clinicId || settings.accountNumber || settings.storeNumber || settings.agencyId || '') as string}
                        onChange={(e) => {
                            // Dynamic field name based on organization type
                            const fieldName = settings.clientId !== undefined ? 'clientId' :
                                settings.providerId !== undefined ? 'providerId' :
                                    settings.clinicId !== undefined ? 'clinicId' :
                                        settings.accountNumber !== undefined ? 'accountNumber' :
                                            settings.storeNumber !== undefined ? 'storeNumber' :
                                                settings.agencyId !== undefined ? 'agencyId' : 'clientId';
                            handleSettingChange(fieldName, e.target.value);
                        }}
                        placeholder="Organization identifier"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xs font-medium text-base-content/80">Environment</span>
                    </label>
                    <select
                        className="select select-bordered select-sm text-sm"
                        value={(settings.environment || 'sandbox') as string}
                        onChange={(e) => handleSettingChange('environment', e.target.value)}
                    >
                        <option value="sandbox">Sandbox</option>
                        <option value="staging">Staging</option>
                        <option value="test">Test</option>
                        <option value="production">Production</option>
                    </select>
                </div>

                <div className="form-control">
                    <button
                        className="btn btn-sm btn-primary font-normal"
                        onClick={() => {
                            // TODO: Test connection to MCP server
                            alert('Testing connection... (not implemented yet)');
                        }}
                    >
                        <span className="text-xs">Test Connection</span>
                    </button>
                </div>
            </div>
        );
    };

    const renderToolsSettings = () => {
        const settings = formData.settings || {};
        const availableTools = (settings.availableTools as string[]) || [];
        const selectedTools = (settings.selectedTools as string[]) || [];

        return (
            <div className="space-y-5">
                <div className="alert alert-info py-3">
                    <svg className="stroke-current shrink-0 w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-xs">Select which tools from the MCP server you want to use</span>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xs font-medium text-base-content/80">Available Tools</span>
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto border border-base-200 rounded-lg p-3">
                        {availableTools.map((tool) => (
                            <label key={tool} className="cursor-pointer label justify-start gap-3">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={selectedTools.includes(tool)}
                                    onChange={(e) => {
                                        const newSelected = e.target.checked
                                            ? [...selectedTools, tool]
                                            : selectedTools.filter(t => t !== tool);
                                        handleSettingChange('selectedTools', newSelected);
                                    }}
                                />
                                <span className="label-text text-sm">{tool}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {selectedTools.length > 0 && (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xs font-medium text-base-content/80">Selected Tools ({selectedTools.length})</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {selectedTools.map((tool) => (
                                <div key={tool} className="badge badge-primary gap-2">
                                    <span className="text-xs">{tool}</span>
                                    <button
                                        className="btn btn-xs btn-ghost p-0 min-h-0 h-auto"
                                        onClick={() => {
                                            const newSelected = selectedTools.filter(t => t !== tool);
                                            handleSettingChange('selectedTools', newSelected);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="form-control">
                    <button
                        className="btn btn-sm btn-outline font-normal"
                        onClick={() => {
                            // TODO: Refresh available tools from MCP server
                            alert('Refreshing tools... (requires MCP server connection)');
                        }}
                    >
                        <span className="text-xs">🔄 Refresh Available Tools</span>
                    </button>
                </div>
            </div>
        );
    };

    const renderSchemaSettings = () => {
        const settings = formData.settings || {};
        const dataSchema = settings.dataSchema || {};

        return (
            <div className="space-y-5">
                <div className="alert alert-info py-3">
                    <svg className="stroke-current shrink-0 w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-xs">Define the data schema for this integration</span>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xs font-medium text-base-content/80">Data Schema (JSON)</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered text-sm font-mono"
                        value={JSON.stringify(dataSchema, null, 2)}
                        onChange={(e) => {
                            try {
                                const parsed = JSON.parse(e.target.value);
                                handleSettingChange('dataSchema', parsed);
                            } catch {
                                // Keep the text as-is if it's not valid JSON yet
                            }
                        }}
                        placeholder='{"patient": {"id": "string", "name": "string"}}'
                        rows={12}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        className="btn btn-sm btn-outline font-normal"
                        onClick={() => {
                            handleSettingChange('dataSchema', {
                                patient: { id: 'string', name: 'string', dob: 'date' },
                                appointment: { id: 'string', datetime: 'datetime', provider: 'string' }
                            });
                        }}
                    >
                        <span className="text-xs">Load EHR Schema</span>
                    </button>
                    <button
                        className="btn btn-sm btn-outline font-normal"
                        onClick={() => {
                            handleSettingChange('dataSchema', {
                                member: { id: 'string', dob: 'date', groupNumber: 'string' },
                                coverage: { active: 'boolean', benefits: 'object' }
                            });
                        }}
                    >
                        <span className="text-xs">Load Insurance Schema</span>
                    </button>
                </div>
            </div>
        );
    };

    const renderGeneralSettings = () => (
        <div className="space-y-5">
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-xs font-medium text-base-content/80">Node Name</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered input-sm text-sm"
                    value={formData.label}
                    onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="Enter node name"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text text-xs font-medium text-base-content/80">Description</span>
                </label>
                <textarea
                    className="textarea textarea-bordered text-sm"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter description"
                    rows={3}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text text-xs font-medium text-base-content/80">Purpose</span>
                </label>
                <textarea
                    className="textarea textarea-bordered text-sm"
                    value={(formData.settings?.purpose as string) || ''}
                    onChange={(e) => handleSettingChange('purpose', e.target.value)}
                    placeholder="Describe what you want to accomplish with this integration..."
                    rows={2}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text text-xs font-medium text-base-content/80">Status</span>
                </label>
                <select
                    className="select select-bordered select-sm text-sm"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                    <option value="disconnected">Disconnected</option>
                    <option value="connected">Connected</option>
                    <option value="error">Error</option>
                    <option value="testing">Testing</option>
                </select>
            </div>
        </div>
    );



    const tabs = [
        { id: 'general', label: 'General', icon: '⚙️' },
        { id: 'connection', label: 'Connection', icon: '🔗' },
        { id: 'tools', label: 'Tools', icon: '🛠️' },
        { id: 'schema', label: 'Schema', icon: '📋' }
    ];

    return (
        <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box w-11/12 max-w-2xl h-5/6 max-h-[90vh] p-0">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-base-200">
                    <div>
                        <h2 className="text-xl font-bold">Node Settings</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <div className={`badge ${node.data.type === 'trigger' ? 'badge-success' : 'badge-primary'}`}>
                                {node.data.type}
                            </div>
                            <span className="text-sm opacity-60">ID: {node.id}</span>
                        </div>
                    </div>
                    <button
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={onClose}
                    >
                        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-6 pt-4">
                    <div role="tablist" className="tabs tabs-bordered">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                role="tab"
                                className={`tab gap-2 ${activeTab === tab.id ? 'tab-active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span>{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'general' && renderGeneralSettings()}
                    {activeTab === 'connection' && renderConnectionSettings()}
                    {activeTab === 'tools' && renderToolsSettings()}
                    {activeTab === 'schema' && renderSchemaSettings()}
                </div>

                {/* Footer */}
                <div className="border-t border-base-200 p-4">
                    <div className="flex justify-between">
                        <div>
                            {onDelete && (
                                <button
                                    className="btn btn-error btn-outline gap-2"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this node?')) {
                                            onDelete(node.id);
                                            onClose();
                                        }
                                    }}
                                >
                                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete Node
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-outline" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="btn btn-primary gap-2" onClick={handleSave}>
                                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}

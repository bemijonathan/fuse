import { WorkflowNode } from '../hooks/useWorkflowExecution';

export interface NodeTemplate {
    type: string;
    label: string;
    icon: string;
    description: string;
    category: 'trigger' | 'action' | 'condition' | 'integration';
    defaultData: {
        label: string;
        description: string;
        type: string;
        status: string;
        settings?: Record<string, any>;
    };
}

export const nodeTemplates: NodeTemplate[] = [
    // EHR Systems
    {
        type: 'epic-ehr',
        label: 'Epic EHR',
        icon: '🏥',
        description: 'Connect to Epic MyChart and EHR system',
        category: 'trigger',
        defaultData: {
            label: 'Epic EHR',
            description: 'Epic Healthcare EHR System',
            type: 'trigger',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                clientId: '',
                environment: 'sandbox',
                selectedTools: [],
                availableTools: ['get-patient', 'create-appointment', 'update-record', 'get-schedule'],
                dataSchema: {
                    patient: { id: 'string', name: 'string', dob: 'date' },
                    appointment: { id: 'string', datetime: 'datetime', provider: 'string' }
                },
                purpose: ''
            }
        }
    },
    {
        type: 'cerner-ehr',
        label: 'Cerner EHR',
        icon: '🏥',
        description: 'Connect to Cerner PowerChart system',
        category: 'trigger',
        defaultData: {
            label: 'Cerner EHR',
            description: 'Cerner Healthcare EHR System',
            type: 'trigger',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                clientId: '',
                environment: 'sandbox',
                selectedTools: [],
                availableTools: ['search-patient', 'book-appointment', 'clinical-notes', 'lab-results'],
                dataSchema: {
                    patient: { mrn: 'string', demographics: 'object' },
                    clinical: { notes: 'string', vitals: 'object' }
                },
                purpose: ''
            }
        }
    },

    // Insurance Companies
    {
        type: 'anthem-insurance',
        label: 'Anthem Insurance',
        icon: '🛡️',
        description: 'Connect to Anthem eligibility and benefits',
        category: 'action',
        defaultData: {
            label: 'Anthem Insurance',
            description: 'Anthem Healthcare Insurance',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                providerId: '',
                environment: 'test',
                selectedTools: [],
                availableTools: ['verify-eligibility', 'check-benefits', 'prior-auth', 'claims-status'],
                dataSchema: {
                    member: { id: 'string', dob: 'date', groupNumber: 'string' },
                    eligibility: { active: 'boolean', coverage: 'object' }
                },
                purpose: ''
            }
        }
    },
    {
        type: 'aetna-insurance',
        label: 'Aetna Insurance',
        icon: '🛡️',
        description: 'Connect to Aetna member services',
        category: 'action',
        defaultData: {
            label: 'Aetna Insurance',
            description: 'Aetna Healthcare Insurance',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                partnerId: '',
                environment: 'staging',
                selectedTools: [],
                availableTools: ['member-lookup', 'benefit-check', 'authorization', 'claim-submission'],
                dataSchema: {
                    member: { memberId: 'string', ssn: 'string' },
                    benefits: { deductible: 'number', copay: 'number' }
                },
                purpose: ''
            }
        }
    },

    // Specialty Clinics
    {
        type: 'fertility-clinic',
        label: 'Fertility Clinic',
        icon: '👶',
        description: 'Connect to fertility clinic management system',
        category: 'action',
        defaultData: {
            label: 'Reproductive Health Clinic',
            description: 'Fertility treatment and IVF clinic',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                clinicId: '',
                environment: 'production',
                selectedTools: [],
                availableTools: ['schedule-consult', 'ivf-protocol', 'lab-tracking', 'patient-portal'],
                dataSchema: {
                    cycle: { id: 'string', protocol: 'string', stage: 'string' },
                    labs: { hormones: 'object', embryology: 'object' }
                },
                purpose: ''
            }
        }
    },
    {
        type: 'cardiology-practice',
        label: 'Cardiology Practice',
        icon: '❤️',
        description: 'Connect to cardiology practice system',
        category: 'action',
        defaultData: {
            label: 'Heart & Vascular Clinic',
            description: 'Cardiology specialty practice',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                practiceId: '',
                environment: 'production',
                selectedTools: [],
                availableTools: ['echo-reports', 'stress-test', 'cathlab-schedule', 'device-monitoring'],
                dataSchema: {
                    echo: { ejectionFraction: 'number', wallMotion: 'string' },
                    device: { type: 'string', readings: 'array' }
                },
                purpose: ''
            }
        }
    },

    // Labs & Diagnostics
    {
        type: 'labcorp',
        label: 'LabCorp',
        icon: '🔬',
        description: 'Connect to LabCorp laboratory services',
        category: 'action',
        defaultData: {
            label: 'LabCorp Diagnostics',
            description: 'Laboratory testing and diagnostics',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                accountNumber: '',
                environment: 'production',
                selectedTools: [],
                availableTools: ['order-tests', 'get-results', 'track-specimen', 'billing-info'],
                dataSchema: {
                    order: { tests: 'array', patient: 'object', priority: 'string' },
                    result: { values: 'object', reference: 'object', status: 'string' }
                },
                purpose: ''
            }
        }
    },
    {
        type: 'quest-diagnostics',
        label: 'Quest Diagnostics',
        icon: '🔬',
        description: 'Connect to Quest laboratory network',
        category: 'action',
        defaultData: {
            label: 'Quest Diagnostics',
            description: 'Laboratory testing services',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                facilityCode: '',
                environment: 'production',
                selectedTools: [],
                availableTools: ['lab-orders', 'result-delivery', 'test-catalog', 'patient-prep'],
                dataSchema: {
                    test: { code: 'string', name: 'string', specimen: 'string' },
                    patient: { demographics: 'object', insurance: 'object' }
                },
                purpose: ''
            }
        }
    },

    // Pharmacy Networks
    {
        type: 'cvs-pharmacy',
        label: 'CVS Pharmacy',
        icon: '💊',
        description: 'Connect to CVS pharmacy network',
        category: 'action',
        defaultData: {
            label: 'CVS Health Pharmacy',
            description: 'Retail pharmacy services',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                storeNumber: '',
                environment: 'production',
                selectedTools: [],
                availableTools: ['prescription-fill', 'medication-sync', 'adherence-check', 'insurance-verify'],
                dataSchema: {
                    prescription: { ndc: 'string', quantity: 'number', daysSupply: 'number' },
                    patient: { rxProfile: 'object', allergies: 'array' }
                },
                purpose: ''
            }
        }
    },

    // Home Health & Care
    {
        type: 'visiting-nurse',
        label: 'Visiting Nurse Service',
        icon: '🏠',
        description: 'Connect to home healthcare services',
        category: 'action',
        defaultData: {
            label: 'Home Health Services',
            description: 'Visiting nurse and home care',
            type: 'action',
            status: 'disconnected',
            settings: {
                mcpServerUrl: '',
                apiKey: '',
                agencyId: '',
                environment: 'production',
                selectedTools: [],
                availableTools: ['schedule-visit', 'care-plan', 'medication-admin', 'progress-notes'],
                dataSchema: {
                    visit: { type: 'string', duration: 'number', services: 'array' },
                    assessment: { vitals: 'object', cognitive: 'object' }
                },
                purpose: ''
            }
        }
    }
];

export const createNodeFromTemplate = (template: NodeTemplate, position: { x: number; y: number }): WorkflowNode => {
    const nodeId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
        id: nodeId,
        type: template.category === 'trigger' ? 'trigger' : 'workflow',
        position,
        data: {
            ...template.defaultData,
            nodeTemplate: template.type
        }
    };
};

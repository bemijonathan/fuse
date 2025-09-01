export interface WorkflowStep {
    id: string;
    nodeType: 'trigger' | 'action' | 'condition' | 'integration';
    nodeId: string;
    nodeName: string;
    action: string;
    details: string;
    startTime: string;
    endTime?: string;
    duration?: number;
    status: 'running' | 'completed' | 'error' | 'skipped';
    errorMessage?: string;
    metadata?: Record<string, any>;
}

export interface WorkflowLog {
    id: string;
    workflowId: string;
    workflowName: string;
    organizationName: string;
    patientId?: string;
    userId: string;
    userRole: string;
    startTime: string;
    endTime?: string;
    duration?: number;
    status: 'running' | 'completed' | 'error' | 'cancelled';
    steps: WorkflowStep[];
    metadata: {
        totalSteps: number;
        completedSteps: number;
        errorSteps: number;
        ipAddress: string;
        userAgent: string;
        sessionId: string;
    };
}

export interface LogFilter {
    status: 'all' | 'running' | 'completed' | 'error' | 'cancelled';
    dateRange: 'all' | '1d' | '7d' | '30d';
    nodeType: 'all' | 'trigger' | 'action' | 'condition' | 'integration';
    searchTerm: string;
}

// Mock data for demonstration
export const mockWorkflowLogs: WorkflowLog[] = [
    {
        id: 'log-001',
        workflowId: 'wf-fertility-intake-2024-001',
        workflowName: 'Fertility Clinic Patient Intake',
        organizationName: 'Pacific Fertility Center',
        patientId: 'PAT-2024-0892',
        userId: 'user-clinic-admin-01',
        userRole: 'Clinic Administrator',
        startTime: '2024-01-15T09:30:00Z',
        endTime: '2024-01-15T09:34:22Z',
        duration: 262,
        status: 'completed',
        steps: [
            {
                id: 'step-001',
                nodeType: 'trigger',
                nodeId: 'n1',
                nodeName: 'Patient Portal Registration',
                action: 'Patient Registration Form Submitted',
                details: 'New patient completed online intake form with fertility consultation request',
                startTime: '2024-01-15T09:30:00Z',
                endTime: '2024-01-15T09:31:15Z',
                duration: 75,
                status: 'completed',
                metadata: {
                    formData: { age: 34, consultationType: 'fertility' },
                    validationPassed: true
                }
            },
            {
                id: 'step-002',
                nodeType: 'integration',
                nodeId: 'n2',
                nodeName: 'Insurance Verification',
                action: 'Verify Insurance Coverage',
                details: 'Verified fertility coverage with Aetna PPO - $2,500 lifetime max',
                startTime: '2024-01-15T09:31:15Z',
                endTime: '2024-01-15T09:33:30Z',
                duration: 135,
                status: 'completed',
                metadata: {
                    insuranceProvider: 'Aetna',
                    policyNumber: 'AETNA-2024-567890',
                    coverageAmount: 2500
                }
            },
            {
                id: 'step-003',
                nodeType: 'action',
                nodeId: 'n3',
                nodeName: 'Appointment Scheduling',
                action: 'Schedule Initial Consultation',
                details: 'Scheduled consultation with Dr. Sarah Chen for January 22, 2024 at 2:00 PM',
                startTime: '2024-01-15T09:33:30Z',
                endTime: '2024-01-15T09:34:22Z',
                duration: 52,
                status: 'completed',
                metadata: {
                    appointmentId: 'APPT-2024-0156',
                    providerId: 'DR-CHEN-001',
                    scheduledTime: '2024-01-22T14:00:00Z'
                }
            }
        ],
        metadata: {
            totalSteps: 3,
            completedSteps: 3,
            errorSteps: 0,
            ipAddress: '192.168.1.45',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            sessionId: 'sess-pfc-2024-0156'
        }
    },
    {
        id: 'log-002',
        workflowId: 'wf-antenatal-care-2024-002',
        workflowName: 'Antenatal Care Coordination',
        organizationName: 'Women\'s Health Partners',
        patientId: 'PAT-2024-1203',
        userId: 'user-nurse-coordinator-02',
        userRole: 'Nurse Coordinator',
        startTime: '2024-01-15T14:15:00Z',
        endTime: '2024-01-15T14:18:45Z',
        duration: 225,
        status: 'completed',
        steps: [
            {
                id: 'step-004',
                nodeType: 'trigger',
                nodeId: 'n1',
                nodeName: 'Lab Results Received',
                action: 'Process Lab Results',
                details: 'Received 20-week anatomy scan results - normal findings',
                startTime: '2024-01-15T14:15:00Z',
                endTime: '2024-01-15T14:15:30Z',
                duration: 30,
                status: 'completed'
            },
            {
                id: 'step-005',
                nodeType: 'action',
                nodeId: 'n2',
                nodeName: 'Care Plan Update',
                action: 'Update Patient Care Plan',
                details: 'Updated care plan with normal scan results, next appointment in 4 weeks',
                startTime: '2024-01-15T14:15:30Z',
                endTime: '2024-01-15T14:17:15Z',
                duration: 105,
                status: 'completed'
            },
            {
                id: 'step-006',
                nodeType: 'integration',
                nodeId: 'n3',
                nodeName: 'Patient Notification',
                action: 'Send Results Notification',
                details: 'Sent secure message to patient portal with normal scan results',
                startTime: '2024-01-15T14:17:15Z',
                endTime: '2024-01-15T14:18:45Z',
                duration: 90,
                status: 'completed'
            }
        ],
        metadata: {
            totalSteps: 3,
            completedSteps: 3,
            errorSteps: 0,
            ipAddress: '10.0.2.128',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            sessionId: 'sess-whp-2024-0298'
        }
    },
    {
        id: 'log-003',
        workflowId: 'wf-pharmacy-integration-2024-003',
        workflowName: 'Prescription Processing',
        organizationName: 'CVS Pharmacy',
        patientId: 'PAT-2024-0445',
        userId: 'user-pharmacist-01',
        userRole: 'Staff Pharmacist',
        startTime: '2024-01-15T16:20:00Z',
        status: 'error',
        steps: [
            {
                id: 'step-007',
                nodeType: 'trigger',
                nodeId: 'n1',
                nodeName: 'E-Prescription Received',
                action: 'Process E-Prescription',
                details: 'Received e-prescription for prenatal vitamins from Dr. Martinez',
                startTime: '2024-01-15T16:20:00Z',
                endTime: '2024-01-15T16:20:15Z',
                duration: 15,
                status: 'completed'
            },
            {
                id: 'step-008',
                nodeType: 'integration',
                nodeId: 'n2',
                nodeName: 'Insurance Verification',
                action: 'Verify Insurance Coverage',
                details: 'Failed to verify insurance coverage - system timeout',
                startTime: '2024-01-15T16:20:15Z',
                endTime: '2024-01-15T16:21:00Z',
                duration: 45,
                status: 'error',
                errorMessage: 'The external API returned an error when trying to refresh the access token. Please later. (\n\"external_message\"): \"Response Error: 400 Bad Request)\", In \"external_request_details\": {\n\"statusCode\": 400, In \"error\": \"Bad Request\", In \"message\": \"Response Error: 400 Bad Request\"}, In \"headers\": {\n\"dataMessage\": {\n\"error\": \"invalid_grant\", In \"error_description\": \"expired access/refresh token\"\n}\n}'
            }
        ],
        metadata: {
            totalSteps: 3,
            completedSteps: 1,
            errorSteps: 1,
            ipAddress: '172.16.0.89',
            userAgent: 'CVS-PharmacyApp/2.1.4',
            sessionId: 'sess-cvs-2024-0891'
        }
    },
    {
        id: 'log-004',
        workflowId: 'wf-insurance-claims-2024-004',
        workflowName: 'Insurance Claims Processing',
        organizationName: 'Blue Cross Blue Shield',
        userId: 'user-claims-processor-03',
        userRole: 'Claims Processor',
        startTime: '2024-01-15T11:45:00Z',
        status: 'running',
        steps: [
            {
                id: 'step-009',
                nodeType: 'trigger',
                nodeId: 'n1',
                nodeName: 'Claim Submission',
                action: 'Process Medical Claim',
                details: 'Processing claim for fertility consultation - $425',
                startTime: '2024-01-15T11:45:00Z',
                endTime: '2024-01-15T11:45:30Z',
                duration: 30,
                status: 'completed'
            },
            {
                id: 'step-010',
                nodeType: 'condition',
                nodeId: 'n2',
                nodeName: 'Coverage Validation',
                action: 'Validate Coverage Rules',
                details: 'Validating fertility coverage against policy limitations...',
                startTime: '2024-01-15T11:45:30Z',
                status: 'running'
            }
        ],
        metadata: {
            totalSteps: 4,
            completedSteps: 1,
            errorSteps: 0,
            ipAddress: '203.45.67.12',
            userAgent: 'BCBS-ClaimsPortal/3.2.1',
            sessionId: 'sess-bcbs-2024-1456'
        }
    }
];

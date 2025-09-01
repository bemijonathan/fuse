import { Metadata } from 'next';
import LogsView from '@/component/logs/LogsView';

export const metadata: Metadata = {
    title: 'Workflow Audit Logs - Fuse',
    description: 'Healthcare workflow execution logs and audit trail',
};

export default function LogsPage() {
    return <LogsView />;
}

interface WorkflowStatusAlertProps {
    isVisible: boolean;
    message?: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    onClose?: () => void;
}

export default function WorkflowStatusAlert({
    isVisible,
    message = "Healthcare workflow is executing...",
    type = 'info',
    onClose
}: WorkflowStatusAlertProps) {
    if (!isVisible) return null;

    const alertClass = {
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-error'
    }[type];

    const icon = {
        info: (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        success: (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        warning: (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
        ),
        error: (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        )
    }[type];

    return (
        <div className="toast toast-top toast-end z-50">
            <div className={`alert ${alertClass} shadow-lg min-w-0 max-w-sm animate-pulse`}>
                <div className="flex items-center gap-3 w-full">
                    {icon}
                    <div className="flex-1 min-w-0">
                        <span className="text-sm break-words">{message}</span>
                    </div>
                    {onClose && (
                        <button
                            className="btn btn-ghost btn-xs btn-circle ml-2"
                            onClick={onClose}
                            aria-label="Close notification"
                        >
                            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                {type === 'info' && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="loading loading-spinner loading-xs"></span>
                        <span className="text-xs opacity-70">Processing...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

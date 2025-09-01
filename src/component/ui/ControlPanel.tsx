interface ControlPanelProps {
    isExecuting: boolean;
    executionProgress: number;
    onRunWorkflow: () => void;
    onResetWorkflow: () => void;
}

export default function ControlPanel({
    isExecuting,
    executionProgress,
    onRunWorkflow,
    onResetWorkflow
}: ControlPanelProps) {
    return (
        <div className="absolute top-4 left-4 z-10">
            <div className="card bg-base-100/95 backdrop-blur-sm shadow-xl border border-base-200/50 compact">
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title text-sm mr-4">Workflow Control</h2>
                        <div className="card-actions">
                            <button
                                className={`btn btn-sm ${isExecuting ? 'btn-disabled loading' : 'btn-primary'} gap-2`}
                                onClick={onRunWorkflow}
                                disabled={isExecuting}
                            >
                                {isExecuting ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 3l14 9-14 9V3z"
                                            />
                                        </svg>
                                        Run Workflow
                                    </>
                                )}
                            </button>
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={onResetWorkflow}
                                disabled={isExecuting}
                            >
                                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Reset
                            </button>
                        </div>
                    </div>

                    {isExecuting && (
                        <div className="divider my-2"></div>
                    )}

                    {isExecuting && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm opacity-70">Progress</span>
                                <span className="text-sm font-semibold">{Math.round(executionProgress)}%</span>
                            </div>
                            <progress
                                className="progress progress-primary w-full"
                                value={executionProgress}
                                max="100"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

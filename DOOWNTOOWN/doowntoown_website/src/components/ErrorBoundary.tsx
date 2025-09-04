import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="font-teko text-4xl font-black mb-4 text-black">
              エラーが発生しました
            </h1>
            <p className="text-gray-600 mb-8">
              申し訳ございません。予期しないエラーが発生しました。
              ページを再読み込みするか、しばらく時間をおいてから再度お試しください。
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="block w-full bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
              >
                ページを再読み込み
              </button>
              <a
                href="/"
                className="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors"
              >
                ホームに戻る
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

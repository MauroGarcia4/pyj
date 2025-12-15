import React from 'react'

type Props = { children: React.ReactNode }

type State = { hasError: boolean; error?: Error }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-red-600">Se produjo un error al cargar la página</h2>
          <p className="text-gray-600 mt-2">Intenta recargar o volver al inicio.</p>
          <a href="/" className="inline-block mt-4 px-4 py-2 bg-brand-primary text-white rounded-md">Ir al inicio</a>
        </div>
      )
    }
    return this.props.children
  }
}

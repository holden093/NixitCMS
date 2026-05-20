import { Component, type ErrorInfo, type ReactNode } from 'react'
import i18next from 'i18next'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Global UI error boundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const title = i18next.t('errors.somethingWentWrong', {
        defaultValue: "Qualcosa e' andato storto",
      })
      const description = i18next.t('errors.errorOccurred', {
        defaultValue: "Si e' verificato un errore",
      })
      const reloadLabel = i18next.t('errors.reloadPage', {
        defaultValue: 'Ricarica pagina',
      })

      return (
        <div className="min-h-screen bg-secondary px-6 py-16 text-primary">
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Application Error</p>
            <h1 className="font-serif text-3xl">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded bg-primary px-5 py-2 text-secondary hover:opacity-90"
            >
              {reloadLabel}
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

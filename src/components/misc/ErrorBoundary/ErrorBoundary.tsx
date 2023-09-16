import React, { ErrorInfo } from 'react'
import DefaultErrorComponent, { ErrorComponentProps } from './ErrorComponent'

export type ErrorBoundaryProps = {
	children?: React.ReactNode
	ErrorComponent?: React.ComponentType<ErrorComponentProps>
	onError?: (error: Error, errorInfo: ErrorInfo) => void
	onReset?: () => void
}

export type ErrorBoundaryState = { error: Error | null }

export default class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	public state = { error: null }

	constructor(props: ErrorBoundaryProps) {
		super(props)
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { error }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.props.onError?.(error, errorInfo)
		console.warn('ErrorBoundary:', error, errorInfo)
	}

	resetError = () => {
		this.props.onReset?.()
		this.setState({ error: null })
	}

	render() {
		if (!this.state.error) return this.props.children

		const { ErrorComponent = DefaultErrorComponent } = this.props
		return (
			<ErrorComponent error={this.state.error} resetError={this.resetError} />
		)
	}
}

import ErrorBoundary from './ErrorBoundary'
import { createWrappedHOCFactory } from '../../../utils'

const withErrorBoundary = createWrappedHOCFactory(ErrorBoundary)

export default withErrorBoundary

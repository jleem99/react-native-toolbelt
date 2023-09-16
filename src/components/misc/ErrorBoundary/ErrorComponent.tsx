import { Button, StyleSheet, Text, View } from 'react-native'

export interface ErrorComponentProps {
	error: Error
	resetError: () => void
}

/**
 * Default ErrorComponent
 */
const ErrorComponent = ({ error, resetError }: ErrorComponentProps) => {
	return (
		<View style={styles.view}>
			<Text style={styles.header}>Something went wrong.</Text>
			<Text style={styles.text}>{error.message}</Text>
			<Button title="Reset" onPress={resetError} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	text: {
		fontSize: 16,
		marginBottom: 16,
	},
})

export default ErrorComponent

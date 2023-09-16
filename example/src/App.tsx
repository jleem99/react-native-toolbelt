import { StyleSheet, View } from 'react-native'
import { FadeInImage } from 'react-native-toolbelt'

export default function App() {
	return (
		<View style={styles.container}>
			<FadeInImage
				source={{ uri: 'https://picsum.photos/200/300' }}
				style={styles.image}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 200,
		height: 300,
	},
})

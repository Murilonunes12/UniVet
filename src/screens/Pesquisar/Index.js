import  React, {useState} from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"

export default function App() {
	
	const [ pin, setPin ] = React.useState({
	latitude: -10.283503930429982,
    longitude: -48.29087186755809,
	})
	const [ region, setRegion ] = React.useState({
		latitude: -10.283503930429982,
		longitude: -48.29087186755809,
		latitudeDelta: 0.0200,
		longitudeDelta: 0.0200
	})

	return (
		<View style={{ marginTop: 50, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0200,
						longitudeDelta: 0.0200
					})
				}}
				query={{
					key: "AIzaSyCSo8C9aD9LUekGOlISfLcofsp4oQv90ws",
					language: "pt-BR",
					components: "country:BR",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
			<MapView
				style={styles.map}
				initialRegion={{
			  latitude: -10.283503930429982,
		      longitude: -48.29087186755809,
		      latitudeDelta: 0.0200,
		      longitudeDelta: 0.0200
				}}
				provider="google"
        showsUserLocation={true}
			>				
				
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
           
					<Callout>
						<Text>Estou aqui</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={1000} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})
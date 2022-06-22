import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";

interface Props extends TouchableOpacityProps {
	icon?: string;
}

export const Button: React.FC<Props> = ({ children, icon, ...rest }) => {
	return (
		<TouchableOpacity {...rest} style={styles.container}>
			{icon && (
				<MaterialCommunityIcons name={icon as any} style={styles.icon} />
			)}
			<Text style={styles.text}>{children}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 5,
		backgroundColor: "transparent",
		marginHorizontal: 5,
	},
	text: {
		color: "white",
		textTransform: "uppercase",
	},
	icon: {
		marginRight: 5,
		color: "white",
		fontSize: 20,
	},
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    flyingBirds: {
        height: 100,
        width: '100%',
        position: "absolute",
        top: 130
    },
    headerProfile: {
        height: 30,
        width: 30,
        position: "absolute",
        left: 30
    },
    mainTitle: {
        position: "absolute",
        left: "38%",
        top: -3,
        fontSize: 28,
        fontFamily: "leaf-font",
        color: "#004303",
        textShadowColor: "#ddd",
        textShadowOffset: {
            width: 0,
            height: .5
        },
        textShadowRadius: .5
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {

        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {

        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        borderColor: "white",
        marginTop: "15%",
        marginLeft: 10,
        borderWidth: 4,
        height: 80,
        width: 80,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    myPlants: {
        position: "absolute",
        left: 20,
        top: 40,
        fontSize: 14,
        fontFamily: "Avenir"
    },
    plantIcon: {
        height: 140,
        width: 140,
        left: 29,
        top: 26
    },
    forestBackground: {
        position: "relative",
        left: 0,
        height: 533,
        width: 'auto',
        zIndex: -1
    },
    forestBackgroundContainer: {
        height: 450,
        width: '100%',
        position: "absolute",
        bottom: 30,
        zIndex: -1
    }
});

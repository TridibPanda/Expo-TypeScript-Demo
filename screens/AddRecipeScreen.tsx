import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Image,
    Button,
    Alert,
    Modal,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from "expo-file-system";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addRecipe} from '../store/actions/Recipes';

const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const AddRecipeScreen = () => {
    const navigation = useNavigation();
    const [pickedImage, setPickedImage] = useState({ field: '', check: false });
    const [recipeName, setRecipeName] = useState({ field: '', check: false });
    const [ingredients, setIngredients] = useState({ field: '', check: false });
    const [direction, setDirection] = useState({ field: '', check: false });
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image:any = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5
        });

        let fileInfo:any = await FileSystem.getInfoAsync(image.uri);
        console.log(image, "image", fileInfo)

        let imageSize = fileInfo.size / (1024 * 1024);
        if (imageSize > 1) {
            setPickedImage({ field: '', check: true });
            alert(`Maximum image size is 1MB,This image size is ${imageSize.toFixed(2)}`)
        } else {
            setPickedImage({ field: image.uri, check: false });
        }

    };
    

    const submit = async () => {
       
        
        if (pickedImage.field && recipeName.field && ingredients.field && direction.field) {
            setVisible(true);
            dispatch(addRecipe(recipeName.field,ingredients.field,direction.field,pickedImage.field,navigation));
            setTimeout(() => {
				setVisible(false);
			}, 2000)
        } else {
            recipeName.field ? null : setRecipeName({ field: '', check: true });
            ingredients.field ? null : setIngredients({ field: '', check: true })
            direction.field ? null : setDirection({ field: '', check: true })
            pickedImage.field ? null : setPickedImage({ field: '', check: true })
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "#000" }}>
                <Modal visible={visible} transparent={true} animationType="slide">
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0690c2" />
                    </View>
                </Modal>
                <View style={styles.icnTxtContainer}>
                    <View >
                        <Ionicons
                            name='ios-arrow-back'
                            size={40}
                            color='#fff'
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <TouchableOpacity onPress={submit}>
                        <View>
                            <Text
                                style={styles.topMostTxt}
                            >
                                Done
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.headerMargin}>
                        <Text style={styles.headerText}>Add Recipe</Text>
                    </View>

                    <View style={styles.imagePreview}>
                        <Image style={styles.image} source={{ uri: pickedImage.field }} />
                    </View>
                    <Text style={styles.errormessage}>Maximum image size is 1MB.</Text>
                    {pickedImage.check ? <Text style={styles.errortext}>Select one image </Text> : null}
                    <Button
                        title="Take Image"
                        color={'#0690c2'}
                        onPress={takeImageHandler}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Recipe Name"
                            keyboardType="default"
                            autoCapitalize="none"
                            placeholderTextColor="white"
                            onChangeText={(name) => (name ? setRecipeName({ field: name, check: false }) : setRecipeName({ field: '', check: true }))}
                        />
                    </View>
                    {recipeName.check ? <Text style={styles.errortext}>Enter recipe name </Text> : null}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Recipe ingredients"
                            keyboardType="default"
                            autoCapitalize="none"
                            multiline={true}
                            placeholderTextColor="white"
                            onChangeText={(ingredients) => (ingredients ? setIngredients({ field: ingredients, check: false }) : setIngredients({ field: '', check: true }))}
                        />
                    </View>
                    {ingredients.check ? <Text style={styles.errortext}>Enter recipe ingredients </Text> : null}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Recipe direction"
                            keyboardType="default"
                            autoCapitalize="none"
                            multiline={true}
                            placeholderTextColor="white"
                            onChangeText={(direction) => (direction ? setDirection({ field: direction, check: false }) : setDirection({ field: '', check: true }))}
                        />
                    </View>
                    {direction.check ? <Text style={styles.errortext}>Enter recipe direction </Text> : null}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerMargin: {
        marginVertical: Height ? 5 : 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 35,
        marginLeft: Width ? 15 : 10,
    },
    inputContainer: {
        width: '90%',
        marginTop: Height ? 2 : 0,
    },
    input: {
        padding: 8,
    },
    errormessage: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        paddingBottom: 5
    },
    passwordContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        marginTop: 10
    },
    passwordText: {
        flex: 1,
        color: '#fff',
        padding: 10,
        fontSize: 17,
    },
    buttonSignup: {
        borderRadius: 25,
        width: '90%',
        backgroundColor: '#0690c2',
        marginTop: 10
    },
    errortext: {
        color: '#a61d02',
        fontSize: 14,
        alignSelf: 'center',
        padding: 5
    },
    buttonSignupText: {
        padding: Height ? 15 : 10,
        textAlign: 'center',
        color: "white",
        fontSize: 15,
    },
    buttonLogin: {
        borderRadius: 25,
        width: '90%',
        marginVertical: 5,
    },
    buttonLoginText: {
        textAlign: 'center',
        color: '#fff',
        padding: Height ? 15 : 10,
        fontSize: 15,
    },
    bottomText: {
        // marginTop: Height ? 0 : 15,
        // paddingHorizontal: 15,
        textAlign: 'center',
        color: '#7E8084',
        fontSize: Width ? 13 : 10,
    },
    icnTxtContainer: {
        flexDirection: 'row',
        marginTop: Height ? 30 : 30,
        justifyContent: 'space-between',
        marginHorizontal: Width ? 12 : 12,
    },
    topMostTxt: {
        fontSize: 20,
        color: '#d19d00'
    },
    imagePreview: {
        height: 200,
        width: '95%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        alignSelf: 'center',
        margin: Dimensions.get('window').height * 0.02
    },
    image: {
        width: '100%',
        height: '100%'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default AddRecipeScreen;
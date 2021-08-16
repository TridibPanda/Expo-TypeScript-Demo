import Firebase, { db } from '../../config/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RECIPE_DETAILS = 'RECIPE_DETAILS';
export const RECIPES = 'RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';

export const recipes = () => {
    return (dispatch: Object | any) => {
        var data = new Array ;
        db.collection('RecipeList')
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    dispatch({ type: RECIPES, recipes: data });
                }
            }).catch((error) => {
                console.error('Error adding document: ', error);
            })
    }
};

export const addRecipe = (recipeName:string, ingredients:string, direction:string, pickedImage:string,navigation: any) => {
    const imageId = Math.random();
    return async (dispatch: Object | any) => {
        const uid = await AsyncStorage.getItem('uid');
        const response = await fetch(pickedImage);
        const blob = await response.blob();
        var ref = Firebase.storage()
            .ref()
            .child(`RecipeImage/` + `${imageId}.jpeg`);
        await ref.put(blob)


        var ref = Firebase.storage()
            .ref()
            .child(`RecipeImage/` + `${imageId}.jpeg`);
        const image = await ref.getDownloadURL();
        if (image) {
            db.collection('RecipeList')
                .doc(`${imageId}recipe`)
                .set({
                    recipeName: recipeName,
                    ingredients: ingredients,
                    direction: direction,
                    uid: uid,
                    image: image,
                    recipeId: `${imageId}recipe`
                })
                .then(() => {
                    console.log( 'Document saved');
                    navigation.navigate('HomeScreen');
                    dispatch({
                        type: ADD_RECIPE,
                        addRecipe: {
                            recipeName: recipeName,
                            ingredients: ingredients,
                            direction: direction,
                            uid: uid,
                            image: image,
                            recipeId: `${imageId}recipe`
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                });
        } else {
            alert("Something wrong try again later")
        }
    }
};
export const recipeDetails = (id:string) => {
    return { type: RECIPE_DETAILS, recipeId: id };
};
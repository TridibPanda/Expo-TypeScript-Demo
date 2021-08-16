import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
    ScrollView,
	ImageBackground,
    Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { recipeDetails} from '../store/actions/Recipes';

const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const RecipeDetailsScreen = () => {
	
    const navigation = useNavigation();
    const route = useRoute();
	const recipeId: any  =  route.params;
	const dispatch = useDispatch();

	const recipe = useSelector((state:any) => state.recipes.recipe);

const details = () => {
    dispatch(recipeDetails(recipeId.recipeId));
  };

	useEffect(()=>{
		details();
	},[]);

    return(
        <View style={styles.container}>
            <View style={styles.closeBtn}>
				<Ionicons
					name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
					size={Platform.OS === 'android' ? 30 : 40}
					color="white"
					onPress={() => navigation.goBack()}
				/>
			</View>
            <ScrollView>
                <View style={styles.item}>
                <ImageBackground
              source={{ uri: recipe.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {recipe.recipeName}
                </Text>
              </View>
            </ImageBackground>
                </View>
                <View style={styles.Ingredients}>
                    <Text style={styles.title}>Ingredients</Text>
                    <Text style={styles.IngredientsTitle}>{recipe.ingredients}</Text>
                </View>
                <View style={styles.Ingredients}>
                    <Text style={styles.title}>Direction</Text>
                    <Text style={styles.IngredientsTitle}>{recipe.direction}</Text>
                </View>
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
        backgroundColor:"#80a1ad"
	},
    closeBtn: {
		alignSelf: "flex-end",
		// alignSelf: 'center',
		top: Dimensions.get('window').height * 0.05,
		marginRight: Dimensions.get('window').width * 0.05,
		zIndex: 1000,
	},
    item:{
		height: 200,
		width: '95%',
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		overflow: 'hidden',
		marginVertical: 10,
        alignSelf: 'center',
        marginTop:Dimensions.get('window').height * 0.07
	  },
	  bgImage:{
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	  },
	  titleContainer: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingVertical: 5,
		paddingHorizontal: 12
	  },
	  title: {
		fontSize: 25,
		color: 'white',
		textAlign: 'center',
	  },
      Ingredients:{
        alignItems: 'center',
        margin:10
      },
      IngredientsTitle: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center'
	  },

});
export default RecipeDetailsScreen;
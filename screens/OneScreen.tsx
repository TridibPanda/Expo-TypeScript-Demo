import React, { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    FlatList,
    BackHandler,
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { concat } from 'react-native-reanimated';


const listData =[
    {
        recipeName: 'Tea',
        ingredients: 'Tea, milk, sugar',
        direction: 'tea ....',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: '1'
    },
    {
        recipeName: 'Coffee',
        ingredients: 'Coffee, milk, sugar',
        direction: 'coffee .... ',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: '2'
    },
    {
        recipeName: 'Tea 2',
        ingredients: 'Tea, milk, sugar',
        direction: 'tea ....',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: '3'
    },
    {
        recipeName: 'Coffee 2',
        ingredients: 'Coffee, milk, sugar',
        direction: 'coffee .... 2',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: '4'
    },
]

const OneScreen = ({ props }: { props: any }) => {
    const navigation = useNavigation();

    return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.list}>
                
                {listData.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('TwoScreen', { recipe: item })}>
                            <ImageBackground
                                source={{ uri: item.image }}
                                style={styles.bgImage}
                            >
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title} numberOfLines={1}>
                                        {item.recipeName}
                                    </Text>
                                </View>

                            </ImageBackground>
                        </TouchableOpacity>
                    )
                })}
               
            </View>
            </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: "#80a1ad"
    },
    list: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: 15,
        flexWrap: 'wrap',

    },
    item: {
        height: 100,
        width: 150,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 5,
        borderColor: '#fff',
        borderWidth: 1
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
});

export default OneScreen;
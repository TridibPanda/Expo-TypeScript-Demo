import Firebase, { db } from '../../config/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';
export const GET = 'GET';
export const LOCAL  = 'LOCAL';

export const signup = (name : string, email:string, password: string, phone: string | any, location: string) => {
    return (dispatch: Object | any) => {
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result: any) => {
                console.log(result);
                db.collection('Users')
                    .doc(`${result.user.uid}`)
                    .set({
                        name: name,
                        email: email,
                        phone: phone,
                        uid: result.user.uid,
                        location: location,
                    })
                    .then(() => {
                        console.log('Document saved');
                        AsyncStorage.setItem('uid', result.user.uid);
                        dispatch({ type: SIGNUP, uid: result.user.uid })
                    })
                    .catch((error) => {
                        console.error('Error adding document: ', error);
                    });
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    }
};

export const login = (email : string, password: string) => {
    return (dispatch: Object | any) => {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((result :any) => {

                AsyncStorage.setItem('uid', result.user.uid);
                dispatch({ type: LOGIN, uid: result.user.uid })

            })
            .catch((error) => alert(error));
    }
};

export const logout = () => {
    return (dispatch: Object | any) => {
        Firebase.auth()
            .signOut()
            .then(async () => {

                await AsyncStorage.removeItem('uid');
                dispatch({ type: LOGOUT, uid: '' })
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
export const local = () => {
    return async (dispatch: Object | any) => {
        const userId = await AsyncStorage.getItem('uid');
        dispatch({ type: LOCAL, uid: userId })
    }
};

export const update = (name: string,email: string,phone: string | any,location:string,navigation:any) => {
    return async (dispatch: Object | any) => {
        const userId = await AsyncStorage.getItem('uid');
		 db.collection("Users")
			.doc(`${userId}`)
			.update({
				name: name,
				email: email,
				phone: phone,
				location: location,
			})
			.then(() =>{
                navigation.goBack();
                dispatch({type: UPDATE, details:{
                    name: name,
                    email: email,
                    phone: phone,
                    location: location,
                } })
            } )
			.catch((error) => console.log(error));
    }
};

export const get = () => {
    return async (dispatch: Object | any) => {
        const userId:string | any = await AsyncStorage.getItem('uid');
			db.collection('Users')
			.doc(userId)
			.get().then((doc)=> {
                dispatch({type: GET, details: doc.data() })
			}).catch((error) => {
				console.log(error);
			})
    }
};
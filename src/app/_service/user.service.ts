import { Injectable } from "@angular/core";

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { DatabaseService } from "./database.service";

@Injectable({
	providedIn: "root",
})
export class UserService {
	firebaseConfig = {
		apiKey: "AIzaSyCQ1QaqlPctdYo59WE_eCxkCkAawEBiSNU",
		authDomain: "weather-63e37.firebaseapp.com",
		databaseURL: "https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app",
		projectId: "weather-63e37",
		storageBucket: "weather-63e37.appspot.com",
		messagingSenderId: "175183584262",
		appId: "1:175183584262:web:b754a5f8037f5ff7b7f787",
	};

	app = initializeApp(this.firebaseConfig);
	auth = getAuth();

	UserObject = {
		email: "",
		name: "",
		savedcities: ["Berlin", "Kassel"],
	};

	userInitCompleted: BehaviorSubject<boolean>;

	constructor(private database: DatabaseService) {
		this.userInitCompleted = new BehaviorSubject<boolean>(false);
	}

	signup(name: string, email: string, password: string) {
		createUserWithEmailAndPassword(this.auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				this.UserObject.name = name;
				this.UserObject.email = email;
				const UoString = JSON.stringify(this.UserObject);
				user.getIdToken().then((token) => {
					this.database.put(user.uid, token, UoString);
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorMessage, errorCode);
			});
	}

	login(email: string, password: string) {
		signInWithEmailAndPassword(this.auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				user.getIdToken().then((token) => {
					this.database.get(user.uid, token);
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorMessage, errorCode);
			});
	}
}

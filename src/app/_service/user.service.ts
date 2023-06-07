import { Injectable } from "@angular/core";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { DatabaseService } from "./database.service";
import { APIDataService } from "./api-data.service";
import { UserdataModel } from "../_model/userdata.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  firebaseConfig = {
    apiKey: "AIzaSyCQ1QaqlPctdYo59WE_eCxkCkAawEBiSNU",
    authDomain: "weather-63e37.firebaseapp.com",
    databaseURL:
      "https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "weather-63e37",
    storageBucket: "weather-63e37.appspot.com",
    messagingSenderId: "175183584262",
    appId: "1:175183584262:web:b754a5f8037f5ff7b7f787",
  };

  app = initializeApp(this.firebaseConfig);
  auth = getAuth();

  User!: UserdataModel;

  userInitCompleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private database: DatabaseService,
    private data: APIDataService,
    private router: Router
  ) {
    if (localStorage.getItem("user")) {
      const userStr: any = localStorage.getItem("user");
      const userObj = JSON.parse(userStr);
      this.loginWithKeepLogin(userObj);
    }
  }

  signup(name: string, email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential): void => {
        const newUser: UserdataModel = new UserdataModel({
          email,
          name,
        });
        const UserString: string = JSON.stringify(newUser.toJson());
        userCredential.user.getIdToken().then((token: string) => {
          const user = userCredential.user;
          const userString = JSON.stringify({ uid: user.uid, token: token });
          localStorage.setItem("user", userString);
          this.database.put(user.uid, token, UserString).subscribe((result) => {
            this.User = new UserdataModel(result);
          });
          this.userInitCompleted.next(true);
          this.router.navigateByUrl("/home");
        });
      })
      .catch((error): void => {
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
          const userString: string = JSON.stringify({
            uid: user.uid,
            token: token,
          });
          localStorage.setItem("user", userString);
          this.database.get(user.uid, token).subscribe((result) => {
            this.User = new UserdataModel(result);
            this.userInitCompleted.next(true);
            this.router.navigateByUrl("/home");
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
      });
  }

  loginWithKeepLogin(user: { uid: string; token: string }): void {
    this.database.get(user.uid, user.token).subscribe((result) => {
      this.User = new UserdataModel(result);
      this.userInitCompleted.next(true);
      this.router.navigateByUrl("/home");
    });
  }
}

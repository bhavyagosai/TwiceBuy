import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvoagh7VL6tQFmFuFkQXM_CFdRTkbjDQc",
  authDomain: "twicebuy-d94f1.firebaseapp.com",
  projectId: "twicebuy-d94f1",
  storageBucket: "twicebuy-d94f1.appspot.com",
  messagingSenderId: "140865606079",
  appId: "1:140865606079:web:cb5006eaad6837a8f4510a",
  measurementId: "G-37FVMRG731",
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
      this.db = app.firestore();
    } else app.app();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(username, email, password, number) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    this.auth.currentUser.updateProfile({
      displayName: username,
    });
    this.db.collection("profile").doc(this.auth.currentUser.uid).set({
      username,
      email,
      number,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
}

export default new Firebase();

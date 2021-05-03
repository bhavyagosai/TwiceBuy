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
      this.imageURLArray = [];
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
      photoURL: "https://i.imgur.com/Bt7wZW9.png",
    });
    this.db.collection("profile").doc(this.auth.currentUser.uid).set({
      username,
      email,
      number,
    });
  }

  async changeProfileImage(image) {
    const response = await fetch(image);
    const blob = await response.blob();

    var uploadTask = app.storage().ref().child(image).put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // alert("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case app.storage.TaskState.PAUSED:
            // alert("Upload is paused");
            break;
          case app.storage.TaskState.RUNNING:
            // alert("Upload is running");
            break;
        }
      },
      (error) => {
        alert("An error occured! Please try again. Error code: ", error.code);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((imageURL) => {
          this.auth.currentUser
            .updateProfile({
              photoURL: imageURL,
            })
            .then(alert("Profile image updated successfully!"));
        });
      }
    );
  }

  async isInitialized() {
    try {
      return new Promise((resolve) => {
        this.auth.onAuthStateChanged(resolve);
      });
    } catch (error) {
      return alert("An error occured!\n" + error);
    }
  }

  async uploadItem(
    name,
    price,
    condition,
    description,
    address,
    images,
    index
  ) {
    const response = await fetch(images[index]);
    const blob = await response.blob();

    var uploadTask = app.storage().ref().child(images[index]).put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // alert("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case app.storage.TaskState.PAUSED:
            // alert("Upload is paused");
            break;
          case app.storage.TaskState.RUNNING:
            // alert("Upload is running");
            break;
        }
      },
      (error) => {
        alert("An error occured! Please try again. Error code: ", error.code);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((imageURL) => {
            this.imageURLArray.push(imageURL);
            if (index < images.length - 1) {
              this.uploadItem(
                name,
                price,
                condition,
                description,
                address,
                images,
                index + 1
              );
            } else {
              var ID = function () {
                // Generate random key
                return "_" + Math.random().toString(36).substr(2, 9);
              };

              const id = ID();

              this.db
                .collection("feed")
                .doc(id)
                .set({
                  id,
                  name,
                  price,
                  condition,
                  description,
                  address,
                  imageURL: this.imageURLArray,
                  userID: this.auth.currentUser.uid,
                })
                .then(alert("Your item has been uploaded successfully!"));

              this.imageURLArray.length = 0;
            }
          })
          .catch((error) => alert(error));
      }
    );
  }

  async addToFavouries(
    name,
    price,
    condition,
    description,
    address,
    imageURL,
    id,
    userID
  ) {
    // const image = imageURL.toString();
    await this.db
      .collection("profile")
      .doc(this.auth.currentUser.uid)
      .collection("favouriteItems")
      .doc(id)
      .set({
        name,
        price,
        condition,
        description,
        address,
        imageURL,
        id,
        userID: userID,
      })
      .then(alert("Added to favourites!"))
      .catch((error) => alert("Error!\n" + error));
  }

  async removeFromFavouries(id) {
    await this.db
      .collection("profile")
      .doc(this.auth.currentUser.uid)
      .collection("favouriteItems")
      .doc(id)
      .delete()
      .then(alert("Removed from favourites!"))
      .catch((error) => alert("Error!\n" + error));
  }
}

export default new Firebase();

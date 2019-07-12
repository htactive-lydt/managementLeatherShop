import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBYnoXyU73fab3_aFJm-I3d0cCVW1sPC6Y",
  authDomain: "projectdemo-e3434.firebaseapp.com",
  databaseURL: "https://projectdemo-e3434.firebaseio.com",
  projectId: "projectdemo-e3434",
  storageBucket: "projectdemo-e3434.appspot.com",
  messagingSenderId: "792103814355",
  appId: "1:792103814355:web:3ca51fce343d2ea4"
};

export default class firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  users = () => this.db.ref("users");
}

import type="module" { initializeApp } from "firebase/app";
import type="module" { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBa9UrS6dOUZry33QMnZfSKUFsDUBV6Zj0",
    authDomain: "flappybird-1efe3.firebaseapp.com",
    databaseURL: "https://flappybird-1efe3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "flappybird-1efe3",
    storageBucket: "flappybird-1efe3.appspot.com",
    messagingSenderId: "993302118393",
    appId: "1:993302118393:web:468d8426b80ae5e1f14728",
    measurementId: "G-2DZZN436CG"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
        firebase.firestore().settings({
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });



   const submitPlayers = document.querySelector("#submit_btn");
   const name = document.querySelector("#name");
   const leaderBoard = document.querySelector("#leaderBoard");
   const score = document.querySelector("#demo2");

function renderCafe(doc){
    let tr = document.createElement('tr');
    let name = document.createElement('span');
    let score = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    score.textContent = doc.data().score;

    tr.appendChild(name);
    tr.appendChild(score);

    leaderBoard.appendChild(tr);
}

// real-time listener
//snapshot an obj that represents your doc ..grab the data i t contains by calling data on it
db.collection('players').orderBy('score', "desc").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
        changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);}
    })
})

// saving data
submitPlayers.addEventListener("click",function(){
    if( document.getElementById("name").value != ''){
    //e.preventDefault();
    db.collection('players').add({
        name: name.value,
        score: parseInt(score.value)
        });
      }
    });

function display(){
          document.getElementById('table').style.display = "block";
}

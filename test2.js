
//firebase needs thses to figure out on how we r connecting to database
//configuring the app on the front end to link with our firebase which we created on website
var firebaseConfig = {
  apiKey: "AIzaSyCJX6wjtfnxAdGFHdRjfGha8BrSzqPbLpE",
  authDomain: "web-game-56e77.firebaseapp.com",
  databaseURL: "https://web-game-56e77.firebaseio.com",
  projectId: "web-game-56e77",
  storageBucket: "web-game-56e77.appspot.com",
  messagingSenderId: "491481196457",
  appId: "1:491481196457:web:73c64528fe5b643f2c06b8"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore(app);
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

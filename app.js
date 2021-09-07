const firebaseConfig = {
  apiKey: "AIzaSyCtDBr4sIjlWSgfzTJLZ6aRJ5GjNXYTj00",
  authDomain: "sachhay-a54d7.firebaseapp.com",
  projectId: "sachhay-a54d7",
  storageBucket: "sachhay-a54d7.appspot.com",
  messagingSenderId: "1091193809573",
  appId: "1:1091193809573:web:943efaa2106294b7ad7b4c",
  measurementId: "G-LV9TW6X6W6",
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-story-form");

// saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("SAVE ");

  let id = form.fid.value;
  let name = form.fname.value;
  let author = form.fauthor.value;
  let desc = form.fdesc.value;

  var categories = [];
  var checkboxs = document.getElementsByName('category');
  for (var i = 0; i < checkboxs.length; i++){
    if (checkboxs[i].checked === true){
        categories.push(checkboxs[i].value);
    }
  }

  console.log(id);
  console.log(name);
  console.log(author);
  console.log(desc);
  console.log(categories);

  
  if (
    id.length === 0 ||
    name.length === 0 ||
    desc.length === 0 ||
    author.length === 0 || 
    categories.length === 0
  ) {
    alert("Để thêm mới bạn cần điền đầy đủ các trường dữ liệu");
    return;
  }

  let intId = parseInt(id);

  if (isNaN(id) || id == undefined) {
    alert("Dữ liệu ID phải là một số nguyên dương");
    return;
  }

  db.collection("sachngontinh").doc(id).set({
    id:  parseInt(id.trim()),
    name: name.trim(),
    author: author.trim(),
    desc: desc.trim(),
    categories: categories,
  }).then( () => {
    alert("Thêm mới sách thành công");
  }).catch((error) => {
    console.log(error)
  })

  form.fid.value = "";
  form.fname.value = "";
  form.fauthor.value = "";
  form.fdesc.value = "";

  for (var i = 0; i < checkboxs.length; i++){
    checkboxs[i].checked = false;
  }
});

// real-time listener
// db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data());
//         if(change.type == 'added'){
//             renderCafe(change.doc);
//         } else if (change.type == 'removed'){
//             let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
//             cafeList.removeChild(li);
//         }
//     });
// });

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });

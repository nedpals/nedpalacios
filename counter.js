var hitCounter = document.getElementById('hit-counter');
var hitCounterCount = document.getElementById('hit-counter-count');

function getIPAddress() {
  return fetch('https://api.ipify.org')
    .then(function (resp) {
      return resp.text();
    });
}

function handleError(err) {
  if (err) {
    hitCounter.style.display = 'none';
    console.error(err);
  }
}

function initializeFirebase() {
  firebase.initializeApp({
    apiKey: "AIzaSyCpUhBEiPU35g7H0QZBx5kjofa_mpyqRNQ",
    authDomain: "site-counter-f78d0.firebaseapp.com",
    projectId: "site-counter-f78d0",
    storageBucket: "site-counter-f78d0.appspot.com",
    messagingSenderId: "629387880758",
    appId: "1:629387880758:web:b8b216b72e1918d5162b97",
    databaseURL: "https://site-counter-f78d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
  });
}

function startCounter() {
  var db = firebase.firestore();
  var visitors = db.collection('visitors');
  var totalHitsDb = firebase.database().ref('totalHits');

  totalHitsDb.on('value', function (snapshot) {
    hitCounterCount.innerHTML = snapshot.val();
  });

  visitors.orderBy('startsAt', 'desc').limit(1).get()
    .then(function (snapshot) {
      var shouldCreateData = snapshot.empty;
      var firstSnapshot = snapshot.docs[0];

      if (typeof firstSnapshot !== 'undefined') {
        var data = firstSnapshot.data();
        var startsAt = data.startsAt.toDate();
        var endsAt = data.endsAt.toDate();
        var currentDatetime = new Date();
        if (currentDatetime >= startsAt && currentDatetime <= endsAt) {
          shouldCreateData = false;
        } else {
          shouldCreateData = true;
        }
      }

      if (shouldCreateData) {
        var startsAt = new Date();
        var endsAt = new Date(startsAt);
        endsAt.setHours(endsAt.getHours() + 1);
        return visitors.add({ startsAt, endsAt, ipAddresses: [] });
      }

      return firstSnapshot;
    })
    .then(function (visitorDoc) {
      if (Object.getPrototypeOf(visitorDoc).hasOwnProperty('data')) {
        return visitorDoc;
      } else {
        return visitorDoc.get();
      }
    })
    .then(function (visitorDoc) {
      return getIPAddress()
        .then(function (ipAddress) {
          var data = visitorDoc.data();
          var ipAddresses = data.ipAddresses || [];

          if (ipAddresses.indexOf(ipAddress) == -1) {
            return visitorDoc.ref.update({
              ipAddresses: firebase.firestore.FieldValue.arrayUnion(ipAddress)
            }).then(function () {
              return true;
            });
          }

          return false;
        });
    })
    .then(function (shouldUpdate) {
      if (!shouldUpdate) return;
      totalHitsDb.transaction(function (totalHits) {
        return totalHits + 1;
      }, handleError);
    })
    .catch(handleError);
}

initializeFirebase();
startCounter();
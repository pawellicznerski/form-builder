
    if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }

    var database, idb_request;
    idb_request = window.indexedDB.open("indexed-db",1);
    idb_request.onerror = function(event) {
      alert("Could not open Indexed DB due to error: " + this.errorCode);
    };
    /* if the database you specified cannot be found or the version number
    is old, you will need an upgrade to create the new database schema */
    console.log(database);
    idb_request.upgradeneeded = function(event) {
      console.log("duuuuuuuuuuuuuupa");
      /* Here we create a new object store called data, and give it an auto-
      generated key path */
      // let db = request.result,
      //          store = db.createObjectStore("FormBuilderStore",{
      //            keyPath:"id"}),
      //          index = store.createIndex("type","type",{unique: false});
      //


      // let storage = this.result.createObjectStore("data", { autoIncrement: true });

      let db = idb_request.result;
      let storage = db.createObjectStore("FormBuilderStore",{
                 keyPath:"id"});
      let index = storage.createIndex("type","type",{unique:false});
      // add an object to the "data" objectStore with the key, "save-data"
      storage.add(data);
      console.log("data------", data);
      // storage.add({ color: "#2793e8", date: "not found.", presses: "0" }, "save-data");
      alert("Creating a new database!");
    };
    // if you successfully open the database use this callback function
    idb_request.onsuccess = function(event) {
      database = this.result
      window.indexedDB.deleteDatabase("indexed-db");
      database.close();



      return;
      // console.log(idb_request.result);
      // console.log(window.indexedDB);
      // let db = this.result;
      // let tx = db.transaction("FormBuilderStore","readwrite");
      // let storage = tx.objectStore('type');
      // let index = storage.index('FormBuilderStore');
      // //
      // db.onerror = function(e) {
      //   console.log("Error" + e.target.errorCode);
      // }
      //
      // store.put({
      //     id:234,
      //     type:'text',
      //     question:"second one",
      //     conditionType:'',
      //     conditionOption:'',
      //     conditionValue:'',
      //     subform:[]
      // })
      //
      // let q1 = store.get(1);
      // let qs = index.get("text");
      //
      // q1.onsuccess = function(){
      //   console.log(q1.result);
      //   console.log(q1.result.questionText);
      // }
      // qs.onsuccess = function(){
      //   console.log(qs.result.questionText);
      // }
      //
      // tx.oncomplete = function(){
      //   db.close();
      // }


      database = this.result;// store the database for later use
      // now we are going to use some data from our database
      let storage = database.transaction("data", "readwrite").objectStore("data");
      storage.get('save-data').onsuccess = function(event) {
        console.log("FormBuilderStore:::::::",this.result);
        // this.setState({from:this.result})
        // background = document.body.style.backgroundColor = this.result.color;
        document.getElementById("date").innerHTML = this.result.date;
        // presses = document.getElementById("presses").innerHTML = this.result.presses;
        this.result.date = new Date().toString();
        storage.put(this.result, "save-data");
      };
      alert("Successfully opened database!");
    };
    // all the variables to run our application
    var buttons, background, presses;
    // get the array of buttons, which are just a elements:
    buttons = document.querySelectorAll("a");
    // set presses equal to zero (this will be reset if our database loads):
    presses = 0;
    // loop through all the buttons:
    for (let index = buttons.length - 1; index > -1; -- index) {
      // add a click listener to each button:
      buttons[index].addEventListener("click", function(event) {
        // Clear the database if the X button is pressed:
        if (database && this.innerHTML == "X") {
          window.indexedDB.deleteDatabase("indexed-db");
          database = undefined;
          // set up html for the white screen after deleting database
          document.getElementById("button-container").style.visibility = "hidden";
          document.querySelector("h1").innerHTML = "You just deleted the database! Refresh the page to create a new one.";
          document.querySelector("h1").style = "color:" + background;
          document.body.style.backgroundColor = "#ffffff";
          return;
        } else if (database) { // if the database was established
          presses ++;
          // when a button is clicked, store its background color for saving:
          background = this.style.backgroundColor;
          // change the background color of the page to the button's color:
          document.body.style.backgroundColor = background;
          document.getElementById("presses").innerHTML = presses;
          // save the new data to the database in the objectStore, "data"
          var storage = database.transaction("data", "readwrite").objectStore("data");
          // get returns the object pointed to by the key, "save-data"
          storage.get("save-data").addEventListener("success", function(event) {
            // this.result is the object "save-data" was pointing to
            this.result.color = background;
            this.result.presses = presses;
            // put writes the changed object back to the "data" objectStore
            storage.put(this.result, "save-data");
          });
        }
      });
    }


    (function () {

  var DEFAULT_DEPTH = 500;

  var output = document.getElementById('output');
  var form = document.getElementById('form');
  var submit = document.getElementById('submit');
  var depthInput = document.getElementById('depth_input');
  form.onsubmit = function (e) {
    e.preventDefault();
  }
  submit.onclick = function (e) {
    testIt();
    e.preventDefault();
  }
  depthInput.value = DEFAULT_DEPTH;

  function log(msg) {
    output.innerHTML = output.innerHTML || '';
    output.innerHTML += "\n" + (msg || '');
  }
  function createDeeplyNestedObject(depth) {
    var obj = {id: 'foo'};
    var key = obj;
    for (var i = 0; i < depth; i++) {
      key = key[i] = {};
    }
    return obj;
  }

  function testIt() {

    log();

    var req = indexedDB.open('test', 1);

    req.onupgradeneeded = function (e) {
      var db = e.target.result;

      if (db.objectStoreNames.contains('test')) {
        db.deleteObjectStore('test');
      };

      db.createObjectStore('test', {keyPath: 'id'});
    }
    req.onsuccess = function (e) {
      var db = e.target.result;

      var depth = parseInt(depthInput.value, 10);
      log('Building a deeply-nested object of depth ' + depth + '...');
      var obj = createDeeplyNestedObject(depth);
      log('Built a deeply-nested object.');
      var txn = db.transaction(['test'], 'readwrite');

      log('Trying to insert deeply-nested object...');
      var putReq = txn.objectStore('test').put(obj);
      putReq.onsuccess = function() {
        log('Successfully inserted deeply-nested object');
        var getReq = txn.objectStore('test').get('foo');
        getReq.onsuccess = function () {
          log('Successfully retrieved deeply-nested object');
        }
        getReq.onerror = log;
      }

      putReq.onerror = log;

      txn.oncomplete = function () {
        log('Transaction finished');
      };
      txn.onerror = log;
    };

    req.onerror = log;
  }

  testIt();

})();

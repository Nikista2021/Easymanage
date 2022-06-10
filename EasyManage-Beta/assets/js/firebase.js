var firebaseConfig = {
    apiKey: "AIzaSyB9xJTQPeuNGLXpRUUP1UJ9Uvsn0SaYXts",
    authDomain: "to-do-99308.firebaseapp.com",
    projectId: "to-do-99308",
    storageBucket: "to-do-99308.appspot.com",
    messagingSenderId: "155862218990",
    appId: "1:155862218990:web:7e933cd518a56b86d61bff"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
const database = getDatabase(firebaseConfig);

var myName = prompt("Enter your name");

    submit.addEventListener('click', (e) => {
        var message = document.getElementById('message').value;
        var name = myName;

        const id = push(child(ref(database), 'messages')).key;

        set(ref(database, 'messages/' + id), {
            name: name,
            message: message
        });
        document.getElementById('message').value = "";
        alert('message has sent');

    });


    const newMsg = ref(database, 'messages/');
    onChildAdded(newMsg, (data) => {
        if(data.val().name != myName) {
            var divData = '<div class="d-flex justify-content-start mb-4" id="fromDiv">\n' +
                '                        <div class="img_cont_msg">\n' +
                '                            <img src=""\n' +
                '                                 class="rounded-circle user_img_msg">\n' +
                '                        </div>\n' +
                '                        <div class="msg_cotainer" >\n' +
                '                            '+data.val().message+'' +
                '                            <span class="msg_time"></span>\n' +
                '                        </div>\n' +
                '                    </div>';
            var d1 = document.getElementById('bodyContent');
            d1.insertAdjacentHTML('beforebegin', divData);
        }else{
            var divData = '<div class="d-flex justify-content-end mb-4">\n' +
                '                        <div class="msg_cotainer_send" id="sendDiv">\n' +
                '                            '+data.val().message+'' +
                '                            <span class="msg_time_send">8:55 AM, Today</span>\n' +
                '                        </div>\n' +
                '                        <div class="img_cont_msg">\n' +
                '                            <img src=""\n' +
                '                                 class="rounded-circle user_img_msg">\n' +
                '                        </div>\n' +
                '                    </div>';
            var d1 = document.getElementById('bodyContent');
            d1.insertAdjacentHTML('beforebegin', divData);
        }
    });
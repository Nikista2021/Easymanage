let navbar_container = document.querySelector(".navbar_continer");

// animation for menu in sidebar
let openMenubtn = document.querySelector(".navbar_container .bx-menu");
let closeMenubtn = document.querySelector(".navbar_menu .bx-x");
let navMenu = document.querySelector(".navbar_menu");

openMenubtn.addEventListener("click", ()=>{
    navMenu.style.left="0";
});
closeMenubtn.addEventListener("click", ()=>{
    navMenu.style.left="-100%";
});

// animation for submenu in sidebar
let htmlCssArrow = document.querySelector(".html-css-arrow");
htmlCssArrow.addEventListener("click", ()=>{
    navMenu.classList.toggle("show1");
});


function SendMail(){
    var params = {
        from_name : document.getElementById("fromname").value,
        email_id : document.getElementById("email").value,
        message : document.getElementById("features").value
    }
    emailjs.send("service_08a30mm", "template_9823xlo", params).then(function(res){
        alert("Success!" + res.status);
    })
}



function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items){
    let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="assets/images/icon-check.svg">';
        checkMark.addEventListener("click", function(){
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
        }
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem)
    })
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}



function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems();





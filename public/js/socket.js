// const user = require("../server/mongoose");

const socket = io();
const message = document.getElementById("message")
const send = document.getElementById("send")
const usersnames = document.getElementById("username").innerText
document.querySelector("textarea").placeholder = "Send a personal message!!!"
socket.on('chatusers', (data) => {
    document.getElementById("total-users").innerHTML = `TOTAL USERS       ${data}`
})





let i = 0; let a = 0;

// socket.on("connection",())
socket.on('socketid', (sockt) => {
    socket.emit('usersockt', usersnames, sockt)

})

socket.emit('usersnames', usersnames)

socket.on("userids", (username, socketid) => {


    const userlist = document.createElement("div")

    userlist.id = username
    userlist.className = "user-list"
    userlist.innerHTML = username
{
    do {
        const socketidlist = document.createElement("section")

        const personalmsgin = document.createElement("input")
        const personalsendbtn = document.createElement("button")


        personalmsgin.id = "personalmsgin" + i
        personalmsgin.className = "personalmsgin"
        personalmsgin.placeholder ="send personal message!!"
        personalmsgin.onclick = () => {
            userlist.value = 2;
        }

        socketidlist.className = "whisper-btn"
        socketidlist.id = "socketid" + i
        socketidlist.innerHTML = socketid
      
        socketidlist.onclick = () => {
           socketidlist.style.animationName ="send"
           socketidlist.style.animationDuration ="1.5s"
           socketidlist.style.animationTimingFunction ="ease-in-out"
           socketidlist.style.animationIterationCount ="1"
            const personalmsg = personalmsgin.value
            console.log(personalmsg)
            const sockid = document.getElementById(socketidlist.id).innerHTML;
            if(personalmsg!=""){  socket.emit("personalmsg", personalmsg, sockid, usersnames)}
          
            userlist.value = 1
        }

       
      
        userlist.value = 1;
        let interval;
        userlist.onclick = () => {
            if(usersnames != username){
            if (userlist.value == 1) {
                userlist.appendChild(personalmsgin)
                userlist.value = 0;

                userlist.style.height = "12vh"
                userlist.style.transitionDuration = "0.5s"
                userlist.appendChild(socketidlist)
                socketidlist.style.animationName ="send"
           socketidlist.style.animationDuration ="1.5s"
           socketidlist.style.animationTimingFunction ="ease-in-out"
           socketidlist.style.animationIterationCount ="1"
                
            }

            else if (userlist.value == 2) {
                userlist.style.height = "12vh"
                userlist.value = 0
            }

            else if (userlist.value == 0) {

                userlist.value = 1
                document.getElementById(username).removeChild(personalmsgin)
                document.getElementById(username).style.height = "5vh"
                document.getElementById(username).style.transitionDuration = "0.5s"
                document.getElementById(username).removeChild(socketidlist)


            }}
            else{
                document.getElementById(username).innerText = "you !"
                document.getElementById(username).style.backgroundColor ="#ff9e66"
                document.getElementById(username).style.boxShadow = "0px 0px 0px 0px"
              interval =  setInterval(namechange, 700)
                
            }
 function namechange(){
    document.getElementById(username).innerText = username
    document.getElementById(username).style.backgroundColor = "white"
    document.getElementById(username).style.boxShadow = "2px 2px 5px 5px inset gray"
    clearInterval(interval)
 }

        }
       
        i++;
    } while (i < document.getElementById("total-users").innerHTML)


    document.getElementById("users").appendChild(userlist)


}})


socket.on("usernamesw", (username1, socketid1) => {
    document.querySelectorAll(".user-list").forEach((e) => {
        if (e.id == username1) {

            document.getElementById("users").removeChild(e)
        }
    })
    const userlist = document.createElement("div")
    

    userlist.id = username1
    userlist.className = "user-list"
    userlist.innerHTML = username1


    do {
        const socketidlist = document.createElement("section")
        
        const personalmsgin = document.createElement("input")
        const personalsendbtn = document.createElement("button")


        personalmsgin.id = "personalmsgin" + i
        personalmsgin.className = "personalmsgin"
        personalmsgin.placeholder ="send personal message!!"
        personalmsgin.onclick = () => {
            userlist.value = 2;
        }

        socketidlist.className = "whisper-btn"
        socketidlist.id = "socketid" + i
        socketidlist.innerHTML = socketid1
        personalmsgin.appendChild(socketidlist)
        socketidlist.onclick = () => {
            socketidlist.style.animationName ="send"
           socketidlist.style.animationDuration ="1.5s"
           socketidlist.style.animationTimingFunction ="ease-in-out"
           socketidlist.style.animationIterationCount ="1"

            const personalmsg = personalmsgin.value
            console.log(personalmsg)
            const sockid = document.getElementById(socketidlist.id).innerHTML;
            if(personalmsg!=""){socket.emit("personalmsg", personalmsg, sockid, usersnames)}
            
            userlist.value = 1
        }

        
        userlist.value = 1;
        userlist.onclick = () => {

            if (userlist.value == 1) {
                userlist.appendChild(personalmsgin)
                userlist.value = 0;

                userlist.style.height = "12vh"
                userlist.style.transitionDuration = "0.5s"
                userlist.appendChild(socketidlist)
                socketidlist.style.animationName ="send"
           socketidlist.style.animationDuration ="1.5s"
           socketidlist.style.animationTimingFunction ="ease-in-out"
           socketidlist.style.animationIterationCount ="1"
                
            }

            else if (userlist.value == 2) {
                userlist.style.height = "12vh"
                userlist.value = 0
            }

            else if (userlist.value == 0) {

                userlist.value = 1
                document.getElementById(username1).removeChild(personalmsgin)
                document.getElementById(username1).style.height = "5vh"
                document.getElementById(username1).style.transitionDuration = "0.5s"
                document.getElementById(username1).removeChild(socketidlist)


            }


        }
       
        i++;
    }  while (i < document.getElementById("total-users").innerHTML)

    document.getElementById("users").appendChild(userlist)


})


socket.on("disconnecteduser", (usernamet, socketidt) => {

    document.querySelectorAll(".user-list").forEach((e) => {
        if (e.id == usernamet) {
            document.getElementById("users").removeChild(e)

        }
    })




})



document.querySelector("textarea").addEventListener('keyup', e => {
    if (e.key == "Enter") {
        let scrollh = e.target.scrollHeight
        console.log(scrollh)
        document.querySelector("textarea").style.height = `${scrollh}px`
    }

})

socket.on("privatemsg", (personalmsg, socketids, username1, room) => {
    const personal = document.createElement("div")
    const namehold = document.createElement("div")
    const personalchat = document.createElement("button")
    personalchat.id = "personalchatbtn"

    namehold.id = "personalmsgsender"
    namehold.innerHTML = username1
    personal.className = "personalmsgcont"
    personal.id = "personalmsgcont"
    personal.innerHTML = personalmsg
    personalchat.onclick = () => {


        socket.emit("personal", socketids)

    }
    personal.appendChild(namehold)
    // personal.appendChild(personalchat)

    document.getElementById("msgs-container").append(personal)
})
send.addEventListener("click", submit)
document.addEventListener("keydown", function (eve) {
    var x = eve.key
    if (x == "Enter") {
        if (document.getElementById("message").value != "") {

            send.click()
            document.getElementById("message").value = ""
        }

    }
})




function submit() {
    const d = new Date()
    console.log("hi")
    const data = message.value;
    const user = document.getElementById("username").innerText
    const msgdata = {
        message: data,
        time: { hrs: d.getHours(), min: d.getMinutes() },
        username: user

    }
    console.log(msgdata)
    socket.emit("message", msgdata)

    const msgdisplay = document.createElement("div")
    const timedisplay = document.createElement("div")
    const username = document.createElement("div")
    timedisplay.id = "timedisp"
    username.id = "userdisp"
    msgdisplay.className = "msg-bar-right"
    msgdisplay.id = "msg-bar-right"
    msgdisplay.innerHTML = msgdata.message;
    timedisplay.innerHTML = `${msgdata.time.hrs} : ${msgdata.time.min}`;
    username.innerHTML = msgdata.username
    msgdisplay.appendChild(timedisplay)
    msgdisplay.appendChild(username)
    const msgscontainer = document.getElementById("msgs-container")
    msgscontainer.appendChild(msgdisplay)
}


socket.on("recievedmsg", (msgdata) => {


    const msgdisplay = document.createElement("div")
    const timedisplay = document.createElement("div")
    const username = document.createElement("div")
    timedisplay.id = "timedisp1"
    username.id = "userdisp1"
    msgdisplay.className = "msg-bar-left"
    msgdisplay.id = "msg-bar-left"
    msgdisplay.innerHTML = msgdata.message
    username.innerHTML = msgdata.username
    timedisplay.innerHTML = `${msgdata.time.hrs} : ${msgdata.time.min}`
    msgdisplay.appendChild(timedisplay)
    msgdisplay.appendChild(username)
    const msgscontainer = document.getElementById("msgs-container")
    msgscontainer.appendChild(msgdisplay)
    message.value = ""
})

let opencommune = document.getElementById("opencommune")
document.getElementById("opencommune").addEventListener("click",()=>{
    if(opencommune.value =="close"){
  opencommune.value = "open"
  document.querySelector(".chatbox").style.width = "80vw"
   document.querySelector(".chatbox").style.height = "100vh"
 document.querySelector("#opencommune").style.boxShadow = "1px 1px 5px inset"
 document.querySelector("#opencommune").style.width = "15vw"
 document.querySelector("#opencommune").innerHTML = `<i class="fa fa-backward" aria-hidden="true"></i>`
 document.querySelector("#opencommune").style.animation = "none"
    }
    else if(opencommune.value =="open"){
        opencommune.value = "close"
          document.querySelector(".chatbox").style.width = "0vw"
   document.querySelector(".chatbox").style.height = "100vh"
    document.querySelector("#opencommune").style.boxShadow = "1px 1px 5px "
     document.querySelector("#opencommune").style.width = "fit-content"
      document.querySelector("#opencommune").innerHTML = `COMMUNE 🫂`
 document.querySelector("#opencommune").style.animation = "opencommune-btn 1s infinite ease"

    }
    
})

let chatideaarr = ["COMMUNE","Meet New Minds!","Group Gabs Solo Chats","Mystery Meets","Private Parleys: One-on-One",
    "Engage Debate Discover!","Hot Topics, Cool People!","Chat Unknowns !"
]
let z=0 ;
setInterval(()=>{

 if(z>=8){
    z=0
 }
 else{document.querySelector(".chat-ideas").innerHTML = chatideaarr[z]
    z = z+1
 }
  
},1500)
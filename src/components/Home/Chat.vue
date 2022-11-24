<script setup>
import { useCounterStore } from "../../stores/counter.js"
import { ref ,onMounted ,watch} from 'vue'
import { initializeApp } from "firebase/app";
import { getDatabase, ref as fbref, set, child, get, update, push, onValue, } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAc_y-1VBJZalvud50kqtfc-KCG9Qriy00",
  authDomain: "mygame01-6fe41.firebaseapp.com",
  databaseURL: "https://mygame01-6fe41-default-rtdb.firebaseio.com",
  projectId: "mygame01-6fe41",
  storageBucket: "mygame01-6fe41.appspot.com",
  messagingSenderId: "444640701465",
  appId: "1:444640701465:web:8aaba0d8ef73abaaf7ce88"
};
const firedata = initializeApp(firebaseConfig);
const db = getDatabase(firedata);

const chatRef = fbref(db, 'Chat/');

const User = useCounterStore()

const message = ref('')

function addmessage(){
  const key = push(chatRef).key;
  if(!message.value.trim()||User.user.account ==''){
    return 
  }
  let Today = new Date();
  set(fbref(db, `Chat/${key}`), {
    name:User.user.account,
    message:message.value,
    icon:User.Profile,
    time:Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +" -"+ Today.getHours()+":"+ Today.getMinutes() +":"+ Today.getSeconds()+"-",
  })
  message.value = ""
}

function time(){
  let element = document.getElementById("chat-home");
  let timeOut
  clearTimeout(timeOut)
  timeOut = setTimeout(()=>{element.scrollTop = element.scrollHeight}, 100)
}

const chatarray = ref([])
onValue(chatRef, (snapshot) => {
  chatarray.value = snapshot.val()
  time()
});

watch(User, () => {
  time()
});


function setImg(number){
  return `./imgage/character/c${number}_C.png`
}

</script>



<template>
    <button class="chat-open" @click="User.chatopen = !User.chatopen">展開聊天窗</button>
    <div id="chat-home" :class="{display_none:!User.chatopen,chat_open_anm:User.chatopen}">
        
    <div class="chat-box" v-for="(item, key) in chatarray">
      <div class="chat-img"><img :src="setImg(item.icon.img)" alt=""></div>
      <div class="chat-font">
        <span>{{item.name}}：</span>
        <p class="chat-time">{{item.time}}</p>
        <p class="chat-text">{{item.message}}</p>   
      </div> 
    </div>

  </div>
  <div class="chat-input"><input type="text" v-model="message" @keyup.enter="addmessage"><button @click="addmessage">送出</button></div>
</template>
  
<style lang="scss" scoped>
@import '../../assets/display.css';
.chat_open_anm{
  animation:open .5s 1 forwards;
}
@keyframes open{
  from{
    height:0px;
    width:0px;
  }
  to{
    height:300px;
    width:340px;
  }
}

.chat-open{
  background:rgba(123, 150, 199, 0.514);
  padding: 2px;
  border: none;
  cursor: pointer;
}
.chat-open:hover{
  background:rgba(63, 86, 129, 0.514);
}
.background-img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
#chat-home{
overflow-y:scroll;
height:300px;
width:340px;
margin:0px 0px 0 0px;
border-radius: 5px 40px 0 0;
display: flex;
flex-direction: column;
.chat-box:not(:first-child){
    margin-top: 2px;
}
.chat-box{
    display: flex;
    border-bottom: solid 1px;
    padding: 2px;
    background: rgba(255, 255, 255, 0.774);
    .chat-img{
        width: 60px;
        height: 60px;
        border-radius: 40px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border:solid 2px;
        img{
            height: 100%;
            width: auto;
        }
    }
    .chat-font{
        width:90%;
        margin-left: 5px;
        span{
        display: inline;
        font-weight:bold;
        }
        .chat-text{
        font-size: 1em;
        }
        .chat-time{
        font-size: .5em;
        display: inline;
        }    
    }
}
}
.chat-input{
    margin-top: 2px;
    width: 100%;
    display: flex;
    input{
        flex-grow:1;
        padding: 2px 5px 2px 5px;
        font-size: 1.2rem;
        color: #49525c;
        border: 1px solid #ced4da;
    }
    button{
        color: #ffffff;
        background-color: #2b9fa7b7;
        border: none;
        cursor: pointer;
    }
    button:hover{
        color: #ffffff;
        background-color: #0b97a1e1;
        border: none;
    }
}
#chat-home::-webkit-scrollbar {
    display: none;
}
  </style>
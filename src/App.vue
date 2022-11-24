<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref ,onMounted ,watch} from 'vue'
import Footer from './views/Footer.vue'
import { useCounterStore } from "./stores/counter.js"
import { GetIP } from "./components/api.js"; 
import { initializeApp } from "firebase/app";
import { getDatabase, ref as fbref, set, child, get, update,push } from "firebase/database";
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
const database = getDatabase(firedata);
const dbRef = fbref(getDatabase());
const db = getDatabase();
const User = useCounterStore()

function editCommodity(acc){
  if(User.user.account !== ""){
      let Today = new Date();
      if(User.user.remainCard !== undefined){
        update(fbref(db,"Users/"+acc),{
        remainCard:User.user.remainCard
        })
      }
      update(fbref(db,"Users/"+acc),{
        havercard:User.user.havecard,
        team:User.user.team,
        Profile:{img:User.Profile.img},
        ProfileCover:{img:User.ProfileCover.img},
        SummonPoints:User.SummonPoints,
        AwakePoints:User.AwakePoints,
        drama:User.drama,
        pvp:User.pvp,
        win:User.win,
        lose:User.lose,
        time:Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +"/"+ Today.getHours()+":"+ Today.getMinutes() +":"+ Today.getSeconds(),
      })
  .then(()=>{
      editOK.value = true
      getdata()
  })
  .catch((error)=>{
      
  })
  }else{
      alert("你沒有登入")
  }
}

watch(User, () => {
    editCommodity(User.user.account)
});

const router = useRouter()

// 下方為IP紀錄
const IP = ref('')
GetIP()
  .then(response => {
    response = response.data.trim().split('\n').reduce(function(obj, pair) {
    pair = pair.split('=');
    return obj[pair[0]] = pair[1], obj;
  }, {});
    IP.value = response.ip
    UpIP()
  })
  .catch( error => {
    console.log(error);
  })

function UpIP(){
let Today = new Date();
const chatRef = fbref(db, 'IP/');
const key = push(chatRef).key;
set(fbref(db, `IP/${key}`), {
    IP:IP.value,
    time:Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +"/"+ Today.getHours()+"-"+ Today.getMinutes()+"-"+ Today.getSeconds(),
});
}
</script>

<template>
  <header>
    <div class="wrapper">
      <h3>幻夢英靈殿</h3>
      <button @click="router.replace({ path: '/' })" :class="{display_none:User.user.account !==''}">目前未登入，按此返回登入畫面</button>
    </div>
  </header>
  <RouterView />
  <Footer />
</template>

<style lang="scss" scoped>
@import './assets/display.css';
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: end;
}

nav a.router-link-active {
  color: rgb(0, 38, 255);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid black;
  color: rgba(110, 137, 185, 0.644);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header {
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    h3{
      text-align: center;
      font-size: 2em;
      margin-bottom: 10px;
      color: rgb(31, 122, 115);
    }
    button{
      width: 100%;
      padding: 3px;
      font-size: 1.3em;
    }
  }
}
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

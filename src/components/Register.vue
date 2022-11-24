<script setup>
import { useRouter } from 'vue-router'
import { ref ,onMounted ,watch} from 'vue'
import { useCounterStore } from "../stores/counter.js"
import Character from "./Character/Season01.js"
import { initializeApp } from "firebase/app";
import { getDatabase, ref as fbref, set, child, get } from "firebase/database";
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

// 登入成功撈取後端資料
function getfb(account){
  get(child(dbRef, `Users/${account}`)).then((snapshot) => {
  if (snapshot.exists()) {
    User.user.account = account
    User.user.havecard = snapshot.val().havercard
    User.user.remainCard = snapshot.val().remainCard
    User.user.team = snapshot.val().team
    User.Profile.img = snapshot.val().Profile.img
    User.ProfileCover.img = snapshot.val().ProfileCover.img
    User.SummonPoints = snapshot.val().SummonPoints
    User.AwakePoints = snapshot.val().AwakePoints
    User.drama = snapshot.val().drama
    User.pvp= snapshot.val().pvp
    User.win= snapshot.val().win
    User.lose= snapshot.val().lose
  } else {
    console.log("沒有資料");
  }
  }).catch((error) => {
    console.error(error);
  });
}

const router = useRouter()

const UserName = ref('')
const UserPassword = ref('')
function Login(){
    if(UserName.value === "" || UserPassword.value === ""){
        alert("請輸入完整帳號密碼")
    }else{
        get(child(dbRef,"Users/"+UserName.value)).then((snapsoht)=>{
        if(snapsoht.val() === null){
            alert("查無此帳戶")
        }else{
            if(snapsoht.val().password === UserPassword.value){
                getfb(UserName.value)
                alert("登入成功")
                router.replace({ path: '/Home' })
            }else{
                alert("密碼錯誤")
            }
        }
        })
        .catch((error)=>{
            alert("資料存取錯誤")
        })
    }
}


// 建立卡池
function SetRemainCard(){
const RemainCard1 = Character.filter(obj =>obj.awake == false)
const RemainCard2 = []
let RemainCard3 = []
for(let x=0;x<RemainCard1.length;x++){
    RemainCard2.push(RemainCard1[x].number)
}
RemainCard3 = RemainCard2.filter(obj =>obj !== '001'&&obj !=='003'&&obj !=='017'&&obj !=='019'&&obj !=='021')
RemainCard3.push('208')
return RemainCard3
}
// 註冊
function Register(){
    const rules = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/;
    if(UserName.value === "" || UserPassword.value === ""){
        alert("請輸入完整帳號密碼")
        return
    }else if(!rules.test(UserName.value)){
        alert("請輸入至少2個字符，最多10個字符")
        return
    }else{
        get(child(dbRef,`Users/`+UserName.value)).then((snapsoht)=>{
        if(snapsoht.val() === null){
            // 註冊成功建立帳戶
            let Today = new Date();
            set(fbref(db, `Users/${UserName.value}`), {
                havercard:['001','003','017','019','021'],
                remainCard:SetRemainCard(),
                team:['001','003','017','019','021'],
                Profile:{img:'003'},
                ProfileCover:{img:'021'},
                SummonPoints:10,
                AwakePoints:5,
                drama:'a001_01',
                pvp:0,
                win:0,
                lose:0,
                password:UserPassword.value,
                time:Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +"/"+ Today.getHours()+":"+ Today.getMinutes() +":"+ Today.getSeconds(),
            });
            alert("註冊完成")
            Login()
        }else{
            alert("已有此帳號")
        }
        })
        .catch((error)=>{
            alert("資料存取錯誤")
        })
    }
}

</script>

<template>
<div id="Register">
    <img class="background-img" src="../../public/imgage/pexels-pixabay-268533.jpg" alt="">

    <div class="login" :class="{display_none:User.user.account ==''}">
        <div class="login-home">
            <h3>你登入，玩家名稱：{{User.user.account}}</h3>
            <button @click="router.replace({ path: '/Home' })">點擊返回殿堂</button>
        </div>
    </div>

    <div class="login" :class="{display_none:User.user.account !==''}">
        <div class="login-home">
            <h3>登入</h3>
            <h3>*帳號請勿參雜符號*</h3>
            <div class="acc">
            <p>帳號：</p>
            <input type="text" placeholder="帳號" name="" id="aa" v-model.lazy="UserName">
            </div>
            <div class="pas">
            <p>密碼：</p>
            <input type="password" placeholder="密碼" name="" id="bb" v-model.lazy="UserPassword">
            </div>
            <div class="login-button">
            <button @click="Register()">註冊</button>
            <button @click="Login()">登入</button>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import '../assets/display.css';
.login{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    .login-home{
        width: auto;
        background: rgba(207, 207, 207, 0.856);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .acc{
            margin: 5px;
        }
        .pas{
            margin: 5px;
        }
        p{
        margin: 5px;
        width: 50px;
        }
        span{
        display: block;
        color: red;
        }
        input {
        height: auto;
        padding: 5px;
        font-size: 1.3rem;
        border: 1px solid #ced4da;
        }
    }
    h3{
    margin: 0;
    text-align: center;
    width: 100%;
    }
    .login-button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        button {
            padding: 5px 5px 5px 5px;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.2rem;
            margin: 5px 10px 5px 10px;
            cursor: pointer;
            color: #ffffff;
            background-color: #1387e6;
            border: none;
        }
    }
}




#Register{
  border: 1px solid;
  margin-bottom:10px;
  height: auto;
  width: 100%;
  height: 600px;
  user-select: none;
  overflow:hidden;
}
.background-img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}
</style>


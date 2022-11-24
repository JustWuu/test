<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useCounterStore } from "../stores/counter.js"
import { ref ,onMounted ,watch} from 'vue'
import Character from "./Character/Season01"
import Chat from './Home/Chat.vue'
import { initializeApp } from "firebase/app";
import { getDatabase, ref as fbref, set, child, get, update, push, onValue,remove } from "firebase/database";

const router = useRouter()

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
const RoomRef = fbref(db, 'Room/');
const dbRef = fbref(getDatabase());

const User = useCounterStore()


const camp = ref('')
// create join
const ready = ref(false)
const createready = ref(false)
const joinready = ref(false)
const start = ref(false)
const Room = ref('')

const createPlayer = ref({name:User.user.account,
                team:User.user.team,
                icon:User.Profile,
                pvp:User.pvp,
                win:User.win,
                lose:User.lose,
                ready:false,})
const joinPlayer = ref({name:User.user.account,
                team:User.user.team,
                icon:User.Profile,
                pvp:User.pvp,
                win:User.win,
                lose:User.lose,
                ready:false,})

function createRoom(){
const rules = /^\d{4}$/;
  if(!Room.value.trim()||!rules.test(Room.value)){
    alert("請確認房號為4位數字")
    return
  }else if(User.user.account ==""){
    alert("請登入！")
    return
  }
  get(child(dbRef,`Room/${Room.value}`)).then((snapsoht)=>{
        if(snapsoht.val() === null){
            // 創建房間
            let Today = new Date();
            camp.value = 'create'
            set(fbref(db, `Room/${Room.value}/create`), {
                name:User.user.account,
                team:User.user.team,
                icon:User.Profile,
                pvp:User.pvp,
                win:User.win,
                lose:User.lose,
                ready:false,
                time:Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +"/"+ Today.getHours()+":"+ Today.getMinutes() +":"+ Today.getSeconds(),
            })
            set(fbref(db, `Room/${Room.value}/join`), {
                name:User.user.account,
                team:User.user.team,
                icon:User.Profile,
                pvp:User.pvp,
                win:User.win,
                lose:User.lose,
                ready:false,
                time:Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +"/"+ Today.getHours()+":"+ Today.getMinutes() +":"+ Today.getSeconds(),
            })
            onValue(fbref(db, `Room/${Room.value}`), (snapshot) => {
                RoomGet()
            });
            alert("創建完成")
        }else{
            alert("已有此房間號碼")
        }
        })
}

function setImg(number){
  return `./imgage/character/c${number}_C.png`
}

function joinRoom(){
    const rules = /^\d{4}$/;
  if(!Room.value.trim()||!rules.test(Room.value)){
    alert("請確認房號為4位數字")
    return
  }else if(User.user.account ==""){
    alert("請登入！")
    return
  }
  get(child(dbRef,`Room/${Room.value}`)).then((snapsoht)=>{
        if(snapsoht.val() !== null){
            // 加入房間
            let Today = new Date();
            camp.value = 'join'
            set(fbref(db, `Room/${Room.value}/join`), {
                name:User.user.account,
                team:User.user.team,
                icon:User.Profile,
                pvp:User.pvp,
                win:User.win,
                lose:User.lose,
                ready:false,
                time:Today.getFullYear() +"/"+ (Today.getMonth()+1) +"/"+ Today.getDate() +"/"+ Today.getHours()+":"+ Today.getMinutes() +":"+ Today.getSeconds(),
            })
            onValue(fbref(db, `Room/${Room.value}`), (snapshot) => {
                RoomGet()
            });
            RoomGet()
            alert("加入完成")
        }else{
            alert("查無此房間號碼")
        }
        })
}

// 取得英靈資料
const createteamdata = ref([])
const jointeamdata = ref([])
// 設定創建者資料
function createteamDataFun(){
  let card = []
  for(let z=0;z<createPlayer.value.team.length;z++){
    for(let x=0;x<Character.length;x++){
      if(createPlayer.value.team[z] == Character[x].number){
        card.push(Character[x])
        createteamdata.value = card
      }
    }
  }
}
// 設定加入者資料
function jointeamDataFun(){
  let card = []
  for(let z=0;z<joinPlayer.value.team.length;z++){
    for(let x=0;x<Character.length;x++){
      if(joinPlayer.value.team[z] == Character[x].number){
        card.push(Character[x])
        jointeamdata.value = card
      }
    }
  }
}


// 這房間每次有動靜時，拉值下來
function RoomGet(){
    createteamDataFun()
    jointeamDataFun()
    get(child(dbRef,`Room/${Room.value}`)).then((snapsoht)=>{
        createPlayer.value = snapsoht.val().create 
        joinPlayer.value = snapsoht.val().join
        if(snapsoht.val().create.ready==true){
            if(snapsoht.val().join.ready ==true){
            alert("遊戲開始")
            StartPvP()
        }
        }
    })
}

function PvPtoCreate(team,team2){
    switch (team.trait) {
                case "和諧":
                if(team2.trait =="和諧"){
                    createhurt.value = createhurt.value + team2.attack
                }else if(team2.trait =="循環"){
                    createhurt.value = createhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="動盪"){
                    createhurt.value = createhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="毀滅"){
                    createhurt.value = createhurt.value + (team2.attack * 7 )/10
                }
                break;

                case "循環":
                if(team2.trait =="和諧"){
                    createhurt.value = createhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="循環"){
                    createhurt.value = createhurt.value + team2.attack
                }else if(team2.trait =="動盪"){
                    createhurt.value = createhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="毀滅"){
                    createhurt.value = createhurt.value + (team2.attack * 15 )/10
                }
                break;

                case "動盪":
                if(team2.trait =="和諧"){
                    createhurt.value = createhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="循環"){
                    createhurt.value = createhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="動盪"){
                    createhurt.value = createhurt.value + team2.attack
                }else if(team2.trait =="毀滅"){
                    createhurt.value = createhurt.value + (team2.attack * 15 )/10
                }
                break;

                case "毀滅":
                if(team2.trait =="和諧"){
                    createhurt.value = createhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="循環"){
                    createhurt.value = createhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="動盪"){
                    createhurt.value = createhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="毀滅"){
                    createhurt.value = createhurt.value + team2.attack
                }
                break;

                default:
                console.log('偵測失敗')
                break;
            }
            create_hurt.value.push(createhurt.value)
}

function PvPtoJoin(team,team2){
    switch (team.trait) {
                case "和諧":
                if(team2.trait =="和諧"){
                    joinhurt.value = joinhurt.value + team2.attack
                }else if(team2.trait =="循環"){
                    joinhurt.value = joinhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="動盪"){
                    joinhurt.value = joinhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="毀滅"){
                    joinhurt.value = joinhurt.value + (team2.attack * 7 )/10
                }
                break;

                case "循環":
                if(team2.trait =="和諧"){
                    joinhurt.value = joinhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="循環"){
                    joinhurt.value = joinhurt.value + team2.attack
                }else if(team2.trait =="動盪"){
                    joinhurt.value = joinhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="毀滅"){
                    joinhurt.value = joinhurt.value + (team2.attack * 15 )/10
                }
                break;

                case "動盪":
                if(team2.trait =="和諧"){
                    joinhurt.value = joinhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="循環"){
                    joinhurt.value = joinhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="動盪"){
                    joinhurt.value = joinhurt.value + team2.attack
                }else if(team2.trait =="毀滅"){
                    joinhurt.value = joinhurt.value + (team2.attack * 15 )/10
                }
                break;

                case "毀滅":
                if(team2.trait =="和諧"){
                    joinhurt.value = joinhurt.value + (team2.attack * 15 )/10
                }else if(team2.trait =="循環"){
                    joinhurt.value = joinhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="動盪"){
                    joinhurt.value = joinhurt.value + (team2.attack * 7 )/10
                }else if(team2.trait =="毀滅"){
                    joinhurt.value = joinhurt.value + team2.attack
                }
                break;

                default:
                console.log('偵測失敗')
                break;
            }
            join_hurt.value.push(joinhurt.value)
}

const createhurt = ref(0)
const joinhurt = ref(0)

function StartPvP(){
    let createTeam = createteamdata.value
    let joinTeam = jointeamdata.value
    pvpstart.value = true
    if(camp.value=="create"){
        User.pvp +=1
        User.SummonPoints +=1
        for(let x=0;x<createTeam.length;x++){
            PvPtoCreate(createTeam[x],joinTeam[x])
            PvPtoJoin(joinTeam[x],createTeam[x])
        }
        createhurt.value = Math.round(createhurt.value)
        joinhurt.value = Math.round(joinhurt.value)
        if(createhurt.value<joinhurt.value){
            WinLose.value = '勝利'
            User.win +=1
            User.AwakePoints +=1
        }else if(createhurt.value>joinhurt.value){
            WinLose.value = '戰敗'
            User.lose +=1
        }else{
            WinLose.value = '平手'
        }
        // router.replace({ path: '/Home' })
        remove(fbref(db, `Room/${Room.value}`))

    }else if(camp.value=="join"){
        User.pvp +=1
        User.SummonPoints +=1
        for(let x=0;x<createTeam.length;x++){
            PvPtoCreate(createTeam[x],joinTeam[x])
            PvPtoJoin(joinTeam[x],createTeam[x])
        }
        createhurt.value = Math.round(createhurt.value)
        joinhurt.value = Math.round(joinhurt.value)
        if(createhurt.value<joinhurt.value){
            WinLose.value = '戰敗'
            User.lose +=1
        }else if(createhurt.value>joinhurt.value){
            WinLose.value = '勝利'
            User.win +=1
            User.AwakePoints +=1
        }else{
            WinLose.value = '平手'
        }
        // router.replace({ path: '/Home' })
        remove(fbref(db, `Room/${Room.value}`))
    }
}

// 監聽雙方準備
function USEupdate(){
    update(fbref(db,`Room/${Room.value}/${camp.value}`),{
        ready:ready.value,
  })
}
watch(ready, () => {
    USEupdate()
});


// 展示對戰結果
const pvpstart = ref(false)
const WinLose = ref('')
const create_hurt = ref([])
const join_hurt = ref([])

// 製作圖片路徑
function setimg(img){
    return `./imgage/character/c${img}_A.png`
}

</script>

<template>
  <div id="Battle">
    <div class="home-router"><RouterLink to="/Home">返回殿堂</RouterLink></div>
    <div class="joinORcreate" :class="{display_none:camp !==''|| pvpstart}">
        <div class="jOc-box">
            <input type="text" v-model="Room" maxlength="4">
            <div class="jOc-button">
                <button @click="createRoom">創建房間</button>
                <button @click="joinRoom">加入房間</button>
            </div>
        </div>
    </div>
    <div class="room" :class="{display_none:camp =='' || pvpstart}">
        <div class="room-number">
            <h3>當前房間編號：{{Room}}</h3>
            <h3>房間初創建時，敵人會是顯示自己，此為正常現象</h3>
        </div>
        <div class="room-create player">
            <h3>創建者</h3>
            <div class="img-box"><img :src="setImg(createPlayer.icon.img)" alt=""></div>
            <div class="create-name name"><p>{{createPlayer.name}}</p></div>
            <div class="create-data data">對戰：{{createPlayer.pvp}}場 - 勝利：{{createPlayer.win}}場 - 失敗：{{createPlayer.lose}}場</div>
            <div class="ready g" :class="{display_none:!createPlayer.ready}">GO</div>
            <div class="ready r" :class="{display_none:createPlayer.ready}">尚未準備</div>
        </div>
        <div class="room-join player">
            <h3>挑戰者</h3>
            <div class="img-box"><img :src="setImg(joinPlayer.icon.img)" alt=""></div>
            <div class="join-name name"><p>{{joinPlayer.name}}</p></div>
            <div class="join-data data">對戰：{{joinPlayer.pvp}}場 - 勝利：{{joinPlayer.win}}場 - 失敗：{{joinPlayer.lose}}場</div>
            <div class="ready g" :class="{display_none:!joinPlayer.ready}">GO</div>
            <div class="ready r" :class="{display_none:joinPlayer.ready}">尚未準備</div>
        </div>
        <div class="room-ready"><button @click="ready = true" :class="{display_none:ready}">準備</button><button @click="ready = false" :class="{display_none:!ready}">取消準備</button></div>
    </div>

    <div class="pvpstart" :class="{display_none:!pvpstart}">
        <div class="result"><h3>{{WinLose}}</h3></div>
        <div class="createplayer startplayer">
            <div class="result-player"><h4>創建者，總共受到{{createhurt}}傷害</h4></div>
            <div class="result-ALLround">
                <div class="result-round" v-for="(item, key) in createPlayer.team">
                    <p>累積受到{{create_hurt[key]}}傷害</p>
                    <div class="img-box"><img :src="setimg(item)" alt=""></div>
                </div>

            </div>
        </div>
        <hr>
        <div class="joinplayer startplayer">
            <div class="result-player"><h4>挑戰者，總共受到{{joinhurt}}傷害</h4></div>
            <div class="result-ALLround">
                <div class="result-round" v-for="(item, key) in joinPlayer.team">
                    <p>累積受到{{join_hurt[key]}}傷害</p>
                    <div class="img-box"><img :src="setimg(item)" alt=""></div>
                </div>
            </div>
        </div>
    </div>

    <div class="chat">
    <Chat />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/display.css';


.pvpstart{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 30px;
    hr{
        width: 90%;
        height: 2px;
        margin-top: 10px;
    }
    .result{
        width: 100%;
        height: 6%;
        h3{
            text-align: center;
        }

    }
    .startplayer{
        width: 100%;
        height: 45%;
        .result-player{
            height: 10%;
            h4{
                text-align: center;
            }
        }
        .result-ALLround{
                display: flex;
                width: 100%;
                height: 90%;
                .result-round{
                    width: 20%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    p{
                        height: 10%;
                    }
                    .img-box{
                    line-height: 0;
                    width: 100%;
                    height: 90%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: auto;
                        height: 100%;
                    }
                    }
                }
            }

    }
}



.home-router{
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.637);
  margin: 2px;
  padding: 4px;
  border-radius: 30px;
  z-index: 999;
  font-size: 1.1em;
  a{
    color: black;
  }
}
.home-router:hover{
    background: rgba(255, 255, 255, 0.993);
    transition: .5s;
  }
.room{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .room-ready{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
            padding: 5px 5px 5px 5px;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.2rem;
            margin: 5px 10px 5px 10px;
            cursor: pointer;
            color: #ffffff;
            background-color: #b1980c;
            border: none;
        }
    }
    .room-number{
        width: 100%;
        height: 5%;
        h3{
            text-align: center;
        }
    }
    .player{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        .img-box{
            border:double 3px;
            width: 85px;
            height: 85px;
            border-radius: 30px 10px 10px 10px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.829);
            img{
                height: auto;
                width: 100%;
            }
        }
        .ready{
            border: solid 2px;
            border-radius: 5px;
            font-size: 1.3em;
        }
        .g{
            background: rgb(219, 247, 203);
        }
        .r{
            background: rgb(247, 203, 203);
        }
    }
}


.joinORcreate{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .jOc-box{
        button{
            width: 50%;
        }
        input {
        height: auto;
        padding: 5px;
        font-size: 1.3rem;
        border: 2px solid #838586;
        }
    }
}


#Battle{
  border: 1px solid;
  height: auto;
  width: 1150px;
  height: 600px;
  user-select: none;
  overflow:hidden;
}
.chat{
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  padding:5px;
}
</style>

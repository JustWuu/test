<script setup>
import { ref ,onMounted ,watch} from 'vue'
import { useCounterStore } from "../../stores/counter.js"
import Character from "../Character/Season01.js"
const UserDrama = useCounterStore()
// 
const change = ref(false)
const team = ref(UserDrama.user.team)
const teamimg = ref([
  `./imgage/character/c${team.value[0]}_B.png`,
  `./imgage/character/c${team.value[1]}_B.png`,
  `./imgage/character/c${team.value[2]}_B.png`,
  `./imgage/character/c${team.value[3]}_B.png`,
  `./imgage/character/c${team.value[4]}_B.png`
])

// 偵測玩家設定好的隊伍



// 玩家調整隊伍
  //選定的位置
const NowChange = ref(0) 
  // 偵測全域數據是否改變
watch(UserDrama.user.team, () => {
team.value = UserDrama.user.team
teamimg.value = [
  `./imgage/character/c${team.value[0]}_B.png`,
  `./imgage/character/c${team.value[1]}_B.png`,
  `./imgage/character/c${team.value[2]}_B.png`,
  `./imgage/character/c${team.value[3]}_B.png`,
  `./imgage/character/c${team.value[4]}_B.png`
]
});
  // 改變全域數據
function add(number){
  UserDrama.user.team[NowChange.value] = number
}

// 偵測玩家卡池
const havecard = ref(UserDrama.user.havecard)
const havecardimg = ref([])
  // 玩家卡池添加圖片
function havecardimgpush(){
  for(let i=0;i<havecard.value.length;i++){
    havecardimg.value.push(`./imgage/character/c${havecard.value[i]}_B.png`)
  }
}
havecardimgpush()

// 設定首頁人物
function setSpechImg(number){
  UserDrama.ProfileCover.img = number
}
function setIconImg(number){
  UserDrama.Profile.img = number
}

// 下面這個是人物HP 戰力
// console.log(UserDrama.Char)

function attack(number){
  for(let x=0;x<Character.length;x++){
    if(Character[x].number == number){
      return Character[x].attack
    }
  }
}
function trait(number){
  for(let x=0;x<Character.length;x++){
    if(Character[x].number == number){
      return Character[x].trait
    }
  }
}


</script>

<template>
  <div class="open">
    <div class="char-home">

      <div class="char-box" v-for="(item, key) in team">
        <div class="char-img"><img :src="teamimg[key]" alt=""></div>
        <div class="char-hidden">
          <div class="char-data">
            <p>戰力：{{attack(item)}}</p>
            <p>屬性：{{trait(item)}}</p>
          </div>
          <div class="char-button">
            <button @click="change = true, NowChange = key">變更</button>
          </div>
        </div>
      </div>

      <!-- 玩家卡池 -->
      <div class="team-change" :class="{display_flex:change}">
        <div class="char-box" v-for="(item, key) in havecard">
        <div class="char-img"><img :src="havecardimg[key]" alt=""></div>
        <div class="char-hidden">
          <div class="char-data">
            <p>戰力：{{attack(item)}}</p>
            <p>屬性：{{trait(item)}}</p>
          </div>
          <div class="char-button">
            <button @click="change = false, add(item)">選取</button>
            <button @click="setIconImg(item)">設為代表</button>
            <button @click="setSpechImg(item)">設為封面</button>
          </div>
        </div>
      </div>
      </div>
    <!-- 玩家卡池 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 視窗動畫效果 */
@import './Home.css';
/* 視窗動畫效果 */
@import '../../assets/display.css';

.team-change{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow:auto;
  border-radius: 50px 0 0 0;
  display: none;
  background: white;
}

.char-hidden{
  position: absolute;
  bottom:0;
  background: rgba(134, 134, 134, 0.233);
  height: 100%;
  width: 100%;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-content:flex-end;
  flex-wrap: wrap;
  .char-data{
    background: rgba(126, 126, 126, 0.747);
    border-radius: 6px;
    margin-top: auto;
    margin-bottom: 10px;
    p{
      color: white;
    }
  }
  .char-button{
    display: flex;
    justify-content: center;
    align-content:center;
    flex-wrap: wrap;
    button{
      border: none;
      margin-bottom: 6px;
      background: #929ccc;
      cursor:pointer;
    }
  }
}
.char-box:hover .char-hidden{
  visibility: initial;
}

.team-change::-webkit-scrollbar {
  height:10px;
}
.team-change::-webkit-scrollbar-track {
  background: #d4ddeb;
}
.team-change::-webkit-scrollbar-thumb {
  background: #586bd6;
}
.team-change::-webkit-scrollbar-thumb:hover {
  background: rgb(15, 4, 160);
}
.char-home{
  overflow:hidden;
  height:300px;
  margin:4px;
  display: flex;
  border-radius: 50px 0 0 0;
  border: double 2px;
}
.char-box{
    .char-img{
      height: 100%;
      line-height: 0;
      img{
        height: 100%;
        width: auto;
      }
    }
  }
  .char-box:not(:first-child){
    margin-left: 3px;
}

</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from "../stores/counter.js"
import { ref ,onMounted ,watch} from 'vue'
import Character from "./Character/Season01"
const User = useCounterStore()

const havecard = ref(User.user.havecard)

// 取得英靈資料
const havercardData = ref([])
function cardDataFun(){
  let card = []
  for(let z=0;z<havecard.value.length;z++){
    for(let x=0;x<Character.length;x++){
      if(havecard.value[z] == Character[x].number){
        card.push(Character[x])
        havercardData.value = card
      }
    }
  }
}
cardDataFun()


// 玩家卡池添加圖片
const havecardimg = ref([])
function havecardimgpush(){
  let img = []
  for(let i=0;i<havecard.value.length;i++){
    img.push(`./imgage/character/c${havecard.value[i]}_A.png`)
    havecardimg.value = img
  }
}
havecardimgpush()


// 顯示設定
const nowtrait = ref('all')
const nowawake = ref(null)


// 點擊覺醒
const AwakePoints = ref(User.AwakePoints)

function GOawake(item){
  if(AwakePoints.value === 0){
    alert("召喚點數不足")
  }else{
    if(AwakeCheck(item.number)){
      alert("已經擁有覺醒")
    }else{
      const num = (Number(item.number) +1 ).toString()
      let numb = ''
      if(num.length == 1){
        numb = '00' + num
      }else if(num.length == 2){
        numb = '0'+ num
      }else{
        numb = num
      }

      AwakePoints.value--
      User.AwakePoints = AwakePoints.value

      havecard.value.unshift(numb)
      User.user.havecard = havecard.value

      cardDataFun()
      havecardimgpush()
    }
  }
}
function AwakeCheck(number){
  const num = (Number(number) +1 ).toString()
  let numb = ''
  if(num.length == 1){
    numb = '00' + num
  }else if(num.length == 2){
    numb = '0'+ num
  }else{
    numb = num
  }

  for(let x=0;x<havecard.value.length;x++){
    if(numb == havecard.value[x]){
      return true
    }
  }
  return false
}




// 設定首頁人物
function setSpechImg(number){
  User.ProfileCover.img = number
}
function setIconImg(number){
  User.Profile.img = number
}



// 背包物品是個存著很多名稱的陣列
// 用像購物商品那樣：v-for="item in filterProducts(Commodity)" 渲染
// 同時帶有：:class="{ display_none:type !== item.type && type !== 'all'}" 屬性
// 點擊分類時 @click="type = 'all' "
// 依分類顯示特定物品
// 
// function filterProducts(Commodity) {
//                 return Commodity.filter(Commodity => Commodity.name.match(Search.value));
//             }
</script>

<template>
  <div id="Pack">
    <div class="home-router"><RouterLink to="/Home">返回殿堂</RouterLink></div>
    <div class="awake">
      <button @click="nowawake = null" :class="{now_botton:nowawake == null}">顯示全部</button>
      <button @click="nowawake = true" :class="{now_botton:nowawake == true}">顯示覺醒</button>
      <button @click="nowawake = false" :class="{now_botton:nowawake == false}">顯示覺醒前</button>
      <div class="awake-p"><p>覺醒點數：{{User.AwakePoints}}</p></div>
    </div>
    <div class="pack-home">
      <div class="pack-trait">
        <button @click="nowtrait='all'" :class="{now_botton:nowtrait == 'all'}">全部屬性</button>
        <button @click="nowtrait='和諧'" :class="{now_botton:nowtrait == '和諧'}">和諧</button>
        <button @click="nowtrait='循環'" :class="{now_botton:nowtrait == '循環'}">循環</button>
        <button @click="nowtrait='動盪'" :class="{now_botton:nowtrait == '動盪'}">動盪</button>
        <button @click="nowtrait='毀滅'" :class="{now_botton:nowtrait == '毀滅'}">毀滅</button>
      </div>

    <div class="pack-boxhome">

      <div class="pack-boxtop">

      <div class="pack-box" v-for="(item, key) in havercardData" :class="{ display_none:nowtrait !== item.trait && nowtrait !== 'all'},{display_none:nowawake !== item.awake && nowawake !== null}" >
        <div class="pack-img">
          <img :src="havecardimg[key]" alt="">
        </div>
        <div class="pack-hidden">
          <div class="pack-data">
            <p>戰力：{{item.attack}}</p>
            <p>屬性：{{item.trait}}</p>
          </div>
          <div class="pack-button">
            <button @click="GOawake(item)" :class="{display_none:item.awake == true}">覺醒</button>
            <button @click="setIconImg(item.number)">設為代表</button>
            <button @click="setSpechImg(item.number)">設為封面</button>
          </div>
        </div>
      </div>

    </div>

    </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '../assets/display.css';
.awake{
  display: flex;
  justify-content: center;
  padding: 4px;
  height: 8%;
  width: 100%;
  .awake-p{
    display: flex;
    justify-content: center;
    align-items: center;
    p{
    align-items: center;
    margin-left:5px;
    font-size: 1.1em;
  }
  }
  button{
    margin-left:5px;
    border: none;
    background: #929ccc;
    cursor:pointer;
    font-size: 1.2em;
  }
  button:hover{
      transition: .4s;
      background: #5a6dc9;
    }
  .now_botton{
    background: #334cc9;
  }
}

.pack-home{
  height: 92%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .pack-trait{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    width: 10%;
    height: 100%;
    button{
      margin-bottom: 4px;
      border: none;
      margin-bottom: 6px;
      background: #9ecaee;
      cursor:pointer;
      padding: 4px;
      font-size: 1em;
      border-radius: 6px;
    }
    button:hover{
      transition: .4s;
      background: #73a3ca;
    }
    .now_botton{
      background: #217fcc;
    }
  }
.pack-boxhome{
  width: 90%;
  height: 100%;
  overflow: auto;
  .pack-boxtop{
    display: flex;
    flex-wrap: wrap;
    height:auto ;
  }
.pack-box{
  width: 20%;
  height: auto;
  padding: 2px;
  border: double 2px;
    .pack-img{
      line-height: 0;
      width: 100%;
      height: auto;
      img{
        width: 100%;
        height: auto;
      }
    }
  }
}
.pack-hidden{
  position: absolute;
  bottom:0;
  background: rgba(134, 134, 134, 0.233);
  width: 100%;
  height: 100%;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-content:center;
  flex-direction:column;
  flex-wrap: wrap;
  .pack-data{
    background: rgba(126, 126, 126, 0.747);
    border-radius: 6px;
    margin-top: auto;
    margin-bottom: 10px;
    p{
      color: white;
    }
  }
  .pack-button{
    display: flex;
    justify-content: center;
    align-content:center;
    flex-wrap: wrap;
    flex-direction:column;
    button{
      border: none;
      margin-bottom: 6px;
      background: #929ccc;
      cursor:pointer;
      padding: 2px;
      font-size: 1em;
    }
  }
}
.pack-box:hover .pack-hidden{
  visibility: initial;
}
}



.pack-boxhome::-webkit-scrollbar {
  height:10px;
}
.pack-boxhome::-webkit-scrollbar-track {
  background: #d4ddeb;
}
.pack-boxhome::-webkit-scrollbar-thumb {
  background: #586bd6;
}
.pack-boxhome::-webkit-scrollbar-thumb:hover {
  background: rgb(15, 4, 160);
}



#Pack{
  border: 1px solid;
  margin-bottom:10px;
  height: auto;
  width: 1150px;
  height: 600px;
  user-select: none;
  overflow:hidden;
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
</style>

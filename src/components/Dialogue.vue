<script setup>
import { ref ,onMounted ,watch} from 'vue'
import { useCounterStore } from "../stores/counter.js"
import { RouterLink, RouterView } from 'vue-router'
// 
const UserDrama = useCounterStore()

// 
const page = ref(1)
const drama = ref([]) 
const UserPage = ref(`${UserDrama.drama}`)

// 監聽玩家的進度
watch(UserDrama, () => {
  UserPage.value = UserDrama.drama
  DramaImport()
});

// 判斷玩家所在章節後把劇本變成所需的章節
function DramaImport(){
  import(`./Dialogue/${UserPage.value}.js`).then((text) => {
  drama.value = text.default
  textpage(drama.value)
  })
}


// 點擊文字窗進行下一段
function con(){
  if(page.value < drama.value.length){
    page.value ++
    textpage(drama.value)
  }}
function recon(){
  if(page.value > 1){
    page.value --
    textpage(drama.value)
  }}

// 判斷目前段落並放進渲染內
const nowtext = ref({})
function textpage(text){
  for(let x=0;x<text.length;x++){
    if(text[x].page == page.value){
      nowtext.value = text[x] }}}

// 進入對話框時執行設定劇本及渲染第一段
onMounted(()=>{
  DramaImport()
})

// 監聽劇本中是否有傳入函式
watch(nowtext, () => {
  if(nowtext.value.fun !== undefined){
    nowtext.value.fun() //執行他的函式
    DramaImport() //載入劇本
  }
});

</script>

<template>
  <div>
  <div id="speech">
    <div class="home-router"><RouterLink to="/Home">返回殿堂</RouterLink></div>
    <img class="background-img" :src="nowtext.background" alt="">
    <div class="spech-img"><img :src="nowtext.img" alt="" :class="nowtext.eff"></div>
    <div class="speech-box">
      <div class="speech-name"><h3>{{nowtext.name}}</h3></div>
      <div class="speech-text" @click="con()" @click.right="recon()"><p :class="nowtext.font">{{nowtext.text}}</p><div class="load"><div style="color: #9784ed" class="la-ball-pulse"><div></div><div></div><div></div></div></div></div>
    </div>
  </div>


  </div>
</template>

<style lang="scss" scoped>
// 特效
@import './Dialogue/dialogue.css';
// 特效

// 網頁css
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

#speech{
  border: 1px solid;
  margin-bottom:10px;
  height: auto;
  width: 100%;
  user-select: none;
  overflow:hidden;
}
.background-img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}
.spech-img{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  img{
    height: 100%;
    width: auto;
    top:0;
    // 圖片轉向(水平翻轉)
    // -moz-transform:scaleX(-1);
    // -webkit-transform:scaleX(-1);
    // -o-transform:scaleX(-1);
    // transform:scaleX(-1);
  }
}
.speech-box{
  position: absolute;
  bottom: 20px;
  width: 95%;
  height: 100px;
  box-sizing:border-box;
  margin:20px;
  .speech-name{
    h3{
      display: inline;
      text-align: center;
      padding:2px;
      border: 3px inset rgba(0, 123, 180, 0.938);
      width: auto;
      background: rgba(129, 154, 236, 0.753);
    }
  }
  .speech-text{
    margin-left: 7px;
    padding: 10px;
    border: 3px outset rgba(36, 4, 179, 0.774);
    border-radius: 3px;
    margin-bottom:5px;
    background: rgba(195, 206, 238, 0.733);
    height: 90%;
    p{
      font-size: 1.5em;
      display: inline;
    }
  }
  .speech-text:active  {
    transition: .2s;
    background: rgba(178, 183, 201, 0.349);
  }
}
.load{
  position: absolute;
  display: inline-block;
  bottom: 0;
  right: 0;
.la-ball-pulse,
.la-ball-pulse > div {
    position: relative;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
.la-ball-pulse {
    display: block;
    font-size: 0;
    color: #fff;
}
.la-ball-pulse.la-dark {
    color: #333;
}
.la-ball-pulse > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
}
.la-ball-pulse {
    width: 54px;
    height: 18px;
}
.la-ball-pulse > div:nth-child(1) {
    -webkit-animation-delay: -200ms;
       -moz-animation-delay: -200ms;
         -o-animation-delay: -200ms;
            animation-delay: -200ms;
}
.la-ball-pulse > div:nth-child(2) {
    -webkit-animation-delay: -100ms;
       -moz-animation-delay: -100ms;
         -o-animation-delay: -100ms;
            animation-delay: -100ms;
}
.la-ball-pulse > div:nth-child(3) {
    -webkit-animation-delay: 0ms;
       -moz-animation-delay: 0ms;
         -o-animation-delay: 0ms;
            animation-delay: 0ms;
}
.la-ball-pulse > div {
    width: 10px;
    height: 10px;
    margin: 4px;
    border-radius: 100%;
    -webkit-animation: ball-pulse 1s ease infinite;
       -moz-animation: ball-pulse 1s ease infinite;
         -o-animation: ball-pulse 1s ease infinite;
            animation: ball-pulse 1s ease infinite;
}
.la-ball-pulse.la-sm {
    width: 26px;
    height: 8px;
}
.la-ball-pulse.la-sm > div {
    width: 4px;
    height: 4px;
    margin: 2px;
}
.la-ball-pulse.la-2x {
    width: 108px;
    height: 36px;
}
.la-ball-pulse.la-2x > div {
    width: 20px;
    height: 20px;
    margin: 8px;
}
.la-ball-pulse.la-3x {
    width: 162px;
    height: 54px;
}
.la-ball-pulse.la-3x > div {
    width: 30px;
    height: 30px;
    margin: 12px;
}
/*
 * Animation
 */
@-webkit-keyframes ball-pulse {
    0%,
    60%,
    100% {
        opacity: 1;
        -webkit-transform: scale(1);
                transform: scale(1);
    }
    30% {
        opacity: .1;
        -webkit-transform: scale(.01);
                transform: scale(.01);
    }
}
@-moz-keyframes ball-pulse {
    0%,
    60%,
    100% {
        opacity: 1;
        -moz-transform: scale(1);
             transform: scale(1);
    }
    30% {
        opacity: .1;
        -moz-transform: scale(.01);
             transform: scale(.01);
    }
}
@-o-keyframes ball-pulse {
    0%,
    60%,
    100% {
        opacity: 1;
        -o-transform: scale(1);
           transform: scale(1);
    }
    30% {
        opacity: .1;
        -o-transform: scale(.01);
           transform: scale(.01);
    }
}
@keyframes ball-pulse {
    0%,
    60%,
    100% {
        opacity: 1;
        -webkit-transform: scale(1);
           -moz-transform: scale(1);
             -o-transform: scale(1);
                transform: scale(1);
    }
    30% {
        opacity: .1;
        -webkit-transform: scale(.01);
           -moz-transform: scale(.01);
             -o-transform: scale(.01);
                transform: scale(.01);
    }
}
}
</style>

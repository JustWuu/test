<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref ,onMounted ,watch} from 'vue'
import { useCounterStore } from "../stores/counter.js"
const User = useCounterStore()

const SummonStart = ref(false)

const havecard = ref(User.user.havecard)
const remaincard = ref(User.user.remainCard)
const SummonPoints = ref(User.SummonPoints)
const CardImg = ref('')
const GetCard = ref(0)
function Summon(){
  if(SummonPoints.value === 0){
    alert("召喚點數不足")
  }else if(remaincard.value == undefined || remaincard.value.length == 0){
    alert("你已獲得所有英靈")
  }else{
    SummonStart.value = !SummonStart.value
    SummonPoints.value--
    User.SummonPoints = SummonPoints.value
    GetCard.value = Math.floor(Math.random() * (remaincard.value.length))
    havecard.value.unshift(remaincard.value[GetCard.value])
    User.user.havecard = havecard.value
    CardImg.value = `./imgage/character/c${remaincard.value[GetCard.value]}_A.png`
    remaincard.value.splice(GetCard.value, 1)
    User.user.remainCard = remaincard.value
  }
}

const remainquantity = ref(0)
function UpRemain(){
  if(remaincard.value !== undefined){
  remainquantity.value = remaincard.value.length
}
}
UpRemain()
watch(User, () => {
  UpRemain()
});

</script>

<template>
<div id="Summon">
  <div class="home-router"><RouterLink to="/Home">返回殿堂</RouterLink></div>
  <img class="background-img" src="../../public/imgage/PngtreeTechnolo_939240.jpg" alt="">
  <div class="remain">
    <p>已擁有英靈：{{havecard.length}}</p>
    <p>未獲得英靈：{{remainquantity}}</p>
  </div>
  <div class="summon-btn" :class="{display_none:SummonStart}">
    <p>召喚點數：{{SummonPoints}}</p>
    <button @click="Summon()">召喚</button>
  </div>

  <div class="summon_start display_none" :class="{start_summon:SummonStart}">
    <div class="load">
    <div class="la-cog la-dark la-2x">
    <div></div>
    </div>
    </div>
    <div class="summon-img" :class="{SummoAnm:SummonStart}"><img :src="CardImg" alt=""></div>
    <button @click="SummonStart = !SummonStart">確定</button>
  </div>

</div>
</template>

<style lang="scss" scoped>
@import '../assets/display.css';
.summon_start{
  width: 100%;
  height: 100%;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .SummoAnm{
    animation:summon 4s 1 forwards;
  }
  @keyframes summon{
    0%{
      top:-20%;
      left: 50%;
    }
    40%{
      top:50%;
      left: 50%;
    }
    100%{
      top:40%;
      left: 50%;
    }
  }
  .summon-img{
    width: 300px;
    height: 300px;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img{
      width: 100%;
      height: auto;
      border: double 6px;
      border-radius: 5px;
    }
  }
  button{
    width: 70px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-size: 1.5em;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  button:hover{
    color: white;
    background: rgb(0, 0, 0);
    transition: .3s;
  }
}
.load{
  position: absolute;
  top:70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.start_summon{
  display:block !important;
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
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
.background-img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}
#Summon{
  border: 1px solid;
  margin-bottom:10px;
  height: auto;
  width: 100%;
  height: 600px;
  user-select: none;
  overflow:hidden;
}
.remain{
  position: absolute;
  top: 0;
  right: 0;
  p{
    color: white;
    font-size: 1.1em;
  }
}
.summon-btn{
  position: absolute;
  z-index: 5;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  p{
    background: black;
    color: white;
    font-size: 1.1em;
    padding: 3px;
    border-radius: 10px;
  }
  button{
    margin-top:6px;
    width: 50%;
    background: black;
    color: white;
    font-size: 1.5em;
    border-radius: 10px;
    cursor: pointer;
  }
  button:hover{
    background: rgb(131, 131, 131);
    transition: .3s;
  }
}

.load{
  .la-cog,
.la-cog > div {
    position: relative;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
.la-cog {
    display: block;
    font-size: 0;
    color: #fff;
}
.la-cog.la-dark {
    color: #333;
}
.la-cog > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
}
.la-cog {
    width: 31px;
    height: 31px;
}
.la-cog > div {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-style: dashed;
    border-width: 2px;
    border-radius: 100%;
    -webkit-animation: cog-rotate 4s linear infinite;
       -moz-animation: cog-rotate 4s linear infinite;
         -o-animation: cog-rotate 4s linear infinite;
            animation: cog-rotate 4s linear infinite;
}
.la-cog > div:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    border: 2px solid currentColor;
    border-radius: 100%;
}
.la-cog.la-sm {
    width: 15px;
    height: 15px;
}
.la-cog.la-sm > div {
    border-width: 1px;
}
.la-cog.la-sm > div:after {
    border-width: 1px;
}
.la-cog.la-2x {
    width: 61px;
    height: 61px;
}
.la-cog.la-2x > div {
    border-width: 4px;
}
.la-cog.la-2x > div:after {
    border-width: 4px;
}
.la-cog.la-3x {
    width: 91px;
    height: 91px;
}
.la-cog.la-3x > div {
    border-width: 6px;
}
.la-cog.la-3x > div:after {
    border-width: 6px;
}
/*
 * Animation
 */
@-webkit-keyframes cog-rotate {
    0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
    }
}
@-moz-keyframes cog-rotate {
    0% {
        -moz-transform: rotate(0deg);
             transform: rotate(0deg);
    }
    100% {
        -moz-transform: rotate(360deg);
             transform: rotate(360deg);
    }
}
@-o-keyframes cog-rotate {
    0% {
        -o-transform: rotate(0deg);
           transform: rotate(0deg);
    }
    100% {
        -o-transform: rotate(360deg);
           transform: rotate(360deg);
    }
}
@keyframes cog-rotate {
    0% {
        -webkit-transform: rotate(0deg);
           -moz-transform: rotate(0deg);
             -o-transform: rotate(0deg);
                transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
           -moz-transform: rotate(360deg);
             -o-transform: rotate(360deg);
                transform: rotate(360deg);
    }
}
}
</style>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue' 聊天視窗
import Chat from './Home/Chat.vue'
import PlayerProfile from './Home/PlayerProfile.vue'
import Advertise from './Home/Advertise.vue'
import { ref ,onMounted ,watch} from 'vue'
import { useCounterStore } from "../stores/counter.js"
const User = useCounterStore()

const spechImg = ref(`./imgage/character/c${User.ProfileCover.img}_D.png`)

User.chatopen = false

watch(User.ProfileCover, () => {
  spechImg.value = `./imgage/character/c${User.ProfileCover.img}_D.png`
});

</script>

<template>
<!-- 這裡是主頁 -->
<!-- 主頁裡面會顯示許多小頁面 -->
<div>

  <div id="home">

  <img class="background-img" src="../../public/imgage/pexels-philippe-donn-1169754.jpg" alt="">
  <div class="spech-img"><img :src="spechImg" alt="" ></div>
  <div class="character-text"><h2>這裡只有我們兩個了...</h2></div>
  <div class="Go">  
    <div class="view">
    <RouterView />
    </div>
    <nav>
      <RouterLink to="/Home">隱藏</RouterLink>
      <RouterLink to="/Pack">英靈</RouterLink>
      <RouterLink to="/Summon">召喚</RouterLink>
      <RouterLink to="/Home/character">隊伍</RouterLink>
      <RouterLink to="/Home/Info">說明</RouterLink>
      <RouterLink to="/Battle">玩家對戰</RouterLink>
      <RouterLink to="/Dialogue">劇情</RouterLink>
    </nav>
  </div>

  
  <div class="player">
    <PlayerProfile />
  </div>
  
  <div class="chat">
    <Chat />
  </div>
  <div class="advertise">
    <Advertise />
  </div>
  </div>

</div>
</template>

<style lang="scss" scoped>

#home{
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
  opacity: 1;
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
    border-radius: 30px;
  }
}
.character-text{
  position: absolute;
  z-index: 5;
  top:90%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  h2{
    color: rgb(0, 0, 0);
    background: rgba(136, 160, 216, 0.87);
    border-radius: 10px;
    filter: drop-shadow(4px 4px 1px rgba(0, 0, 0, 0.7));
    padding: 5px;
  }
}

.spech-img:active + .character-text {
    transition: 2s;
    opacity: 1;
  }
  // 上面暫時測試用的

.Go{
  position: absolute;
  z-index: 5;
  bottom: 0px;
  right: 0;
  display: flex;
  flex-direction:column;
  align-content:flex-start;
  button{
    font-size: 1.5em;
  }
  .view{
    display: flex;
    justify-content: flex-end;
    width: auto;
  }
  a:hover{
    background: rgba(5, 5, 5, 0.993);
    transition: .8s;
    color: rgb(255, 255, 255);
  }
}
// .Go:hover{
//   bottom: 0;
//   transition: .3s;
// }
.player{
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  padding: 3px;
}

.chat{
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  padding:5px;
}
.advertise{
  position: absolute;
  z-index: 5;
  top: 0;
  right: 0;
  padding:2px;
}



nav {
  width: 100%;
  font-size: 20px;
  text-align: end;
  background: rgb(41, 64, 177);
  border-radius: 10px 0 0 0;
}

nav a.router-link-exact-active {
  color: rgb(250, 250, 250);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid black;
  color: rgb(122, 121, 121);
}

nav a:first-of-type {
  border: 0;
}

</style>


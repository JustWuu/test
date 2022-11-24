<script setup>
import { ref ,onMounted ,watch} from 'vue'
import { useCounterStore } from "../../stores/counter.js"
const User = useCounterStore()

const playerImg = ref(`./imgage/character/c${User.Profile.img}_C.png`)


watch(User.Profile, () => {
    playerImg.value = `./imgage/character/c${User.Profile.img}_C.png`
});



</script>

<template>
    <!-- 這裡顯示的都是玩家選定的人物、素質等等 -->
    <div class="player-home">
        <div class="player-img"><img :src="playerImg" alt=""></div>
        <div class="profile-box">
        <div class="profile-lv">
            <span>{{User.user.account}}</span>
            <p>召喚點數：{{User.SummonPoints}}</p>
            <p>覺醒點數：{{User.AwakePoints}}</p>
        </div>
        <div class="profile-data">對戰：{{User.pvp}}場 - 勝利：{{User.win}}場 - 失敗：{{User.lose}}場，卡牌持有：{{User.user.havecard.length}}張</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.player-home{
    display: flex;
    .profile-box{
        margin-left: 10px;
        .profile-lv{
            background: rgba(119, 128, 206, 0);
            padding: 4px;
            span{
                display: inline;
                font-size: 1.3rem;
                line-height: 0px;
                font-weight:bold;
                background: rgba(255, 255, 255, 0.589);
                border-radius: 2px;
                padding: 2px 5px 2px 5px;
            }
            p{
                display: inline;
                color: rgb(214, 36, 36);
                background: rgba(255, 255, 255, 0.589);
                border-radius: 2px;
                padding: 3px;
                margin-left: 2px;
            }
        }

        .profile-data{
            background: rgba(198, 198, 199, 0.753);
            padding: 4px;
            border-radius: 5px;
            color:rgb(0, 0, 0);
        }
    }
    .player-img{
        border:double 6px;
        width: 85px;
        height: 100%;
        border-radius: 35px 0 40px 0;
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
}

</style>

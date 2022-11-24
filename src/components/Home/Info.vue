<script setup>
</script>

<template>
  <div class="greetings open">
    <h3>劇情 /</h3>
    <p>在劇情中，對文字區塊點擊左鍵可進入下一句，右鍵則可上一句。若未讀到章節結束段落時，離開劇情會導致段落重頭開始。</p>
    <h3>召喚 /</h3>
    <p>召喚點數有剩餘的情形，可在召喚頁面召喚角色，召喚後人物會直接加入持有卡牌內。</p>
    <h3>覺醒 /</h3>
    <p>持有覺醒點數的情形，可在英靈(背包)中對未覺醒的英靈進行覺醒，覺醒後的英靈戰力會提高5。</p>
    <h3>隊伍 /</h3>
    <p>在隊伍中可以調整出戰的英靈，也可在此設定殿堂的封面人物及玩家的代表人物(頭像)。</p>
    <h3>屬性 /</h3>
    <p>這裡以顏色做簡單說明，屬性之間有克制關係，被克制時會受到1.5倍傷害並只造成0.7倍傷害，屬性圖為：藍剋黃、紫，黃剋紅，紅剋藍，紫剋黃、紅。</p>
    <h3>玩家對戰 /</h3>
    <p>玩家對戰是線上對戰，進入時可自行創建房間或者加入他人房間，雙方準備後即可馬上得到勝敗結果。</p>
  </div>
</template>

<style scoped>
/* 視窗動畫效果 */
@import './Home.css';
/* 視窗動畫效果 */
.greetings{
    border: 1px solid;
    margin-bottom:10px;
    height: 300px;
    width: 100%;
    border-radius: 10px;
    padding:5px;
    width: 300px;
    margin: 5px;
    background: rgba(250, 250, 250, 0.884);
    overflow: auto;
}
</style>

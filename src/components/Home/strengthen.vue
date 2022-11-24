<script setup>

import { useCounterStore } from "../../stores/counter.js"
const UserDrama = useCounterStore()
</script>

<template>
<div class="open">
  <div>
    我是素質
  </div>
  <h2>這裡可以偷偷的改劇情進度...</h2>
  <p>在輸入框可更改目前劇情進度，只有a001_01、a002_01</p>   
  <input type="text" v-model.lazy.trim="UserDrama.drama">
</div>
</template>

<style scoped>
/* 視窗動畫效果 */
@import './Home.css';
/* 視窗動畫效果 */
</style>
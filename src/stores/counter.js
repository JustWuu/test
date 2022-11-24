import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Character from '../components/Character/Season01'

// 這裡會接後端，把後端的資料更新到這裡

export const useCounterStore = defineStore('counter', () => {
  // 劇情章節
  const drama = ref('')

  const user = ref({
    account:'',
    team:[],
    // 當前隊伍['001','003','017','019','021']
    havecard:[],
    // 玩家擁有人物'001','003','017','019','021'
    remainCard:[],
    // 卡池剩餘卡牌
  })
  const Profile = ref({img:'304'})
  // 代表人物003
  const ProfileCover = ref({img:'305'})
  // 封面人物021
  const Char = ref(Character)

  const SummonPoints = ref(0)
  const AwakePoints = ref(0)

  const pvp = ref(0)
  const win = ref(0)
  const lose = ref(0)

  const chatopen = ref(false)

  return { drama, user, Profile, ProfileCover, Char, SummonPoints, AwakePoints, pvp, win, lose, chatopen }
})

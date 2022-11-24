import { useCounterStore } from "../../stores/counter.js"
// 
const UserDrama = useCounterStore()
// 特效一覽
// ,eff:"shake" 左右晃動 ,eff:"jump" 跳動兩下 ,eff:"low" 人物下沉 ,eff:"run" 人物往左移動至消失
// ,font:"big" 文字變大
// 
// 
const Drama = [
    {page:"1",name:"由良木 彩",text:"您就是新來的殿堂持有者嗎？",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"2",name:"由良木 彩",text:"歡迎您來到這裡，我的職責是向您說明殿堂的相關事項，請注意聆聽了。",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:"jump"},
    {page:"3",name:"由良木 彩",text:'目前您所在的地方是名為"劇情"的位置，在此可以讀取英靈想向你述說的事，請務必時常來此確認。',img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"4",name:"由良木 彩",text:'左上角您可以點擊"返回殿堂"，您將返回原處。等等...請先不要點擊。',img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:"shake"},
    {page:"5",name:"由良木 彩",text:'在殿堂中，你可以從"英靈"查看您所擁有的所有英靈，在"英靈"中也可替英靈進行覺醒，覺醒需要覺醒點數。',img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"6",name:"由良木 彩",text:'您可從"召喚"來獲得新的英靈，召喚需要足夠的召喚點數，召喚點數可在殿堂中查看。',img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"7",name:"由良木 彩",text:'在"隊伍"您可調整出戰的英靈，出戰的英靈並無任何限制，請自由調整。',img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"8",name:"由良木 彩",text:"英靈之間有屬性相剋的設定，藍色名為和諧，它克制循環(黃色)及毀滅(紫色)",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:"jump"},
    {page:"9",name:"由良木 彩",text:"黃色名為循環，它克制動盪(紅色)、紅色名為動盪，它克制和諧(藍色)",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"10",name:"由良木 彩",text:"紫色名為毀滅，它克制循環(黃色)及動盪(紅色)",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"11",name:"由良木 彩",text:"屬性相剋會造成不同的傷害，請務必注意。",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"12",name:"由良木 彩",text:'在"玩家對戰"您可與異界的殿堂持有者進行對戰，勝敗判斷是以車輪戰，五位英靈進行戰鬥力、屬性克制的判斷後，由殿堂持有者承受傷害。',img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"13",name:"由良木 彩",text:"承受傷害少的一方及可獲得勝利，另一方則為戰敗。",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"14",name:"由良木 彩",text:"接下來將贈與您召喚點數20點及覺醒點數10點，請繼續對話後由殿堂系統贈送給您。",img:"./imgage/character/c021_D.png",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:""},
    {page:"15",name:"系統",text:"...系統載入完成...殿堂持有者判斷成功...能量轉送開始......",img:"",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:"end"},
    {page:"16",name:"系統",text:"程序運行完成，殿堂持有者您已可返回殿堂。",img:"",background:"./imgage/pexels-wendel-moretti-1850021.jpg",eff:"end",fun:() => {UserDrama.drama = "a002_01";UserDrama.SummonPoints+=20;UserDrama.AwakePoints+=10}}
]
export default Drama;
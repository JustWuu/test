<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay,Pagination } from "swiper";
import { ref ,onMounted ,watch} from 'vue'
import 'swiper/css';
import 'swiper/css/pagination';

const modules = ref([Autoplay,Pagination])







</script>


<template>
<div id="advertisehome">
    <div class="img-box">
        <swiper :pagination="false" :modules="modules" :autoplay="{delay: 2000,disableOnInteraction: false,}" class="mySwiper">
            <swiper-slide><a href="https://github.com/JustWuu" target="_blank"><img src="../../../public/imgage/Advertise01.png" alt=""></a></swiper-slide>
            <swiper-slide><img src="../../../public/imgage/Advertise02.png" alt=""></swiper-slide>
            <swiper-slide><img src="../../../public/imgage/Advertise03.png" alt=""></swiper-slide>
        </swiper>
    </div>
</div>
</template>



<style lang="scss" scoped>
.swiper-pagination{
    bottom: 0px;
    left: 0;
    width: 100%;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
    width: 100%;
    height: 100%;
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}



#advertisehome{
    background: rgba(185, 173, 173, 0.322);
    height: 100px;
    width: 200px;
    border-radius: 10px;
    overflow: hidden;
    .img-box{
        width: 100%;
        height: 100%;
    }
}

</style>
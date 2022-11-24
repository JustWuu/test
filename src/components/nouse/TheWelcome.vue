<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>主頁各種視窗</template>
    此處未來會放些遊戲在主頁可以選擇的功能，例如進入背包、強化、招喚頁面
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>主頁各種視窗</template>
    此處未來會放些遊戲在主頁可以選擇的功能，例如進入背包、強化、招喚頁面
  </WelcomeItem>
</template>

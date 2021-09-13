<template>
  <div
    id="layout-header"
    :class="{ fixed: fixed, hidden: hidden }"
    @click.stop="mobileShow = false"
  >
    <div class="site-logo">
      <router-link to="/">
        <!-- <img src="@/assets/site-logo.svg" alt="" /> -->
        <p class="site-name">Gblog</p>
      </router-link>
    </div>
    <div class="menus-btn" @click.stop="mobileShow = !mobileShow">Menus</div>
    <div
      class="site-menus"
      :class="{ mobileShow: mobileShow }"
      @click.stop="mobileShow = !mobileShow"
    >
      <div class="menu-item header-search"><header-search /></div>
      <div class="menu-item"><router-link to="/">首页</router-link></div>
      <div class="menu-item"><router-link to="/admin">后台</router-link></div>
      <div class="mask"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import headerSearch from './header-search.vue'
export default defineComponent({
  name: 'layout',
  components: {
    headerSearch,
  },
  setup() {
    let lastScrollTop = ref(0)
    let fixed = ref(false)
    let hidden = ref(false)
    let mobileShow = ref(false)
    function watchScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop === 0) {
        fixed.value = false
      } else if (scrollTop >= lastScrollTop.value) {
        fixed.value = false
        hidden.value = true
      } else {
        fixed.value = true
        hidden.value = false
      }
      lastScrollTop.value = scrollTop
    }
    onBeforeRouteUpdate(() => {
      hidden.value = false
      mobileShow.value = false
    })
    onMounted(() => {
      window.addEventListener('scroll', watchScroll)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', watchScroll)
    })
    return { fixed, hidden, mobileShow }
  },
})
</script>

<style lang="scss" scoped>
#layout-header {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 80px;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s all ease;
  -webkit-transition: 0.3s all ease;
  -moz-transition: 0.3s all linear;
  -o-transition: 0.3s all ease;
  -ms-transition: 0.3s all ease;
  &.hidden {
    top: -100px;
  }
  &.fixed {
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.site-logo {
  text-align: center;

  img {
    width: 60px;
    height: 60px;
  }

  p.site-name {
    font-size: 15px;
    font-weight: bold;
    position: relative;
    top: -10px;
  }
}
.menus-btn {
  display: none;
  visibility: hidden;
}
.site-menus {
  display: flex;
  align-items: center;

  .menu-item {
    min-width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    a {
      padding: 12px 10px;
      color: #545454;
      font-weight: 500;
      font-size: 16px;
      &:hover {
        color: #ff6d6d;
      }
    }
    &:not(:last-child) {
      margin-right: 15px;
    }
    &.hasChild:hover .childMenu {
      opacity: 1;
      visibility: visible;
      transform: translateY(-5px);
    }
  }
  .childMenu {
    width: 130px;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 55px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: 0.7s all ease;
    -webkit-transition: 0.6s all ease;
    -moz-transition: 0.6s all linear;
    -o-transition: 0.6s all ease;
    -ms-transition: 0.6s all ease;
    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid white;
      top: -8px;
      left: 20px;
    }
    &:before {
      top: -9px;
      border-bottom: 8px solid #ddd;
    }
    .sub-menu {
      height: 40px;
      line-height: 40px;
      position: relative;
      &:not(:last-child):after {
        /*position: absolute;*/
        content: '';
        width: 50%;
        height: 1px;
        color: #ff6d6d;
        bottom: 0;
        left: 25%;
        z-index: 99;
      }
    }
  }
}
@media (max-width: 960px) {
  #layout-header {
    padding: 0 20px;
  }
}
@media (max-width: 600px) {
  #layout-header {
    padding: 0 10px;
  }
  .menus-btn {
    display: block;
    visibility: visible;
  }
  .site-menus {
    position: absolute;
    display: none;
    visibility: hidden;
    background-color: #f9f9f9;
    width: 100%;
    left: 0;
    top: 80px;
    z-index: -9;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .menu-item {
      position: relative;
      height: unset;
      &:not(:last-child) {
        margin-right: 0;
      }
    }
    .childMenu {
      position: relative;
      width: 100%;
      top: 0;
      background-color: #f3f3f3;
      opacity: 1;
      visibility: visible;
      border: none;
      box-shadow: none;
      &:before,
      &:after {
        content: '';
        position: relative;
        width: 0;
        height: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
      }
    }
  }
  .site-menus.mobileShow {
    display: inline-block;
    visibility: visible;
    z-index: 99;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
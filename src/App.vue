<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import FormBlog from './components/FormBlog'

export default {
  name: 'App'
}
</script>

<style>
/* body {
  background: linear-gradient(to right, #89216B, #DA4453);
} */
body {
  background: #DA4453;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #89216B, #DA4453);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #89216B, #DA4453);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.nav-blog {
  position: absolute;
  z-index: 1030;
  width: 100%;
  background-color: #00000038;
}
.nav-blog > li > a {
  color: #fff;
  font-weight: bold;
}
.nav-blog > li > a:hover {
  font-weight: initial;
}
.nav-blog > li > a.nav-link-admin {
  position: absolute;
  right: 0;
}
</style>

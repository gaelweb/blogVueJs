<template>
  <div id="app">
    <ul class="nav">
      <li class="nav-item">
        <router-link to="/home" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin" class="nav-link">Admin</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="backOffice">
    <h1>Back Office</h1>
    <ul class="nav">
      <li class="nav-item">
        <router-link to="/home" class="nav-link">Retour sur le blog</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/FormBlog" class="nav-link">Gestion des articles</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import FormBlog from './FormBlog'

export default {
  extends: FormBlog,
  name: 'BackOffice'
}
</script>

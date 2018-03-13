<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <h1>{{ form.title }}</h1>
      <ul>
        <li v-for="titlesF of titleFirebase" v-bind:key="titlesF['.key']">
          <div v-if="!titlesF.edit">
            {{ titlesF.name }}
            <button @click.prevent="editFile(titlesF['.key'])" class="btn btn-warning" type="button">Editer</button>
            <button @click.prevent="deleteTitle(titlesF['.key'])" class="btn btn-warning" type="button">Supprimer</button>
          </div>
          <div v-else>
            <input type="text" v-model="titlesF.name">
            <button @click.prevent="saveEdit(titlesF)" class="btn btn-primary" type="button">Modifier</button>
            <button @click.prevent="deleteTitle(titlesF['.key'])" class="btn btn-warning" type="button">Supprimer</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FormBlog from './FormBlog'

export default {
  extends: FormBlog,
  name: 'HomeBlog',
  data () {
    return {
      msg: 'Bienvenue sur le blog'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

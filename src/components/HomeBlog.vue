<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <h1>{{ form.title }}</h1>
      <p v-for="titlesF of titleFirebase">
        {{ titlesF.name }}
        <button @click.prevent="deleteTitle(titlesF.name)" class="btn btn-warning" type="submit">Supprimer</button>
      </p>
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

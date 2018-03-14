<template>
  <section>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div class="container">
        <div class="row">
          <div v-for="article of BlogFirebase" v-bind:key="article['.key']" class="col-md-6">
            <div class="card" style="width: 20rem;">
              <img class="card-img-top" src="../assets/logo.png" alt="">
              <div class="card-body">
                <h5 class="card-title">{{ article.titleArticle }}</h5>
                <p class="card-text">{{ article.contentArticle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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

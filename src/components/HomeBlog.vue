<template>
  <section class="vue-home">
    <div class="hello">
      <ul class="nav nav-blog">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/FormBlog" class="nav-link nav-link-admin">Admin</router-link>
        </li>
      </ul>
      <header>
        <div class="container">
          <div class="intro-text">
            <div class="intro-heading-text">
              Blog en Vue <img src="../assets/logo.png" width:="150px" height="150px" alt="">
            </div>
          </div>
        </div>
      </header>
      <div class="container container-home">
        <div v-for="article of BlogFirebase" v-bind:key="article['.key']" class="row row-article">
          <div class="col-md-6">
            <div class="img-article" v-bind:style="{ backgroundImage: 'url('+ article.imageArticle +')'}">
            </div>
          </div>
          <div class="content-article col-md-6">
            <h5 class="card-title title-article">{{ article.titleArticle }}</h5>
            <p class="card-text text-article">{{ article.contentArticle }}</p>
            <div class="sup-article">
              <span>Publié le : {{ article.dateArticle }}</span><br>
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
header {
  text-align: center;
  color: #fff;
  height: 100vh;
  width: 100%;
}
.intro-text {
  padding-top: 150px;
  padding-bottom: 100px;
}
@media (min-width: 768px) {
  .intro-text {
    padding-top: 300px;
    padding-bottom: 200px;
  }
}
.intro-heading-text {
  font-size: 50px;
  font-weight: 700;
  line-height: 50px;
  margin-bottom: 25px;
}
@media (min-width: 768px) {
  .intro-heading-text {
    font-size: 75px;
    font-weight: 700;
    line-height: 75px;
    margin-bottom: 50px;
  }
}
.vue-home {
  background: #DA4453;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #89216B, #DA4453);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #89216B, #DA4453); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.nav-link {
  color: #fff;
}
.container-home {
  background-color: #fff;
  border-radius: 5px;
}
.title-article {
  border-bottom: 1px solid gray;
  padding: 16px;
  text-transform: uppercase;
}
.text-article {
  text-align: justify;
}
.sup-article {
  width: 100%;
  border-top: 1px solid gray;
  position: relative;
  min-height: 60px;
}
.sup-article > span {
  position: absolute;
  right: 8px;
  padding: 8px 0 0 0
}
.img-article {
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}
.row-article {
  /* padding-top: 50px;
  padding-bottom: 50px; */
  padding: 50px 0px 50px 0px;
  white-space: pre-wrap;
  border: 1px solid #80808026;
  margin: 25px 0 25px 0;
}
</style>

<template>

  <!-- Formulaire d'ajout des articles -->
  <div id="formBlog">
    <h1>{{ blog_msg }}</h1>

    <div class="container">
      <div class="row">
        <!-- Formulaire -->
        <div class="col-md-6">
          <form>
            <!-- <input type="hidden" v-model="form.id" name="id"> -->
            <div class="form-group row">
              <label for="title">Titre de l'article</label>
              <input v-model="form.title" class="form-control" placeholder="titre de l'article" type="text" name="title" id="title">
            </div>
            <div class="form-group row">
              <label for="paragraphe">Paragraphe de l'article</label>
              <textarea v-model="form.paragraphe" class="form-control" placeholder="Description de l'article"  name="paragraphe" id="paragraphe" rows="4" cols="40"></textarea>
            </div>
            <button @click.prevent="formSave()" class="btn btn-primary" type="submit">Enregister</button>
          </form>
        </div>
        <!-- Rendu formulaire html -->
        <div class="col-md-6">
          <h1 v-model="form.title">{{ form.title }}</h1>
        </div>
      </div>
    </div>


    <!-- Tableau des articles ajoutés -->
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">N°</th>
          <th scope="col">Titre de l'article</th>
          <th scope="col">Paragraphe de l'article</th>
          <th scope="col">Modifier l'article</th>
          <th scope="col">Supprimer l'article</th>
        </tr>
      </thead>
      <!-- <p v-for="(value, key, index) in BlogFirebase">
        {{ value }}
      </p> -->
      <tbody v-for="(value, key, index) of BlogFirebase" v-bind:key="value['.key']">
        <tr v-if="!value.edit">
          <th scope="row">{{ key }}</th>
          <th scope="row">{{ value.titleArticle }}</th>
          <th scope="row">{{ value.contentArticle }}</th>
          <th scope="row">
            <button @click.prevent="editFile(value['.key'])" class="btn btn-primary" type="button">
              <i class="far fa-edit"></i>
            </button>
          </th>
          <th scope="row">
            <button @click.prevent="deleteTitle(value['.key'])" class="btn btn-danger" type="button">
              <i class="fas fa-trash"></i>
            </button>
          </th>
        </tr>
        <tr v-else>
          <th>{{ value.id }}</th>
          <th>
            <input type="text" v-model="value.titleArticle">
            <button class="btn btn-primary" @click.prevent="saveEdit(value)" type="button">
              <i class="far fa-edit"></i>
            </button>
          </th>
          <th>
            <input type="text" v-model="value.contentArticle">
            <button class="btn btn-primary" @click.prenvent="saveEdit(value)" type="button">
              <i class="far fa-edit"></i>
            </button>
          </th>
        </tr>
      </tbody>
    </table>
    <router-view></router-view>
  </div>
</template>

<script>
import Firebase from 'firebase'
import toastr from 'toastr'

let config = {
    apiKey: "AIzaSyCuXwYlCXq-MTpdFA2nVpx28-ArL-r8CWI",
    authDomain: "projectgael-e449a.firebaseapp.com",
    databaseURL: "https://projectgael-e449a.firebaseio.com",
    projectId: "projectgael-e449a",
    storageBucket: "projectgael-e449a.appspot.com",
    messagingSenderId: "783089784279"
  };

let app = Firebase.initializeApp(config)
let db = app.database()
let BlogDb = db.ref('Blog/Article')
let blogg = db.ref('Blog')

export default {
  name: 'FormBlog',
  firebase: {
    BlogFirebase: BlogDb
  },
  data () {
    return {
      blog_msg: 'Formulaire',
      form: [
        {
          title: '',
          paragraphe: ''
        }
      ]
    }
  },
  methods: {
    // Sauvegarde d'un article et push() dans firebase
    formSave () {
      BlogDb.push(
        {
          titleArticle: this.form.title,
          contentArticle: this.form.paragraphe,
          edit:false
        }
      )
      toastr.success('Article ajouté !')
    },
    deleteTitle (index) {
      try{
        BlogDb.child(index).remove()
        toastr.success('Article supprimé !')
      }catch(e){
        console.log('erreur :', e)
      }
      // .remove() //pour supprimer dans firebase
      // toastr.success('Article supprimé !')
    },
    editFile (index) {
      try{
        BlogDb.child(index).update({ edit: true })
      }catch(e){
        console.log('erreur edition :', e)
      }
    },
    saveEdit (index) {
      const key = index['.key']
      try{
        BlogDb.child(key).set({
          titleArticle: index.titleArticle,
          contentArticle: index.contentArticle,
          edit:false
        })
        toastr.success('Article modifié !')
      }catch(e){
        console.log('erreur function saveEdit() :', e)
      }
    }
  }
}
</script>

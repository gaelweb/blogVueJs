<template>

  <!-- Formulaire d'ajout des articles -->
  <div id="formBlog">
    <h1>{{ blog_msg }}</h1>

    <div class="container">
      <div class="row">

        <!-- Formulaire -->
        <div class="col-md-6">
          <form>
            <div class="form-group row">
              <label for="title">Titre de l'article</label>
              <input v-model="form.title" class="form-control" placeholder="titre de l'article" type="text" name="title" id="title">
            </div>
            <div class="form-group row">
              <label for="paragraphe">Paragraphe de l'article</label>
              <textarea v-model="form.paragraphe" class="form-control" placeholder="Description de l'article"  name="paragraphe" id="paragraphe" rows="4" cols="40"></textarea>
            </div>
            <div class="form-group row">
              <label for="image">Ajouter une image</label>
              <input id="file" ref="fileInput" @change="handleFileSelected" class="form-control-file" type="file" accept="image/*">
            </div>
            <button @click.prevent="formSave()" class="btn btn-primary" type="submit">Enregister</button>
          </form>
        </div>

        <!-- Rendu formulaire html -->
        <!-- <div class="col-md-6">
          <div class="card" style="width: 15rem;">
            <img class="card-img-top" src="../assets/logo.png" alt="">
            <div class="card-body">
              <h5 class="card-title">{{ form.title }}</h5>
              <p class="card-text">{{ form.paragraphe }}</p>
            </div>
          </div>
        </div> -->
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
            <button class="btn btn-primary" @click.prevent="saveEdit(value)" type="button">
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
let storage = app.storage()

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
          paragraphe: '',
          fileInput : ''
        }
      ]
    }
  },
  methods: {
    // Vérification d'une image en upload
    handleFileSelected (event) {
      this.form.fileInput = event.target.files[0]
      console.log(this.form.fileInput)
    },
    // Sauvegarde d'un article et push() dans firebase
    formSave () {
      let refImage = this.form.fileInput.name
      let file = this.form.fileInput
      let metadata = {
        contentType: this.form.fileInput.type
      }
      console.log(this.form.fileInput.name)
      //stockage des images dans firebase
      const storageFile = storage.ref(refImage).put(file, metadata)
      console.log(storageFile)
      // //push des data text (titre et paragraphe)
      BlogDb.push(
        {
          titleArticle: this.form.title,
          contentArticle: this.form.paragraphe,
          edit:false
        }
      )
      toastr.success('Article ajouté !')
    },
    // Suppression d'un article et dans firebase
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
    // modification d'un article et dans firebase
    editFile (index) {
      try{
        BlogDb.child(index).update({ edit: true })
      }catch(e){
        console.log('erreur edition :', e)
      }
    },
    // Sauvegarde de la modification d'un article et dans firebase
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

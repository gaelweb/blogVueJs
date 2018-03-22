<template>

  <!-- Formulaire d'ajout des articles -->
  <div id="formBlog">
    <h1>{{ blog_msg }}</h1>

    <div class="container">
      <div class="row">

        <!-- Formulaire -->
        <div class="col-md-6">
          <h3>Ajouter un article</h3></br>
          <form>
            <input type="hidden" :value="date_article">
            <div class="form-group row">
              <label for="title">Titre de l'article</label>
              <input v-model="form.title" class="form-control" placeholder="titre de l'article" type="text" name="title" id="title">
            </div>
            <div class="form-group row">
              <label for="paragraphe">Paragraphe de l'article</label>
              <textarea v-model="form.paragraphe" class="form-control" placeholder="Description de l'article"  name="paragraphe" id="paragraphe" rows="4" cols="40"></textarea>
            </div>
            <div class="form-group row">
              <img @click="openUpload" style="width: 15em; height:15em;border: 1px solid black" @dragover.prevent @drop="dropUpload" :src="imagePreview">
              <input @change="handleFileSelected" type="file" id="file-field" style="display: none" name="image">
            </div>
            <button @click="formSave()" class="btn btn-primary" type="submit">Enregister</button>
          </form>
        </div>

        <!-- Rendu formulaire html -->
        <div class="col-md-6">
          <h3>Rendu sur le site</h3>
          <div class="card" style="width: auto">
            <img class="card-img-top" v-bind:src="imagePreview" alt="">
            <div class="card-body">
              <h5 class="card-title">{{ form.title }}</h5>
              <p class="card-text">{{ form.paragraphe }}</p>
            </div>
          </div>
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
          <th scope="col">Image de l'article</th>
          <th scope="col">Date de publication</th>
          <th scope="col">Modifier l'article</th>
          <th scope="col">Supprimer l'article</th>
        </tr>
      </thead>
      <tbody v-for="(value, key, index) of BlogFirebase" v-bind:key="value['.key']">
        <tr v-if="!value.edit">
          <th scope="row">{{ key }}</th>
          <th scope="row">{{ value.titleArticle }}</th>
          <th scope="row">{{ value.contentArticle }}</th>
          <th scope="row">
            <img :src="value.imageArticle" style="width: 50px; height: 50px" alt="">
          </th>
          <th scope="row">{{ value.dateArticle }}</th>
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
      imagePreview: '../assets/default_image.jpg',
      date_article: new Date().toLocaleDateString(),
      form: [
        {
          title: '',
          paragraphe: ''
        }
      ]
    }
  },
  methods: {
    //methode pour ouvrir une input a partir d'une image
    openUpload () {
      document.getElementById('file-field').click()
    },
    //Drag and Drop d'une image
    dropUpload (ev) {
      ev.stopPropagation()
      ev.preventDefault()
      var picsUpload = ev.dataTransfer.files
      this.createdFile(picsUpload[0])
    },
    createdFile (el) {
      var img = new Image()
      var reader = new FileReader()

      reader.onload = (el) => {
        this.imagePreview = el.target.result
      }
      reader.readAsDataURL(el)
      el.target.reset()
    },
    //Suppression du fichier
    removeFile (e) {
      this.imagePreview = ''
    },
    // Vérification d'une image en upload
    handleFileSelected (el) {
      var reader,
          files = el.target.files

      //Vérification qu'un fichier est saisie
      if (files.length === 0){
        console.log("empty files")
      }
      reader = new FileReader()
      reader.onload = (el) => {
        this.imagePreview = el.target.result
      }
      //Method readAsDataURL permet de lire le contenu de l'objet file
      reader.readAsDataURL(files[0])
      el.target.reset()
    },
    // Sauvegarde d'un article et push() dans firebase
    formSave () {
      BlogDb.push(
        {
          titleArticle: this.form.title,
          contentArticle: this.form.paragraphe,
          imageArticle: this.imagePreview,
          dateArticle: this.date_article,
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
          imageArticle: index.imageArticle,
          dateArticle: index.dateArticle,
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

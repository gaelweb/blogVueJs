<template>
  <div id="formBlog">
    <h1>{{ blog_msg }}</h1>
    <form>
      <div class="form-group">
        <label for="title">Titre de l'article</label>
        <input v-model="form.title" class="form-control-lg" placeholder="titre de l'article" type="text" name="title" id="title">
      </div>
      <button @click.prevent="formSave()" class="btn btn-primary" type="submit">Enregister</button>
    </form>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre de l'article</th>
          <th scope="col">Modifier l'article</th>
          <th scope="col">Supprimer l'article</th>
        </tr>
      </thead>
      <tbody v-for="titlesF of titleFirebase" v-bind:key="titlesF['.key']">
        <tr v-if="!titlesF.edit">
            <th scope="row">1</th>
            <th scope="row">{{ titlesF.name }}</th>
            <th scope="row">
              <button @click.prevent="editFile(titlesF['.key'])" class="btn btn-primary" type="button">Editer</button>
            </th>
            <th scope="row">
              <button @click.prevent="deleteTitle(titlesF['.key'])" class="btn btn-danger" type="button">Supprimer</button>
            </th>
        </tr>
        <tr v-else>
          <th scope="row">1</th>
          <th scope="row">
            <input type="text" v-model="titlesF.name">
          </th>
          <th>
            <button @click.prevent="saveEdit(titlesF)" class="btn btn-warning" type="button">Modifier</button>
          </th>
          <th>
            <button @click.prevent="deleteTitle(titlesF['.key'])" class="btn btn-danger" type="button">Supprimer</button>
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
let titleRef = db.ref('title')

export default {
  name: 'FormBlog',
  firebase: {
    titleFirebase: titleRef
  },
  data () {
    return {
      blog_msg: 'Formulaire',
      form: [
        { title: ''}
      ]
    }
  },
  methods: {
    formSave () {
      titleRef.push({ name: this.form.title, edit: false })
      toastr.success('Titre ajouté !')
    },
    deleteTitle (index) {
      try{
        titleRef.child(index).remove()
        toastr.success('Titre supprimé !')
      }catch(e){
        console.log('erreur :', e)
      }
      // .remove() //pour supprimer dans firebase
      // toastr.success('Titre supprimé !')
    },
    editFile (index) {
      try{
        titleRef.child(index).update({ edit: true })
      }catch(e){
        console.log('erreur edition :', e)
      }
    },
    saveEdit (index) {
      const key = index['.key']
      try{
        titleRef.child(key).set({ name: index.name, edit:false })
        toastr.success('Titre modifié !')
      }catch(e){
        console.log('erreur function saveEdit() :', e)
      }
    }
  }
}
</script>

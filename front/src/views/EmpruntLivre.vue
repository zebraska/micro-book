<template>
<div>
  <md-snackbar :md-position="sb.position" :md-duration="sb.duration" :md-active.sync="sb.showSnackbar" md-persistent>
    <span>{{sb.error}}</span>
    <md-button class="md-primary" @click="sb.showSnackbar = false">Retry</md-button>
  </md-snackbar>
  <h2> {{ livre.titre }} </h2>
  <div md-card>
    <md-field>
      <label>Prenom</label>
      <md-input v-model="prenom"></md-input>
    </md-field>

    <md-field>
      <label>Nom</label>
      <md-input v-model="nom"></md-input>
    </md-field>

    <div>
      <label>Quantité disponible: </label>
      {{ livre.quantite }}
    </div>

    <md-button class="md-raised md-primary" @click="borrowBook()">Valider</md-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Livre } from "../model/livre.model";

export default Vue.extend({
  created() {
    if (!this.livre) {
      this.livre = {};
    }
  },
  data() {
    return {
      prenom: "",
      nom: "",
      sb: {
        showSnackbar: false,
        position: 'left',
        duration: 4000,
        isInfinity: false,
        error:""
      }
    };
  },
  methods: {
    borrowBook() {
        const APIEmprunt = 'http://localhost:3002/api/v1/micro-book/emprunt';
        var headers = new Headers();	       
        headers.append("Content-Type", "application/json");
        var param = {	
            method: 'POST',
            headers: headers,
            mode: 'cors',
            cache: 'default',
        };
        var body={
            livre: this.livre.id,
            prenom: this.prenom,
            nom: this.nom,
        };
        param.body=JSON.stringify(body);
        fetch(APIEmprunt, param).then((response)=>{
            console.log(response)
            return response.json();
        }).then((res)=>{
            if(!res.success){
            console.log("error post emprunt");
            throw res.data;
            }
            this.$router.push({ name: "home" });
        }).catch((error)=>{
          this.sb.error=error;
          this.sb.showSnackbar=true;
          console.log(error);
        });
    }
  },
  props: ["livre"]
});
</script>

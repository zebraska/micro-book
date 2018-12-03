<template>
  <div md-card>
    <md-field>
      <label>Titre</label>
      <md-input v-model="livre.titre"></md-input>
    </md-field>

    <md-field>
      <label>Auteur</label>
      <md-input v-model="livre.auteur"></md-input>
    </md-field>

    <md-field>
      <label>Resume</label>
      <md-input v-model="livre.resume"></md-input>
    </md-field>

    <md-field>
      <label>Quantité</label>
      <md-input v-model="livre.quantite" type="number"></md-input>
    </md-field>

    <md-button @click="updateBook" class="md-raised md-primary">Valider</md-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Livre } from "../model/livre.model";

export default Vue.extend({
  created() {
    if (!this.livre) {
      this.livre = {};
      this.new=true;
    }
    console.log(this.new);
  },
  data() {
    return {new:false};
  },
  methods: {
    select(livre: Livre) {
      this.selected = livre;
    },
    updateBook() {
      const APILivre = "http://localhost:3002/api/v1/micro-book/livre";
      var headers = new Headers();
      if(!this.new){
        headers.append("Content-Type", "application/json");
        var param = {	
          method: 'PUT',	
          headers: headers,	
          mode: 'cors',	
          cache: 'default',
        };
        var body={
          id: this.livre.id,
          titre:this.livre.titre,
          auteur:this.livre.auteur,
          resume:this.livre.resume,
          quantite:this.livre.quantite
        };
        param.body=JSON.stringify(body);
        fetch(APILivre, param).then((response)=>{	
          return response.json();	
        }).then((res)=>{
          if(!res.success){
            throw res.data;
          }
          this.$router.push({ name: "home" });
        }).catch(function(error){
          console.log(error);
        });
      }	else{
        headers.append("Content-Type", "application/json");
        var param = {	
          method: 'POST',	
          headers: headers,	
          mode: 'cors',	
          cache: 'default',
        };
        var body={
          titre:this.livre.titre,
          auteur:this.livre.auteur,
          resume:this.livre.resume,
          quantite:this.livre.quantite
        };
        param.body=JSON.stringify(body);
        fetch(APILivre, param).then((response)=>{	
          return response.json();	
        }).then((res)=>{
          if(!res.success){
            throw res.data;
          }
          this.$router.push({ name: "home" });
        }).catch(function(error){
          console.log(error);
        });
      }      
    }
  },
  props: ["livre"]
});
</script>
<template>
  <div>
    <md-table v-model="emprunts" md-sort="id" md-sort-order="asc" md-card>
      <md-table-empty-state
        md-label="Pas encore d'emprunt"
        :md-description="`Vous pouvez en ajouter un en cliquant sur le bouton ci-dessous.`"
      >
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric md-sort-by="id">{{item.id}}</md-table-cell>
        <md-table-cell md-label="PRENOM LOCATAIRE" md-sort-by="prenom">{{item.prenom}}</md-table-cell>
        <md-table-cell md-label="NOM LOCATAIRE" md-sort-by="nom">{{item.nom}}</md-table-cell>
        <md-table-cell md-label="DELETE"><font-awesome-icon icon="trash" size="2x" @click.stop="endEmprunt(item)"/></md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-primary md-raised" @click="newEmprunt">Créer un nouvel emprunt</md-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Emprunt } from "../model/emprunt.model";

export default Vue.extend({
  data() {
    return {
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
    endEmprunt(emprunt: Emprunt) {
      const APIEmprunt = 'http://localhost:3002/api/v1/micro-book/emprunt';
        var headers = new Headers();	       
        headers.append("Content-Type", "application/json");
        var param = {	
            method: 'DELETE',
            headers: headers,
            mode: 'cors',
            cache: 'default',
        };
        var body={
          id: emprunt.id
        };
        param.body=JSON.stringify(body);
        fetch(APIEmprunt, param).then((response)=>{
            return response.json();
        }).then((res)=>{
            if(!res.success){
                console.log("error post emprunt");
                throw res.data;
            }
            

            const APIEmpruntLivre = 'http://localhost:3002/api/v1/micro-book/emprunt/byLivre?livre_id=' + this.livre.id;
            var headers = new Headers();	       
            headers.append("Content-Type", "application/json");
            var param = {	
                method: 'GET',
                headers: headers,
                mode: 'cors',
                cache: 'default',
            };
            fetch(APIEmpruntLivre, param).then((response)=>{
                return response.json();
            }).then((res)=>{
                if(!res.success){
                    console.log("error post emprunt");
                    throw res.data;
                }
                this.emprunts = res.data;
            }).catch((error)=>{
                this.sb.error=error;
                this.sb.showSnackbar=true;
                console.log(error);
            });


        }).catch((error)=>{
            this.sb.error=error;
            this.sb.showSnackbar=true;
            console.log(error);
        });
    },
    newEmprunt() {
      this.$router.push({
        name: "borrowBook",
        params: { livre: this.livre, id: this.livre.id }
      });
    }
  },
  props: ["emprunts", "livre"]
});
</script>
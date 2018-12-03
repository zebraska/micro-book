<template>
  <div class="home">
    <h1>Micro Book Front</h1>
    <LivreList v-bind:livres="livres"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LivreList from "@/components/LivreList.vue"; // @ is an alias to /src
import { Livre } from "../model/livre.model";
import axios, { AxiosResponse } from "axios";

@Component({
  components: {
    LivreList
  },
  data() {
    return { livres: [] };
  },
  created() {
    const APILivre = "http://localhost:3002/api/v1/micro-book/livre";
    var headers = new Headers();
    var param = {	
      method: 'GET',	
      headers: headers,	
      mode: 'cors',	
      cache: 'default'
    };
    fetch(APILivre, param).then((response)=>{	
      return response.json();	
    }).then((res)=>{
      if(!res.success){
        throw res.data;
      }
      this.livres = res.data;
    }).catch(function(error){
      console.log(error);
    });
  }
})
export default class Home extends Vue {}
</script>

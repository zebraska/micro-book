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
    // axios
    //   .get("http://localhost:3002/api/v1/micro-book/livre")
    //   .then((response: AxiosResponse<Livre[]>) => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     // Handle error here
    //   });
    setTimeout(() => {
      this.livres = [
        {
          id: 1,
          titre: "Titanic",
          auteur: "pierre bob",
          resume: "la bateau a coulé",
          quantite: 2
        },
        {
          id: 2,
          titre: "eragon",
          auteur: "thomas",
          resume: "joli dragon",
          quantite: 3
        }
      ];
    }, 5000);
  }
})
export default class Home extends Vue {}
</script>

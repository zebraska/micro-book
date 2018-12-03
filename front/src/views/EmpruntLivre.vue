<template>
<div>
  <h2> {{ livre.titre }} </h2>
  <div md-card>
    <md-field>
      <label>Prenom</label>
      <md-input></md-input>
    </md-field>

    <md-field>
      <label>Nom</label>
      <md-input></md-input>
    </md-field>

    <div>
      <label>Quantité disponible: </label>
      {{ livre.quantite }}
    </div>

    <md-button class="md-raised md-primary">Valider</md-button>
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
    return {};
  },
  methods: {
    select(livre: Livre) {
      this.selected = livre;
    },
    newBook() {}
  },
  props: ["livre"]
});
</script>

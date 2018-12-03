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

    <md-button class="md-raised md-primary">Valider</md-button>
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
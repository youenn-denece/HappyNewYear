<template src="./Result.html"></template>
<style src="./Result.css"></style>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Result',
  setup() {
    const route = useRoute();
    const ville = (route.query.ville as string)?.toLowerCase();
    const genre = route.query.genre as string;

    let nom = 'Invité';
    if (ville === 'quimper' && genre === 'homme') {
      nom = 'Antoine';
    }

    return { nom };
  }
});
</script>

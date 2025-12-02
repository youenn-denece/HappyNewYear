<template src="./Home.html"></template>
<style src="./Home.css"></style>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    let ville = '';
    let genre = '';

    const goToResult = () => {
      router.push({ path: '/result', query: { ville, genre } });
    };

    return { ville, genre, goToResult };
  }
});
</script>

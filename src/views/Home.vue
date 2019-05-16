<template lang="pug">
    .home-wrapper
        p
         | Welcome to bowling pin! <br/>
         | Do you want to start a new game?  
        router-link(to="/game").btn New game
</template> 
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {

}
</script>

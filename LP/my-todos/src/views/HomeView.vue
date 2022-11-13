<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-for="toDo in toDos" :key="toDo.id">
      <ToDo :toDo="toDo" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ToDo from "@/components/ToDo.vue";
import { BASE_URL, REQUEST_OPTIONS } from "@/utils/requestOptions";

export default {
  name: "HomeView",
  components: {
    ToDo,
  },
  data() {
    return {
      toDos: [],
    };
  },
  created() {
    // const BASE_URL = "http://localhost:3000/";
    // const REQUEST_OPTIONS = {
    //   method: "GET",
    //   mode: "cors",
    //   cache: "no-cache",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   redirect: "follow",
    //   referrerPolicy: "no-referrer",
    // };

    // fetch(BASE_URL, REQUEST_OPTIONS)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     this.toDos = res;
    //   });

    fetch(BASE_URL, REQUEST_OPTIONS)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            this.toDos = res;
          });
        }
      });
  },
};
</script>

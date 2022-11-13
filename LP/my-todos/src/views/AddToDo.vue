<template>
  <div>
    <p>Vrei sa adaugi task-ul: {{ name }} / {{ status }}</p>
    <input type="text" placeholder="To do name" v-model="name" />
    <input type="text" placeholder="To do status" v-model="status" />
    <button @click="addToDo">Add To Do</button>
  </div>
</template>

<script>
import { BASE_URL, REQUEST_OPTIONS } from "@/utils/requestOptions";

export default {
  name: "AddToDo",
  data() {
    return {
      name: "",
      status: "",
    };
  },
  methods: {
    addToDo() {
      console.log(
        "Vrei sa trimiti catre server to-do-ul:",
        this.name + " / " + this.status
      );
      let localRequestOptions = { ...REQUEST_OPTIONS };
      localRequestOptions.method = "POST";
      localRequestOptions.body = JSON.stringify({
        taskName: this.name,
        status: this.status,
        id: "",
      });

      fetch(BASE_URL + "tasks", localRequestOptions).then((res) => {
        console.log("Am primit raspuns de la server:", res);
        if (res.status === 201) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style>

</style>

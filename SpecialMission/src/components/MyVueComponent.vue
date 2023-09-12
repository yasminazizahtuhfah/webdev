<template>
    <div>
      <h1>Data dari MongoDB</h1>
      <ul>
        <li v-for="item in data" :key="item._id">{{ item.nama }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: [],
      };
    },
    mounted() {
      // Ambil data dari server backend
      axios.get('/api/data').then((response) => {
        this.data = response.data;
      });
    },
  };
  </script>
  
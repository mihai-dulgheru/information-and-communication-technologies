const app = {
  data() {
    return {
      amount: 50,
      cost: 0,
    };
  },
  methods: {
    addToAmount(cost) {
      this.amount += cost;
    },
  },
  computed: {
    tax() {
      return (this.amount * 0.2).toFixed(2);
    },
  },
  watch: {
    amount(newValue, oldValue) {
      // optional parameters
      console.log(`The old amount of ${oldValue} has changed
          with this one: ${newValue}`);
    },
  },
};

Vue.createApp(app).mount('#app');

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="sendProfile">
      <v-text-field v-model="firstName" label="Имя"></v-text-field>
      <v-text-field v-model="lastName" label="Фамилия"></v-text-field>
      <v-text-field v-model="company" label="Компания"></v-text-field>
      <v-text-field v-model="jobTitle" label="Специальность"></v-text-field>
      <v-text-field v-model="phone" label="Телефон"></v-text-field>
      <v-text-field v-model="email" label="E-mail"></v-text-field>
      <v-text-field v-model="interests" label="Интересы"></v-text-field>
      <v-btn color="primary" type="submit" block class="mt-2">Применить</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  name: 'ProfileComponent',
  components: {},
  props: ['row'],
  data: () => ({
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    phone: '',
    email: '',
    interests: '',
  }),
  mounted() {
    console.log('sdasa', this.$router);
    if (this.$router.history.current.name !== 'add') {
      this.firstName = this.row.firstName;
      this.lastName = this.row.lastName;
      this.company = this.row.company;
      this.jobTitle = this.row.jobTitle;
      this.phone = this.row.phone;
      this.email = this.row.email;
      this.interests = this.row.interests;
    }
  },
  methods: {
    sendProfile: function () {
      let newProfile = {};
      newProfile.firstName = this.firstName;
      newProfile.lastName = this.lastName;
      newProfile.company = this.company;
      newProfile.jobTitle = this.jobTitle;
      newProfile.phone = this.phone;
      newProfile.email = this.email;
      newProfile.interests = this.interests;
      if (this.$router.history.current.name !== 'add') {
        this.axios
          .put(process.env.VUE_APP_BASE_URL + '/' + this.row.id, newProfile)
          .then(() => this.$router.push({ path: '/' }));
      } else {
        this.axios
          .post(process.env.VUE_APP_BASE_URL, newProfile)
          .then(() => this.$router.push({ path: '/' }));
      }
    },
  },
};
</script>
<style></style>

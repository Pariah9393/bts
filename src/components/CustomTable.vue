<template>
  <div>
    <v-btn color="success" class="mt-16" @click="handleClickAdd"
      >добавить</v-btn
    >
    <v-data-table
      :headers="headers"
      :items="profilesStatused"
      :options.sync="options"
      :server-items-length="totalPages"
      @click:row="handleClickUpdate"
      class="elevation-1 mt-4"
    >
      <template v-slot:[`item.action`]="e">
        <v-btn @click.stop="handleClickDelete(e)" color="error">удалить</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'CustomTable',

  components: {},
  props: ['statusProp', 'searchProp'],
  data: () => ({
    headers: [
      { text: 'Статус', value: 'status' },
      {
        text: 'Имя',
        value: 'firstName',
      },
      {
        text: 'Фамилия',
        value: 'lastName',
      },
      {
        text: 'Компания',
        value: 'company',
      },
      {
        text: 'Специальность',
        value: 'jobTitle',
      },
      {
        text: 'Телефон',
        value: 'phone',
      },
      {
        text: 'E-mail',
        value: 'email',
      },
      {
        text: 'Интересы',
        value: 'interests',
      },
      {
        text: '',
        value: 'action',
      },
    ],
    profiles: [],
    page: 0,
    options: {},
    loading: true,
    numberOfPages: 0,
    itemsPerPage: 10,
    totalPages: 0,
  }),
  mounted() {
    this.axios
      .get(process.env.VUE_APP_BASE_URL)
      .then((response) => (this.totalPages = response.data.length));

    this.fetchProfiles();
  },
  methods: {
    fetchProfiles() {
      const { page, itemsPerPage } = this.options;
      this.$store.dispatch('fetchProfilesWithPagination', {
        page: page,
        limit: itemsPerPage,
      });
    },
    filterProfiles() {
      console.log('fetchProfilesWithSearch');
      this.searchProp
        ? this.$store.dispatch('fetchProfilesWithSearch', {
            value: this.searchProp,
          })
        : this.fetchProfiles();
    },
    handleClickUpdate(row) {
      console.log('u');
      this.$router.push({ name: 'update', params: { row: row } });
    },
    handleClickAdd() {
      this.$router.push({ name: 'add' });
    },
    handleClickDelete(e) {
      this.$store.dispatch('deleteProfile', {
        id: e.item.id,
      });
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchProfiles();
      },
      deep: true,
    },
    searchProp: function () {
      this.filterProfiles();
    },
  },
  computed: {
    profilesStatused: function () {
      if (this.statusProp === 'all') {
        return this.$store.state.profiles;
      }
      return this.$store.state.profiles.filter(
        (i) => i.status == this.statusProp
      );
    },
  },
};
</script>

<style>
.tableOffset {
  margin-left: 250px;
}
</style>

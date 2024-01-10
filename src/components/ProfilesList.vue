<template>
  <div>
    <v-app-bar color="primary accent-4" dark app clipped-left clipped-right>
      <v-row>
        <v-app-bar-nav-icon
          class="pt-1"
          @click.stop="drawerLeft = !drawerLeft"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          icon
          @click.stop="drawerRight = !drawerRight"
          class="pt-2"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-app-bar-nav-icon>
        <v-col cols="2">
          <v-text-field
            v-model="search"
            hide-details
            placeholder="Search name..."
            class="search"
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerLeft" app clipped left>
      <v-list nav dense>
        <v-list-item title="My Application">Профили</v-list-item>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="status = 'all'">
            <v-list-item-icon>
              <v-icon color="primary">mdi-check-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Все</v-list-item-title>
          </v-list-item>

          <v-list-item @click="status = true">
            <v-list-item-icon>
              <v-icon color="primary">mdi-check-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Обработанные</v-list-item-title>
          </v-list-item>
          <v-list-item @click="status = false">
            <v-list-item-icon>
              <v-icon color="primary">mdi-alert-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Не обработанные</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <CustomTable
      :class="{ tableOffset: drawerLeft }"
      :statusProp="status"
      :searchProp="search"
    />
  </div>
</template>

<script>
import CustomTable from '@/components/CustomTable';

export default {
  name: 'ProfilesList',

  components: { CustomTable },

  data: () => ({
    drawerLeft: false,
    drawerRight: false,
    group: null,
    status: 'all',
    search: '',
  }),
  methods: {},
};
</script>

<style>
.tableOffset {
  margin-left: 250px;
}
.search {
  width: 200px;
}
</style>

<template>
  <div class="full-width">
    <q-toolbar class="text-black shadow-2">
<!--      <q-toolbar-title>Контакты</q-toolbar-title>-->
      <q-btn flat @click="showNewPerson" style="color: #8b2639;">Добавить запись</q-btn>
      <q-input square filled dense class="absolute-right" style="padding-top: 5px; padding-right: 5px; width: 300px">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>

    </q-toolbar>

<!--    <q-list bordered separator>-->
<!--      <q-item v-for="contact in contacts" :key="contact.id" clickable v-ripple>-->
<!--        <q-item-section avatar>-->
<!--          <q-avatar>-->
<!--            <img src="https://cdn.quasar.dev/img/avatar.png">-->
<!--          </q-avatar>-->
<!--        </q-item-section>-->

<!--        <q-item-section>-->
<!--          <q-item-label>{{ contact.name }}</q-item-label>-->
<!--          <q-item-label caption lines="1">Место работы</q-item-label>-->
<!--          <q-item-label caption lines="2">Должность</q-item-label>-->
<!--&lt;!&ndash;          <q-item-label caption lines="3">Телефон</q-item-label>&ndash;&gt;-->
<!--&lt;!&ndash;          <q-item-label caption lines="4">Email</q-item-label>&ndash;&gt;-->
<!--        </q-item-section>-->

<!--        <q-item-section side>-->
<!--          <q-icon name="menu_open" color="red-10" />-->
<!--        </q-item-section>-->
<!--      </q-item>-->

<!--      <q-separator />-->
<!--    </q-list>-->
    <div class="q-pa-md">
      <q-table
        title="Персонал"
        :rows="persons"
        :columns="columns"
        row-key="id"
      >

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="red-10" round dense @click="" icon="edit" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              v-ripple
              style="cursor: pointer"
              @click="goPerson(props.key)"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
  </div>
  <new-person ref="newPerson"></new-person>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import NewPerson from "pages/persons/newPerson";

const columns = [
  {
    name: 'name',
    required: true,
    label: 'ФИО',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'post', label: 'Должность', field: 'post', sortable: true },
  { name: 'fat', label: 'Место работы', field: 'placeOfPost', sortable: true },
  { name: 'carbs', label: 'Телефон', field: 'phone' },
  { name: 'protein', label: 'Email', field: 'email' },
  { name: 'sodium', label: 'Visa', field: 'visaExpiredDate', sortable: true},
]



export default {
  name: 'persons',
  components: {NewPerson},
  setup () {
    return {
      // contacts,
      // offline,
      dialog: ref(false),
      columns,
    }
  },
  data: () => ({
    persons: [],
  }),
  methods: {
    loadData() {
      // api.get('/todos/1')
      api.get('/persons')
        .then((response) => {
          this.persons = response.data;
          console.log(this.persons);
        })
      },
    testing() {
      api.get('/persons/1')
      .then((response) => {
        console.log(response);
      })
    },
    showNewPerson() {
      this.$refs.newPerson.showDialog();
    },
    goPerson(id) {
      // console.log(id);
      location.href = `/person/${id}`;
    },
  },
  created() {
    this.loadData();
    this.testing();
  }

}
</script>

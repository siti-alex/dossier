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
        title="Treats"
        :rows="persons"
        :columns="columns"
        row-key="name"
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

// const contacts = [ {
//   id: 1,
//   name: 'Ruddy Jedrzej',
//   email: 'rjedrzej0@discuz.net',
//   letter: 'R'
// }, {
//   id: 2,
//   name: 'Mallorie Alessandrini',
//   email: 'malessandrini1@marketwatch.com',
//   letter: 'M'
// }, {
//   id: 3,
//   name: 'Elisabetta Wicklen',
//   email: 'ewicklen2@microsoft.com',
//   letter: 'E'
// }, {
//   id: 4,
//   name: 'Seka Fawdrey',
//   email: 'sfawdrey3@wired.com',
//   letter: 'S'
// } ]
//
// const offline = [ {
//   id: 5,
//   name: 'Brunhilde Panswick',
//   email: 'bpanswick4@csmonitor.com',
//   avatar: 'avatar2.jpg'
// }, {
//   id: 6,
//   name: 'Winfield Stapforth',
//   email: 'wstapforth5@pcworld.com',
//   avatar: 'avatar6.jpg'
// } ]
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

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
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
      rows,
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
    showNewPerson() {
      this.$refs.newPerson.showDialog();
    },
  },
  created() {
    this.loadData();
  }

}
</script>

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

    <q-list bordered separator>
      <q-item v-for="contact in contacts" :key="contact.id" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">Место работы</q-item-label>
          <q-item-label caption lines="2">Должность</q-item-label>
<!--          <q-item-label caption lines="3">Телефон</q-item-label>-->
<!--          <q-item-label caption lines="4">Email</q-item-label>-->
        </q-item-section>

        <q-item-section side>
          <q-icon name="menu_open" color="red-10" />
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </div>
  <new-person ref="newPerson"></new-person>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import NewPerson from "pages/persons/newPerson";

const contacts = [ {
  id: 1,
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  letter: 'R'
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  letter: 'M'
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  letter: 'E'
}, {
  id: 4,
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  letter: 'S'
} ]

const offline = [ {
  id: 5,
  name: 'Brunhilde Panswick',
  email: 'bpanswick4@csmonitor.com',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  name: 'Winfield Stapforth',
  email: 'wstapforth5@pcworld.com',
  avatar: 'avatar6.jpg'
} ]

export default {
  name: 'persons',
  components: {NewPerson},
  setup () {
    return {
      contacts,
      offline,
      dialog: ref(false),
    }
  },
  methods: {
    loadData() {
      // api.get('/todos/1')
      api.get('/persons')
        .then((response) => {
          console.log(response);
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

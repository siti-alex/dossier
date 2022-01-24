<template>
  <div class="q-pa-md q-gutter-sm" v-if="dialog">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar style="background-color: #8b2639">
          <q-space />

          <q-btn dense flat icon="close" v-close-popup class="text-white">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Общая информация</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <fieldset>
            <div class="row">
              <q-input class="col" v-model="newPerson.name" label="ФИО" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.placeJob" label="Место работы" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.job" label="Должность" style="margin-right: 20px"/>
            </div>
            <br>
            <div class="row">
              <q-input class="col" v-model="newPerson.dateBirth" type="date" label="Дата рождения" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.telephone" label="Телефон" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.email" label="Email" style="margin-right: 20px"/>
            </div>
            <br>
            <div class="row">
              <q-input class="col" v-model="newPerson.passport" label="Номер паспорта" style="margin-right: 20px"/>
              <q-input class="col" type="date" v-model="newPerson.datePassword" label="Дата выдачи паспорта" style="margin-right: 20px"/>
              <q-separator vertical style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.visa" label="Номер Visa" style="margin-right: 20px"/>
              <q-input class="col" type="date" v-model="newPerson.dateVisa" label="Дата окончания Visa" style="margin-right: 20px"/>
            </div>

          </fieldset>

          <br>

          <div class="text-h6">Социальные сети</div>
          <fieldset>
            <div class="flex" v-for="url in addUrl">
              <q-input label="URL" style="width: 95%; margin-right: 10px" />
              <q-btn flat icon="add" @click="addUrl.push(0)"></q-btn>
            </div>
          </fieldset>

          <br>

          <div class="text-h6">Хобби</div>
          <fieldset>
            <q-input
              filled
              type="textarea"
            />
          </fieldset>

          <br>

          <div class="text-h6">Примечание</div>
          <fieldset>
            <q-input
              filled
              type="textarea"
            />
          </fieldset>

          <hr>
          <q-btn class="full-width text-white" style="background-color: #8b2639">Сохранить</q-btn>





        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'newPerson',
  setup () {
    return {
      dialog: ref(false),
    }
  },
  data: () => ({
    // dialog: false,
    addUrl: [0],
    newPerson: {
      name: null,
      placeJob: null,
      job: null,
      dateBirth: ref('2019-02-01'),
      telephone: null,
      email: null,
      passport: null,
      datePassword: ref('2019-02-01'),
      visa: null,
      dateVisa: ref('2019-02-01'),

      socialNetworks: [

      ]
    }
  }),
  methods: {
    showDialog() {
      this.dialog = !this.dialog;
    }
  }
}
</script>

<style scoped>
</style>

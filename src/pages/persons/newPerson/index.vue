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
            <q-input label="ФИО" style="margin-bottom: 8px"/>
            <q-input label="Место работы" style="margin-bottom: 8px"/>
            <q-input label="Должность" style="margin-bottom: 8px"/>
            <q-input v-model="dateBirth" type="date" label="Дата рождения" style="margin-bottom: 8px"/>
            <q-input label="Телефон" style="margin-bottom: 8px"/>
            <q-input label="Email" style="margin-bottom: 8px"/>
            <q-input label="Номер паспорта" style="margin-bottom: 8px"/>
            <q-input type="date" v-model="datePassword" label="Дата выдачи паспорта" style="margin-bottom: 8px"/>
            <q-input label="Номер Visa" style="margin-bottom: 8px"/>
            <q-input type="date" v-model="dateVisa" label="Дата окончания Visa" style="margin-bottom: 8px"/>
          </fieldset>

          <br>

          <div class="text-h6">Социальные сети</div>
          <fieldset>
            <q-input label="URL" />
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
      dateBirth: ref('2019/02/01'),
      datePassword: ref('2019/02/01'),
      dateVisa: ref('2019/02/01'),
    }
  },
  data: () => ({
    // dialog: false,
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

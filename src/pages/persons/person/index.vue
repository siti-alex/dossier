<template>
  <q-card v-if="person">
<!--    <q-img :src=""></q-img>-->
    <q-card-section>
      <div class="text-h6">Общая информация</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
        <div class="row">
          <q-img class="col-3" :src="`http://192.168.202.115:8004/persons/${$route.params.id}/photo`" width="250px" height="250px"></q-img>
          <div class="col-9" style="margin-left: 20px">
            <q-input class="col" v-model="person.name" label="ФИО" style="margin-right: 20px"/>
            <q-input class="col" v-model="person.placeOfPost" label="Место работы" style="margin-right: 20px"/>
            <q-input class="col" v-model="person.post" label="Должность" style="margin-right: 20px"/>
          </div>
        </div>

        <br>
        <div class="row">
          <q-input class="col" v-model="person.dateOfBirth" type="date" label="Дата рождения" style="margin-right: 20px"/>
          <q-input class="col" v-model="person.phone" label="Телефон" style="margin-right: 20px"/>
          <q-input class="col" v-model="person.email" label="Email" style="margin-right: 20px"/>
        </div>
        <br>
        <div class="row">
          <q-input class="col" v-model="person.passportNumber" label="Номер паспорта" style="margin-right: 20px"/>
          <q-input class="col" type="date" v-model="person.passportExpiredDate" label="Дата выдачи паспорта" style="margin-right: 20px"/>
          <q-separator vertical style="margin-right: 20px"/>
          <q-input class="col" v-model="person.visaNumber" label="Номер Visa" style="margin-right: 20px"/>
          <q-input class="col" type="date" v-model="person.visaExpiredDate" label="Дата окончания Visa" style="margin-right: 20px"/>
        </div>

      <br>

      <div class="text-h6">Социальные сети</div>
        <div class="flex">
          <q-input label="URL"  style="width: 95%; margin-right: 10px" />
          <q-btn flat icon="add"></q-btn>
        </div>

      <br>

      <div class="text-h6">Хобби</div>
        <q-input
          filled
          type="textarea"
        />

      <br>

      <div class="text-h6">Примечание</div>
        <q-input
          filled
          type="textarea"
        />

      <hr>
      <q-btn class="full-width text-white" style="background-color: #8b2639">Сохранить</q-btn>

    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
export default {
  name: "person",
  data: () => ({
    // serverIp: api,
    person: null,
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

      socialNetworks: [],
    },
  }),
  methods: {
    getPerson() {
      api.get(`/persons/${this.$route.params.id}`)
      .then((response) => {
        this.person = response.data;
        console.log(this.person);
      })
    },
  },
  created() {
    this.getPerson();
  }
}
</script>

<style scoped>

</style>

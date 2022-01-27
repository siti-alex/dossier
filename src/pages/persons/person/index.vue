<template>
  <q-card v-if="person">
<!--    <q-img :src=""></q-img>-->
    <q-card-section>
      <div class="text-h6">Общая информация</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
        <div class="row">
          <q-img class="col-3" :src="`${$axios.defaults.baseURL}/persons/${$route.params.id}/photo`" width="250px" height="250px"></q-img>
          <div class="col-9" style="margin-left: 20px">
            <q-input class="col" v-model="person.name" label="ФИО"/>
            <q-input class="col" v-model="person.placeOfPost" label="Место работы"/>
            <q-input class="col" v-model="person.post" label="Должность"/>
            <q-input class="col" v-model="person.dateOfBirth" type="date" label="Дата рождения"/>
          </div>
        </div>

        <br>
        <div class="row">
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
        <div class="flex" v-for="soc in person.socialNetAccs" v-if="person.socialNetAccs.length !== 0">
          <q-input :label="soc.type" v-model="soc.url" style="width: 100%"/>
        </div>
        <div v-else class="text-subtitle2">
          Отсутствуют
        </div>
      <br>

      <div class="text-h6">Хобби</div>
        <div class="flex" v-for="hob in person.hobbies" v-if="person.hobbies.length !== 0">
          <q-input :label="hob.type" v-model="hob.url" style="width: 100%"/>
        </div>
        <div v-else class="text-subtitle2">
          Отсутствуют
      </div>

      <br>

      <div class="text-h6">Примечание</div>
        <q-input
          filled
          type="textarea"
        />

      <hr>

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

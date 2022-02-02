<template>
  <q-card v-if="person">
<!--    <q-img :src=""></q-img>-->
    <q-card-actions class="flex flex-center row" style="margin-top: 20px">
      <q-btn class="col text-subtitle1" label="Экспорт" icon-right="file_download" :href="`${$axios.defaults.baseURL}/persons/${$route.params.id}/report`" color="red-10" flat></q-btn>
      <q-btn class="col text-subtitle1" label="Редактировать" @click="editing" v-if="!edit" icon-right="edit" color="red-10" flat></q-btn>
      <q-btn class="col text-subtitle1" label="Редактировать" @click="editing" v-if="edit" icon-right="edit_off" color="red-10" flat></q-btn>
      <q-btn class="col text-subtitle1" label="Удалить" @click="test" icon-right="file_download" color="red-10" flat></q-btn>
    </q-card-actions>
    <q-card-section>
      <div class="text-h6">Общая информация</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
        <div class="row">
          <q-img class="col-3" :src="`${$axios.defaults.baseURL}/persons/${$route.params.id}/photo`" width="250px" height="250px"></q-img>
          <div class="col-9" style="margin-left: 20px">
            <q-input class="col" v-model="person.name" :readonly="!edit" label="ФИО"/>
            <q-input class="col" v-model="person.placeOfPost" :readonly="!edit" label="Место работы"/>
            <q-input class="col" v-model="person.post" :readonly="!edit" label="Должность"/>
            <q-input class="col" v-model="person.dateOfBirth" :readonly="!edit" type="date" label="Дата рождения"/>
          </div>
        </div>

        <br>
        <div class="row">
          <q-input class="col" v-model="person.phone" :readonly="!edit" label="Телефон" style="margin-right: 20px"/>
          <q-input class="col" v-model="person.email" :readonly="!edit" label="Email" style="margin-right: 20px"/>
        </div>
        <br>
        <div class="row">
          <q-input class="col" v-model="person.passportNumber" :readonly="!edit" label="Номер паспорта" style="margin-right: 20px"/>
          <q-input class="col" type="date" v-model="person.passportExpiredDate" :readonly="!edit" label="Дата выдачи паспорта" style="margin-right: 20px"/>
          <q-separator vertical style="margin-right: 20px"/>
          <q-input class="col" v-model="person.visaNumber" :readonly="!edit" label="Номер Visa" style="margin-right: 20px"/>
          <q-input class="col" type="date" v-model="person.visaExpiredDate" :readonly="!edit" label="Дата окончания Visa" style="margin-right: 20px"/>
        </div>

      <br>

      <div class="text-h6">Социальные сети</div>
        <div class="flex" v-for="soc in person.socialNetAccs" v-if="person.socialNetAccs.length !== 0">
          <q-input :label="soc.type" v-model="soc.url" :readonly="!edit" style="width: 100%"/>
        </div>
        <div v-else class="text-subtitle2">
          Отсутствуют
        </div>
      <br>

      <div class="text-h6">Хобби</div>
        <div class="flex" v-for="hob in person.hobbies" v-if="person.hobbies.length !== 0">
          <q-input :label="hob.name" v-model="hob.comment" :readonly="!edit" style="width: 100%"/>
        </div>
        <div v-else class="text-subtitle2">
          Отсутствуют
      </div>

      <br>

      <div class="text-h6">Примечание</div>
        <q-input
          filled
          :readonly="!edit"
          type="textarea"
        />

      <hr>
      <q-btn class="full-width text-white" @click="save" v-if="edit" style="background-color: #8b2639">Сохранить</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
export default {
  name: "person",
  // setup () {
  //   // const $q = useQuasar()
  //
  //   function confirm () {
  //     $q.dialog({
  //       title: 'Подтвердите',
  //       message: 'Вы действительно хотите удалить данного человека из базы?',
  //       cancel: true,
  //       persistent: true
  //     }).onOk(() => {
  //       console.log('hello')
  //     }).onCancel(() => {
  //       // console.log('>>>> Cancel')
  //     }).onDismiss(() => {
  //       // console.log('I am triggered on both OK and Cancel')
  //     })
  //   }
  //
  //   return { alert, confirm, prompt }
  // },
  data: () => ({
    // serverIp: api,
    person: null,
    edit: false,
    $q: useQuasar()
  }),
  methods: {
    test() {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы действительно хотите удалить данного человека из базы?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleting();
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    getPerson() {
      api.get(`/persons/${this.$route.params.id}`)
      .then((response) => {
        this.person = response.data;
        console.log(this.person);
      })
    },
    editing() {
      this.edit = !this.edit;
    },
    deleting() {
      api.delete(`/persons/${this.$route.params.id}`).then((response) => {
        console.log(response);
        location.href = `/persons`;
      })
    },
    save() {
      const fullObject = new FormData();
      fullObject.append('dto', JSON.stringify(this.person));
      fullObject.append('photo', this.person.photo);

      api.put(`/persons/${this.$route.params.id}`, fullObject).then((response) => {
        console.log(response);
        // location.href = `/persons`;
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

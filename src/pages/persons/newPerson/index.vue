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

              <q-file class="col" outlined v-model="photo">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>

              <q-input class="col" v-model="newPerson.name" label="ФИО" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.placeOfPost" label="Место работы" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.post" label="Должность" style="margin-right: 20px"/>
            </div>
            <br>
            <div class="row">
              <q-input class="col" v-model="newPerson.dateOfBirth" type="date" label="Дата рождения" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.phone" label="Телефон" style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.email" label="Email" style="margin-right: 20px"/>
            </div>
            <br>
            <div class="row">
              <q-input class="col" v-model="newPerson.passportNumber" label="Номер паспорта" style="margin-right: 20px"/>
              <q-input class="col" type="date" v-model="newPerson.passportExpiredDate" label="Дата выдачи паспорта" style="margin-right: 20px"/>
              <q-separator vertical style="margin-right: 20px"/>
              <q-input class="col" v-model="newPerson.visaNumber" label="Номер Visa" style="margin-right: 20px"/>
              <q-input class="col" type="date" v-model="newPerson.visaExpiredDate" label="Дата окончания Visa" style="margin-right: 20px"/>
            </div>

          </fieldset>

          <br>

          <div class="text-h6">Социальные сети</div>
<!--          <fieldset>-->
<!--            <div class="flex" v-for="url in addUrl">-->
<!--              <q-input label="URL" @change="test(url)" v-model="newPerson.socialNetworks[url]" style="width: 95%; margin-right: 10px" />-->
<!--              <q-btn flat icon="add" @click="addUrl.push(addUrl[addUrl.length-1]+1)"></q-btn>-->
<!--            </div>-->
<!--          </fieldset>-->
          <fieldset>
            <div v-for="soc in newPerson.socialNetAccs" class="row inline" style="width: 100%">
              <q-input label="Название" v-model="soc.type" style="width: 25%; margin-right: 20px"/>
              <q-input label="URL" v-model="soc.url" style="width: 70%"/>
            </div>
            <q-btn flat rounded icon="add" @click="newPerson.socialNetAccs.push(Object.create(social))" style="margin: -4%"></q-btn>
          </fieldset>

          <br>

          <div class="text-h6">Хобби</div>
          <fieldset>
            <div v-for="hob in newPerson.hobbies" class="row inline" style="width: 100%">
              <q-input label="Заметка" v-model="hob.name" style="width: 25%; margin-right: 20px"/>
              <q-input label="Описание" v-model="hob.comment" style="width: 70%"/>
            </div>
            <q-btn flat rounded icon="add" @click="newPerson.hobbies.push(Object.create(hobbi))" style="margin: -4%"></q-btn>
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
          <q-btn class="full-width text-white" @click="submit" style="background-color: #8b2639">Сохранить</q-btn>





        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import {api} from "boot/axios";

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
    social: {
      type: null,
      url: null,
    },
    hobbi: {
      name: null,
      comment: null,
    },
    newPerson: {
      name: null,
      placeOfPost: null,
      post: null,
      dateOfBirth: '2019-02-01',
      phone: null,
      email: null,
      passportNumber: null,
      passportExpiredDate: '2019-02-01',
      visaNumber: null,
      visaExpiredDate: '2019-02-01',

      socialNetAccs: [
        {
          type: null,
          url: null,
        }
      ],

      hobbies: [
        {
          name: null,
          comment: null,
        }
      ],
      notes: [
        {
          name: null,
          text: null,
        }
      ],
    },
    photo: null,
  }),
  methods: {
    showDialog() {
      this.dialog = !this.dialog;
    },
    test() {
      console.log(this.newPerson)
    },
    submit() {

      const fullObject = new FormData();
      fullObject.append('dto', JSON.stringify(this.newPerson));
      fullObject.append('photo', this.photo);

      const data = new FormData();
      data.append('name', this.newPerson.name);
      data.append('placeOfPost', this.newPerson.placeOfPost);
      data.append('post', this.newPerson.post);
      data.append('dateOfBirth', this.newPerson.dateOfBirth);
      data.append('phone', this.newPerson.phone);
      data.append('email', this.newPerson.email);
      data.append('passportNumber', this.newPerson.passportNumber);
      data.append('passportExpiredDate', this.newPerson.passportExpiredDate);
      data.append('visaNumber', this.newPerson.visaNumber);
      data.append('visaExpiredDate', this.newPerson.visaExpiredDate);
      data.append('photo', this.newPerson.photo);

      // data.append('socialNetAccs', this.newPerson.socialNetAccs);
      // data.append('hobbies', this.newPerson.hobbies);
      // data.append('notes', this.newPerson.notes);

      this.newPerson.socialNetAccs.forEach((value) => {
        const soc = {
          type: value.type,
          url: value.url
        }
        data.append('socialNetAccs', JSON.stringify(soc))
      });

      this.newPerson.hobbies.forEach((value) => {
        const hob = {
          name: value.name,
          comment: value.comment
        }
        data.append('hobbies', JSON.stringify(hob))
      });

      this.newPerson.notes.forEach((value) => {
        const not = {
          name: value.name,
          text: value.text
        }
        data.append('notes', JSON.stringify(not))
      })




      console.log(fullObject);
      api.post('/persons',fullObject).then((response) => {
        console.log(response);
        location.href = `/persons`;
      })
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <q-card v-if="person">
<!--    <q-img :src=""></q-img>-->
    <q-card-actions class="flex flex-center row" style="margin-top: 20px">
      <q-btn class="col text-subtitle1" label="Экспорт" icon-right="file_download" :href="`${$axios.defaults.baseURL}/persons/${$route.params.id}/report`" color="red-10" flat></q-btn>
      <q-btn class="col text-subtitle1" label="Редактировать" @click="editing" v-if="!edit" icon-right="edit" color="red-10" flat></q-btn>
      <q-btn class="col text-subtitle1" label="Редактировать" @click="editing" v-if="edit" icon-right="edit_off" color="red-10" flat></q-btn>
      <q-btn class="col text-subtitle1" label="Удалить" @click="confirm" icon-right="delete" color="red-10" flat></q-btn>
    </q-card-actions>
    <q-card-section>
      <div class="text-h6">Общая информация</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
        <div class="row">
<!--          <q-img class="col-3" :src="`${$axios.defaults.baseURL}/persons/${$route.params.id}/photo`" width="250px" height="250px"/>-->

            <q-img class="col-3" v-if="!close" :src="`${$axios.defaults.baseURL}/persons/${$route.params.id}/photo`" width="250px" height="250px">
              <q-icon class="absolute all-pointer-events" v-if="edit" @click="photo = null; close = true" size="32px" name="close" color="white" style="top: 8px; left: 85%; cursor: pointer">
              </q-icon>
            </q-img>

             <div v-if="close == true">
                <q-file filled v-model="photo" accept=".jpg, image/*" v-if="photo == null" label="Вставить фото" @update:model-value="imgPreview">
                  <template v-slot:prepend>
                    <q-icon name="attachment" />
                  </template>
                </q-file>

                <q-img :src="previewImg" v-if="photo" width="250px" height="250px">
                  <q-icon class="absolute all-pointer-events" @click="photo = null" size="32px" name="close" color="white" style="top: 8px; left: 85%; cursor: pointer">
                  </q-icon>
                </q-img>
            </div>


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
          <q-input class="col" type="date" v-model="person.passportIssueDate" :readonly="!edit" label="Дата выдачи паспорта" style="margin-right: 20px"/>
          <q-input class="col" type="date" v-model="person.passportExpiredDate" :readonly="!edit" label="Дата окончания срока действия паспорта" style="margin-right: 20px"/>
          <q-separator vertical style="margin-right: 20px"/>
          <q-input class="col" v-model="person.visaNumber" :readonly="!edit" label="Номер Visa" style="margin-right: 20px"/>
          <q-input class="col" type="date" v-model="person.visaIssueDate" :readonly="!edit" label="Дата выдачи Visa" style="margin-right: 20px"/>
          <q-input class="col" type="date" v-model="person.visaExpiredDate" :readonly="!edit" label="Дата окончания срока действия Visa" style="margin-right: 20px"/>
        </div>

      <br>

      <div class="text-h6">Социальные сети</div>
        <div class="flex" v-for="soc in person.socialNetAccs" v-if="person.socialNetAccs[0].url !== null && person.socialNetAccs[0].type !== null || edit">
          <q-input v-if="!edit" :label="soc.type" v-model="soc.url" :readonly="!edit" style="width: 100%"/>
          <q-input v-if="edit" label="Название" v-model="soc.type" style="width: 25%; margin-right: 20px"/>
          <q-input v-if="edit" label="URL" v-model="soc.url" style="width: 70%"/>
          <q-btn flat rounded icon="add" @click="person.socialNetAccs.push(Object.create(newSocialNetAccs))" v-if="person.socialNetAccs.indexOf(soc) == person.socialNetAccs.length-1 && edit"></q-btn>
        </div>
        <div v-else v-if="!edit" class="text-subtitle2">
          Отсутствуют
        </div>


      <br>

      <div class="text-h6">Хобби</div>
            <div class="flex" v-for="hob in person.hobbies" v-if="person.hobbies[0].name !== null && person.hobbies[0].comment !== null || edit">
              <q-input v-if="!edit" :label="hob.name" v-model="hob.comment" :readonly="!edit" style="width: 100%"/>
              <q-input v-if="edit" label="Заметка" v-model="hob.name" style="width: 25%; margin-right: 20px"/>
              <q-input v-if="edit" label="Описание" v-model="hob.comment" style="width: 70%"/>
              <q-btn flat rounded icon="add" @click="person.hobbies.push(Object.create(newHob))" v-if="person.hobbies.indexOf(hob) == person.hobbies.length-1 && edit"></q-btn>
            </div>
            <div v-else v-if="!edit" class="text-subtitle2">
              Отсутствуют
            </div>

      <br>

      <div class="text-h6">Примечания</div>
      <div v-for="not in person.notes" v-if="person.notes[0].name !== null && person.notes[0].text !== null || edit">
        <q-input
          filled
          :label="not.name"
          :readonly="!edit"
          type="textarea"
          v-model="not.text"
          v-if="!edit"
        />
        <div class="row inline" style="width: 100%" v-if="edit">
          <q-input label="Название примечания" v-model="not.name" style="width: 95%; margin-right: 20px"/>
          <q-btn flat rounded icon="add" class="float-right" v-if="person.notes.indexOf(not) == person.notes.length-1" @click="person.notes.push(Object.create(newNote))"></q-btn>
        </div>

        <q-input
          filled
          label="Описание"
          type="textarea"
          v-model="not.text"
          v-if="edit"
        />
      </div>
      <div v-else class="text-subtitle2">
        Отсутствуют
      </div>


      <hr>
      <q-btn class="full-width text-white" :disable="photo == null" @click="save" v-if="edit" style="background-color: #8b2639">Сохранить</q-btn>
      <p class="text-subtitle1" v-if="edit && photo == null">Вставьте фотографию</p>
    </q-card-section>
  </q-card>
</template>

<script>
import { useQuasar, QSpinnerGears } from 'quasar'
import { api } from 'boot/axios'
export default {
  name: "person",
  data: () => ({
    //Просто пушить в персон и не рисовать их заного вифором. Пушить пустной в конец. Ограничивать конец в-ифом. Если то, то то, если нет то нет. Ииии сука убрать первоначальную хуйню она мешает
    //
    // serverIp: api,
    newSocialNetAccs: {
        type: null,
        url: null,
        person: null,
      },
    newHob: {
        person: null,
        name: null,
        comment: null
    },
    newNote: {
        person: null,
        name: null,
        text: null
    },
    person: null,
    idPerson: null,
    close: null,
    photo: false,
    edit: false,
    previewImg: null,
    $q: useQuasar()
  }),
  methods: {
    imgPreview() {
      if (this.photo) {
        const file = this.photo;
        this.previewImg = URL.createObjectURL(file);
      }
    },
    confirm() {
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
        this.idPerson = this.person.id;
        console.log(this.person);
      })
    },
    editing() {
      this.edit = !this.edit;
      this.newSocialNetAccs.person = this.idPerson;
      this.newHob.person = this.idPerson;
      this.newNote.person = this.idPerson;
    },
    deleting() {
      api.delete(`/persons/${this.$route.params.id}`).then((response) => {
        console.log(response);
        location.href = `/persons`;
      })
    },
    save() {
      let dialog = this.$q.dialog({
        progress: true, // we enable default settings
        persistent: true, // we want the user to not be able to close it
        ok: false // we want the user to not be able to close it
      })

      const fullObject = new FormData();
      fullObject.append('dto', JSON.stringify(this.person));
      fullObject.append('photo', this.photo);

      api.put(`/persons`, fullObject).then((response) => {
        console.log(response);
        dialog.hide();
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

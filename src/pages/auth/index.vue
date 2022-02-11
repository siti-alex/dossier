<template>
  <div id="q-app" class="fullscreen">
    <q-layout view="lHh Lpr fff">
      <q-page
        class="window-height window-width row justify-center items-center"
        style="background-color: #f4f3e9;"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width:400px;height:500px;">
              <q-card-section style="background-color: #8B2639">
                <h4 class="text-h5 text-white q-my-md">Авторизация</h4>

              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    ref="email"
                    square
                    v-model="login"
                    type="login"
                    label="Логин">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    ref="password"
                    square
                    v-model="password"
                    :type="passwordFieldType"
                    label="Пароль">

                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer" />
                    </template>
                  </q-input>

                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  outline
                  style="color: #8b2639"
                  @click="submit"
                  class="full-width"
                  label="Вход" />
              </q-card-actions>
            </q-card>
          </div>
        </div>

      </q-page>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: "auth",
  el: '#q-app',
  data() {
    return {
     login: null,
     password: null,
     passwordFieldType: 'password',
     visibility: false,
     visibilityIcon: 'visibility'
    }
  },
  methods: {
    submit () {

    },
    switchVisibility() {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon =  this.visibility ? 'visibility_off' : 'visibility'
    }
  }

}
</script>

<style scoped>

</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #8b2639">
      <q-toolbar>

        <q-toolbar-title>
          Dossier App
        </q-toolbar-title>

        <div>ЛИТ БГПУ</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <div>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img src="~assets/admin.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Администратор</q-item-label>
              <q-item-label caption lines="1">email</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="logout" color="grey" />
            </q-item-section>
          </q-item>
          <hr style="padding: 0px; margin: 0px">

      </div>
      <q-list>
        <q-item-label
          header
        >
          Основные разделы
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Контакты',
    caption: 'Список контактов',
    icon: 'person',
    link: '/persons'
  },
  {
    title: 'Экспорт в PDF',
    caption: 'Экспорт полной информации',
    icon: 'picture_as_pdf',
    link: '/export'
  },
  {
    title: 'Поиск',
    caption: 'Поиск по различной информации',
    icon: 'search',
    link: '/search'
  },
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>
#avatar{
  padding: 20px;
}
#profile {
  height: 125px;
  background-color: #009688;
}
#user-name {
  left: 35%;
  bottom: 45%;
  position: relative;
  width: 160px;
}
</style>

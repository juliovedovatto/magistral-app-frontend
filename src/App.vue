<template>
  <b-container fluid id="app">
    <b-row tag="header" no-gutters>
      <b-col >
        <Menu />
      </b-col>
    </b-row>
    <b-row tag="main" no-gutters>
      <b-container>
        <router-view/>
      </b-container>
    </b-row>
    <b-row tag="footer" no-gutters>
      <b-col class="text-right">
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Menu from '@/components/Menu.vue'

@Component({
  components: {
    Menu
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">
#app {
  &.container-fluid {
    padding: 0;
  }

  > header {
    .navbar {
      background-color: theme-color('primary');

      &.navbar-default {
        .navbar-brand {
          color: #fff;
          padding-right: 50px;
          position: relative;

          &:after {
            content: '';
            border-right: 1px solid;
            opacity: 0.3;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 60%;
          }
        }
        .navbar-nav {
          .nav-item {
            .nav-link {
              color: theme-color('light');
              text-decoration: underline;
              text-underline-position: under;

              &:hover, &:active {
                color: #fff;
              }
            }
            &.user-menu {
              .nav-link {
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
  > main {
    padding: 20px 0;
  }
  > footer {

  }
}
</style>

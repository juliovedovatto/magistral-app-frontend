import { Payload, Plugin } from 'vuex'

import CookieAttributes from '@/types/CookieAttributes'
import Cookies from 'js-cookie'
import StoreState from '@/types/StoreState'
import VuexPersist from 'vuex-persist'

const vuexCookie = new VuexPersist<StoreState>({
  key: 'state',
  restoreState: (key: string) => Cookies.getJSON(key),
  saveState: (key, state) => {
    const CookieAttributes: CookieAttributes = {
      SameSite: 'Strict',
      HttpOnly: true
    }

    Cookies.set(key, state, CookieAttributes)
  }
})

const Plugins: Plugin<StoreState>[] = [
  vuexCookie.plugin
]

export default Plugins

<template>
  <aside :class="{ 'has-navbar-showing': navbarShowing }" class="filter">
    <div class="field">
      <p class="control has-icons-left">
        <input
          v-model="searchValue"
          @input="onSearchInput"
          type="text"
          class="input is-rounded"
          placeholder="Busca"
        />
        <span class="icon is-small is-left">
          <b-icon icon="magnify" />
        </span>
      </p>
    </div>
    <div class="menu">
      <p class="menu-label">
        Formato
      </p>
      <ul class="menu-list">
        <li v-for="t in types" :key="t">
          <a @click="changeType(t)" :class="{ 'is-active': type === t }">
            {{ t | serie_type }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  data() {
    return {
      searchValue: '',
      type: 'ALL',
      types: [
        'ALL',
        'MANGA',
        'MANHWA',
        'MANHUA',
        'MANFRA',
        'NATIONAL',
        'LIGHT_NOVEL',
        'NOVEL',
        'COMIC'
      ]
    }
  },
  computed: mapState({ navbarShowing: (state) => state.navbar.showing }),
  methods: {
    changeType(type) {
      this.type = type
      this.emitSearch('TYPE_CHANGED')
    },
    emitSearch(type = 'SEARCH_CHANGED') {
      this.$emit('filter', {
        search: this.searchValue,
        type: this.type,
        method: type
      })
    },
    onSearchInput() {
      debounce(this.emitSearch, 500)()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  position: sticky;
  top: 50px;
  height: fit-content;
  transition: top 0.5s ease 0s;

  &.has-navbar-showing {
    top: 100px;
  }
}

.menu {
  margin-top: 1.25rem;

  .menu-list {
    font-size: 0.9rem;

    a.is-active {
      font-weight: 500;
    }
  }
}
</style>

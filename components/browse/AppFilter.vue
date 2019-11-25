<template>
  <aside
    :class="{ 'has-navbar-showing': navbarShowing, 'is-showing': showFilters }"
    class="filter"
  >
    <div class="field is-grouped">
      <p class="control has-icons-left is-expanded search-input">
        <input
          v-model="searchValue"
          @input="onSearchInput"
          type="text"
          class="input"
          placeholder="Busca"
        />
        <span class="icon is-small is-left">
          <b-icon icon="magnify" />
        </span>
      </p>
      <p class="control filter-button">
        <button @click="toggleFilter" class="button">
          <span class="icon is-small">
            <b-icon icon="filter-variant" />
          </span>
        </button>
      </p>
    </div>
    <div class="filters">
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
      ],
      showFilters: false
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
    },
    toggleFilter() {
      this.showFilters = !this.showFilters
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

  @include touch {
    position: unset;
    top: 0;
  }

  &.has-navbar-showing {
    top: 100px;

    @include touch {
      top: 0;
    }
  }

  &.is-showing .filters {
    display: block;
  }

  .filters {
    display: none;

    @include desktop {
      display: block;
    }
  }
}

.filter-button {
  @include desktop {
    display: none;
  }
}

.search-input {
  @include desktop {
    margin-right: 0 !important;
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

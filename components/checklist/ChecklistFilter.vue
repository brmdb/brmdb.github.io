<template>
  <aside
    :class="{ 'has-navbar-showing': navbarShowing, 'is-showing': showFilters }"
    class="filter"
  >
    <div class="field is-grouped">
      <div class="control is-expanded checklist-input">
        <div class="select is-fullwidth">
          <select
            v-model="checklist"
            @change="changeChecklist"
            name="checklist"
          >
            <option
              v-for="check in availableChecklists"
              :key="check"
              :value="check"
            >
              {{ beautifyDate(check) }}
            </option>
          </select>
        </div>
      </div>
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
          Editora
        </p>
        <ul class="menu-list">
          <li v-for="(p, i) in publishers" :key="i">
            <a
              @click="changePublisher(i)"
              :class="{ 'is-active': publisher === i }"
            >
              {{ p }}
            </a>
          </li>
        </ul>
      </div>
      <div class="menu">
        <p class="menu-label">
          Selo
        </p>
        <ul class="menu-list">
          <li>
            <a @click="changeLabel(0)" :class="{ 'is-active': label === 0 }">
              Todos
            </a>
          </li>
          <li v-for="(l, i) in labelsToShow" :key="i + 1">
            <a
              @click="changeLabel(i + 1)"
              :class="{ 'is-active': label === i + 1 }"
            >
              {{ l }}
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
  props: {
    availableChecklists: {
      type: Array,
      required: true
    },
    mostRecent: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      checklist: '',
      checklistShowing: [],
      publisher: 0,
      publishers: [],
      label: 0,
      showFilters: false
    }
  },
  computed: {
    labelsToShow() {
      if (!this.checklistShowing[this.publisher]) return []
      return this.checklistShowing[this.publisher].checklist.map(
        (c) => c.label.name
      )
    },
    ...mapState({ navbarShowing: (state) => state.navbar.showing })
  },
  mounted() {
    const length = this.availableChecklists.length
    this.checklist = this.availableChecklists[length - 1]
    for (const m of this.mostRecent) {
      this.publishers.push(m.publisher.name)
      this.checklistShowing.push(m)
    }
  },
  methods: {
    beautifyDate(date) {
      const [year, month] = date.split('-').map((v) => parseInt(v))
      const dateObj = new Date(year, month - 1, 1)
      const asStr = dateObj.toLocaleString('pt-BR', {
        year: 'numeric',
        month: 'long'
      })
      return asStr[0].toUpperCase() + asStr.slice(1)
    },
    async changeChecklist() {
      this.$emit('loading', true)
      try {
        const newChecklist = await this.$axios.$get(
          `checklists/${this.checklist}.json`
        )
        this.checklistShowing = []
        this.publishers = []
        for (const c of newChecklist) {
          this.checklistShowing.push(c)
          this.publishers.push(c.publisher.name)
        }
        this.publisher = 0
        this.label = 0
        this.$emit('loading', false)
        this.emitSearch()
      } catch (e) {
        this.$nuxt.error({
          statusCode: 500,
          message: 'Houve um erro ao processar a solicitação'
        })
      }
    },
    changePublisher(i) {
      this.publisher = i
      this.label = 0
      this.emitSearch('PUBLISHER_CHANGED')
    },
    changeLabel(i) {
      this.label = i
      this.emitSearch('LABEL_CHANGED')
    },
    emitSearch(type = 'CHECKLIST_CHANGED') {
      const checklistToShow =
        this.label === 0
          ? this.checklistShowing[this.publisher].checklist
          : [this.checklistShowing[this.publisher].checklist[this.label - 1]]

      this.$emit('filter', {
        checklistToShow,
        publisher: this.publisher,
        label: this.label,
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

.checklist-input {
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

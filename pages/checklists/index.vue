<template>
  <section class="section">
    <div class="container checklist-page">
      <checklist-filter
        :available-checklists="allChecklists"
        :most-recent="mostRecent"
        @filter="onFilterChanged"
        @loading="onLoading"
      />
      <div class="checklists">
        <div
          v-for="check in checklistsShowing"
          :key="check.id"
          class="checklist"
        >
          <h2 v-if="checklistsShowing.length > 1" class="checklist-label-name">
            {{ check.label.name }}
          </h2>
          <volume-card
            v-for="item in check.items"
            :key="item.id"
            :volume="item.volume"
            class="has-shadow"
            show-serie-title
          />
        </div>
      </div>
      <b-loading :active="isLoading" />
    </div>
  </section>
</template>

<script>
import ChecklistFilter from '~/components/checklist/ChecklistFilter'
import VolumeCard from '~/components/volume/VolumeCard'

export default {
  components: { ChecklistFilter, VolumeCard },
  data() {
    return {
      checklistsShowing: [],
      isLoading: false
    }
  },
  async asyncData({ $axios, params, error, store }) {
    try {
      const date = new Date()
      const month =
        (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1).toString()
      const actual = `${date.getFullYear()}-${month}`

      const allChecklists = await $axios.$get('checklists/list.json')
      const mostRecent = allChecklists.includes(actual)
        ? actual
        : allChecklists[allChecklists.length - 1]

      return {
        allChecklists,
        mostRecent: await $axios.$get(`checklists/${mostRecent}.json`)
      }
    } catch (e) {
      store.commit('navbar/SET_TRANSPARENT', false)
      store.commit('navbar/SET_FIXED', false)
      error({
        statusCode: 500,
        message: 'Houve um erro ao se comunicar com o servidor'
      })
    }
  },
  mounted() {
    this.$store.commit('navbar/SET_FIXED', true)
    this.mostRecent[0].checklist.forEach((c) => this.checklistsShowing.push(c))
  },
  methods: {
    onFilterChanged({ checklistToShow }) {
      this.checklistsShowing = []
      checklistToShow.forEach((c) => this.checklistsShowing.push(c))
    },
    onLoading(loading) {
      this.isLoading = loading
    }
  },
  meta: {
    navbar: {
      color: 'is-primary',
      transparent: false,
      spaced: false
    }
  }
}
</script>

<style lang="scss" scoped>
.checklist-page {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: min-content min-content;
  grid-column-gap: 40px;
  padding-top: 50px;

  @include touch {
    display: block;
  }
}

.checklist {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.75rem;
  padding-bottom: 1.75rem;

  &:last-child {
    padding-bottom: 0;
  }

  @include touch {
    width: 100%;
    grid-template-columns: 1fr;
    padding-top: 2rem;
  }

  .checklist-label-name {
    font-weight: 500;
    font-size: 1.15rem;
    grid-column: span 3;
    grid-row: 1;

    @include touch {
      grid-column: 1;
    }
  }
}
</style>

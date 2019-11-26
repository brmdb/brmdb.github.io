<template>
  <div class="index-page">
    <section class="hero is-landing is-medium is-dark">
      <div class="hero-head">
        <app-navbar
          :color="$store.state.navbar.color"
          :spaced="$store.state.navbar.spaced"
          :fixed="$store.state.navbar.fixed"
          :transparent="$store.state.navbar.transparent"
          class="is-index"
        />
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title"><em>Brazilian Manga Database</em></h1>
          <p class="subtitle">
            Informações sobre mangás e derivados lançados no Brasil
          </p>
        </div>
      </div>
    </section>
    <section class="hero is-light is-divided">
      <div class="hero-body is-props-1">
        <div class="container">
          <div class="left-side">
            <h2 class="title is-4">
              Explore seus mangás favoritos
            </h2>
            <p class="subtitle is-6">
              Também encontre derivados como <em>light novels</em>.
            </p>
          </div>
          <div class="right-side">
            <div class="cards-container">
              <serie-poster-card
                v-for="s in lastFiveRecent"
                :key="s.id"
                :serie="s"
                class="is-full-height"
              />
              <!-- <volume-card
                :volume="serie.editions[0].volumes[0]"
                class="has-shadow"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-light is-divided">
      <div class="hero-body is-props-2">
        <div class="container">
          <div class="left-side">
            <div class="cards-container">
              <volume-card
                v-for="v in volumes"
                :key="v.id"
                :volume="v"
                class="has-shadow"
                show-serie-title
              />
            </div>
          </div>
          <div class="right-side">
            <h2 class="title is-4">
              Se informe sobre os volumes
            </h2>
            <p class="subtitle is-6">
              Saiba a data de lançamento e se houve aumento dos preços.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-light">
      <div class="hero-body is-props-3">
        <div class="container has-text-centered">
          <h2 class="title is-4">
            Consulte o banco de dados!
          </h2>
          <nuxt-link to="/browse" class="button is-primary is-medium">
            Explorar
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppNavbar from '~/components/AppNavbar'
import SeriePosterCard from '~/components/serie/SeriePosterCard'
import VolumeCard from '~/components/volume/VolumeCard'

export default {
  components: { AppNavbar, SeriePosterCard, VolumeCard },
  computed: {
    lastFiveRecent() {
      return this.recent.slice(0, 5)
    },
    volumes() {
      return this.serie.editions[0].volumes
        .slice(0, 2)
        .map((v) => ({ ...v, edition: { serie: { title: this.serie.title } } }))
    }
  },
  async asyncData({ $axios, error }) {
    try {
      return {
        recent: await $axios.$get('series/recent.json'),
        serie: await $axios.$get(
          'series/slug/wotakoi-o-amor-e-dificil-para-otakus.json'
        )
      }
    } catch (e) {
      error({
        statusCode: 500,
        message: 'Houve um erro ao se comunicar com o servidor'
      })
    }
  },
  mounted() {
    this.$store.commit('navbar/SET_FIXED', true)
  },
  meta: {
    navbar: {
      color: 'is-transparent',
      transparent: false,
      spaced: false
    }
  }
}
</script>

<style lang="scss" scoped>
footer.footer {
  background-color: darken($dark, 5%);
}

.hero.is-landing {
  background: linear-gradient(
      180deg,
      rgba($black, 0.9),
      rgba($dark, 0.4) 30%,
      rgba($dark, 0.5) 70%,
      rgba($black, 0.5)
    ),
    url('~assets/default_banner.jpg') center center / cover;
  color: rgba($white, 0.4);

  .hero-body {
    padding-top: 12rem;
    padding-bottom: 12rem;

    @include touch {
      padding-top: calc(5rem + 50px);
      padding-bottom: 5rem;

      .title {
        font-size: 1.65rem;
      }
    }
  }
}

.hero.is-divided .hero-body {
  .container {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-items: center;

    @include touch {
      grid-template-columns: 1fr;
    }
  }

  &.is-props-1 {
    .left-side {
      justify-self: start;
    }

    .right-side {
      .cards-container {
        display: inline-grid;
        grid-template-columns: repeat(3, 210px);
        grid-template-rows: 300px;
        grid-gap: 1.75rem;
        align-items: center;

        @include desktop {
          .volume-poster-card:nth-child(n + 4) {
            display: none;
          }
        }
      }
    }

    @include touch {
      padding-right: 0;
      padding-left: 0;

      .left-side {
        width: 100%;
        padding-right: 1.5rem;
        padding-left: 1.5rem;
        padding-bottom: 2rem;
      }

      .right-side {
        width: 100%;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;

        .cards-container {
          display: inline-flex;
          padding-right: 1.5rem;
          padding-left: 1.5rem;

          .volume-poster-card {
            width: 210px;
            height: 300px;
            margin-right: 1.5rem;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }

  &.is-props-2 {
    .left-side {
      .cards-container {
        display: inline-grid;
        grid-template-columns: 280px 280px;
        grid-gap: 1.75rem;
        align-items: center;
      }
    }

    @include touch {
      padding-right: 0;
      padding-left: 0;

      .right-side {
        width: 100%;
        grid-row: 1;
        padding-right: 1.5rem;
        padding-left: 1.5rem;
        padding-bottom: 2rem;
      }

      .left-side {
        width: 100%;
        grid-row: 2;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;

        .cards-container {
          display: inline-flex;
          padding-right: 1.5rem;
          padding-left: 1.5rem;

          .volume-card {
            /* width: 210px;
            height: 300px; */
            margin-right: 1.5rem;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>

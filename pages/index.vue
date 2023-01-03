<template>
  <div ref="scrollContainer" class="main">
    <div class="list-wrapper">
      <div class="list-header">
        <NuxtLogo />
        <h2 class="list-header__text">GitHub Vue.js repositories sorted by starts count:</h2>
      </div>
      <p v-if="errorMessage" class="error-message">{{errorMessage}}</p>
      <ol v-else class="list-wrapper__list list">
        <li v-for="(repo, index) of repos" :key="index" class="list-item">
          <a
            class="list-item__link"
            :href="repo.html_url"
            target="_blank"
            :title="repo.description"
          >
            {{ repo.name }}
          </a>
          <p class="list-item__postfix">{{ repo.stargazers_count }} Stars</p>
        </li>
      </ol>
      <div v-if="!allDataFetched" class="actions-wrapper">
        <div v-if="loading" class="actions-wrapper__loading loading-wrapper">
            <Spinner />
          </div>
        <button
          v-else
          class="actions-wrapper__btn btn--fetch observable"
          @click="fetchData">
          Load More
        </button>
        <div ref="observer" class="observer-trigger"></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'intersection-observer'

export default {
  async asyncData({store}) {
    await store.dispatch('fetchData')
  },
  data() {
    return {
      observer: null,
  }},
  computed: {
    repos() {
      return this.$store.getters.repos
    },
    loading() {
      return this.$store.getters.loading
    },
    allDataFetched() {
      return this.$store.getters.allDataFetched
    },
    errorMessage() {
      return this.$store.getters.errorMessage
    },
  },
  mounted() {
    this.setupInfiniteScroll()
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    fetchData() {
        this.$store.dispatch('fetchData')
    },
    setupInfiniteScroll() {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (this.repos.length > 0) {
            this.fetchData()
          }
        }
      })
      this.observer.observe(this.$refs.observer)
    }
  },
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;

}
  .list-wrapper {
    width: 75%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #F4A261;
  }
  .loading-wrapper {
    display: flex;
    justify-content: center;
  }
  .list-header {
    display: flex;
    flex-direction: column;
    margin: 15px auto 0;
  }
  .list-item {
    font-size: 18px;
    margin-bottom: 8px;
    padding-left: 8px;
  }
  .list-item:nth-child(2n) {
    background-color: #2A9D8F;
  }
  .list-item__postfix {
    display: inline-block;
  }
  .list-item__link {
    color: #E9C46A;
    font-family: helvetica;
    text-decoration: none;
    text-transform: uppercase;
  }
  .list-item__link:hover {
    text-decoration: underline;
  }
  .list-item__link:active, .list-item__link:visited {
    color: #E9C46A;
  }

  .actions-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .actions-wrapper__btn {
    background-color: #F4A261;
    color: #264653;
    padding: 15px;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 8px;
    border-width: 0px;
    font-size: 18px;
    margin-bottom: 50px;
    width: 50%;
  }
  .actions-wrapper__btn:hover {
    background-color: #f28c38;
    border-color: #E9C46A;
    border-width: 5px;
    border-style: double;
    padding: 10px;
  }

  .observer-trigger {
    height: 15px;
  }
</style>
<style>
  body {
    margin: 0;
    background-color: #264653;
  }
</style>

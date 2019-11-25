import Vue from 'vue'

const typeMapping = {
  ALL: 'Qualquer',
  MANGA: 'Mangá',
  MANHWA: 'Manhwa',
  MANHUA: 'Manhua',
  MANFRA: 'Manfrá',
  NATIONAL: 'Nacional',
  LIGHT_NOVEL: 'Light novel',
  NOVEL: 'Novel',
  COMIC: 'Comic'
}

const statusMapping = {
  FINISHED: 'Finalizado',
  PUBLISHING: 'Em publicação',
  HIATUS: 'Em hiato'
}

const genresMapping = {
  ACTION: 'Ação',
  ADVENTURE: 'Aventura',
  CARS: 'Carros',
  COMEDY: 'Comédia',
  DEMENTIA: 'Demencia',
  DEMONS: 'Demônios',
  DRAMA: 'Drama',
  ECCHI: 'Ecchi',
  FANTASY: 'Fantasia',
  GAME: 'Jogo',
  GENDER_BENDER: 'Gender Bender',
  HAREM: 'Harém',
  HISTORICAL: 'Histórico',
  HORROR: 'Horror',
  MAGIC: 'Magia',
  MARTIAL_ARTS: 'Artes Marciais',
  MECHA: 'Mecha',
  MILITARY: 'Militar',
  MUSIC: 'Música',
  MYSTERY: 'Mistério',
  PARODY: 'Paródia',
  POLICE: 'Policial',
  PSYCHOLOGICAL: 'Psicológico',
  ROMANCE: 'Romance',
  SAMURAI: 'Samurai',
  SCHOOL: 'Escolar',
  SCI_FI: 'Sci-Fi',
  SLICE_OF_LIFE: 'Estilo de Vida',
  SPACE: 'Espacial',
  SPORTS: 'Esportes',
  SUPER_POWER: 'Super Poderes',
  SUPERNATURAL: 'Sobrenatural',
  THRILLER: 'Thriller',
  VAMPIRE: 'Vampiro'
}

Vue.filter('serie_type', (val) => typeMapping[val] || val)
Vue.filter('serie_status', (val) => statusMapping[val] || val)
Vue.filter(
  'serie_demografy',
  (val) =>
    val[0] +
    val
      .slice(1)
      .replace('_', ' ')
      .toLowerCase()
)
Vue.filter('serie_genres', (val) =>
  val
    .map((g) => genresMapping[g] || g)
    .sort()
    .join(', ')
)

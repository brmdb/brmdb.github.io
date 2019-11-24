<template>
  <footer class="footer">
    <p>Copyright &copy; {{ new Date().getFullYear() }} BrMDb Project.</p>
    <p class="disclaimer">
      Todas as informações foram retiradas de sites especializados ou dos
      próprios sites das editoras. <br />
      Os direitos das obras e seus conteúdos são reservados as editoras e aos
      seus licenciantes.
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 2em;
  text-align: center;
  font-size: 0.9rem;

  p.disclaimer {
    padding-top: 1rem;
    font-size: 0.825rem;
  }
}
</style>

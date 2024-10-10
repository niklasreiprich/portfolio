<template>
    <SimilarProjects class="SimilarProjects">
      <div class="SimilarProjects">
        <h2 style="margin-bottom: 0.5rem;">Ähnliche Projekte</h2>
        <div class="Projekte">
          <div>
            <img src="/Urwald/Urwald1.jpg">
            <h3>Urwald Saarbrücken</h3>
          </div>
          <div>
            <img src="/Urwald/Urwald1.jpg">
            <h3>Urwald Saarbrücken</h3>
          </div>
          <div>
            <img src="/Urwald/Urwald1.jpg">
            <h3>Urwald Saarbrücken</h3>
          </div>
          <div>
            <img src="/Urwald/Urwald1.jpg">
            <h3>Urwald Saarbrücken</h3>
          </div>
          <div>
            <img src="/Urwald/Urwald1.jpg">
            <h3>Urwald Saarbrücken</h3>
          </div>
        </div>
      </div>
    </SimilarProjects>
  </template>
  
  <script>
  export default {
    name: 'SimilarProjects'
  }
  </script>
  
  <style scoped>


  .SimilarProjects{

    padding: var(--padding-gap);
    
  }

  .Projekte{
    gap: var(--padding-gap);
    display: grid;
    grid-template-columns: repeat(20, 30vw);

  }

  img{
    width: 100%;
  }

  </style>
  
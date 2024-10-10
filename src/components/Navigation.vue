<template>
    <nav>
        <router-link to="/"><div>Niklas Reiprich</div></router-link>
        <div class="navigation-center">
            <router-link to="/projects"><div style="text-align: right;">Work</div></router-link>
            <router-link to="/playground"><div>Playground</div></router-link>
        </div>
        <router-link to="/info"><div style="text-align: right;">Info</div></router-link>
    </nav>
</template>
  
<style scoped>
nav{
    width: 100vw;
    display: grid;
    position: sticky;
    position: -webkit-sticky; /* Safari */
    color: white;
    top: 0;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0rem;
    z-index: 1000;
    mix-blend-mode: difference;
}

.navigation-center{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

</style>
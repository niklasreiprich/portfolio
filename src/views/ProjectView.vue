<template>
  <div class="Close"></div>
  <div class="Start" style="background-image: url('/Urwald (9).jpg');">
    <h1 class="Title">Urwald Saarbrücken</h1>
    <h1 class="Title">2020/21</h1>
  </div>
  <div class="ImageGrid">
    <div class="InfoText">Im Rahmen eines Studienprojekts habe ich Naturfunde aus dem sogenannten "Urwald vor den Toren der Stadt" im Norden von Saarbrücken in Diarahmen fixiert und als Teil einer ästhetischen Recherche nachts auf die Stadt projiziert, teilweise auch aus einem fahrenden Zug. Die Ergebnisse offenbaren ansonsten kaum wahrgenommene, fast mikroskopisch kleine feine Strukturen in metergroßem Maßstab auf den kahlen, leblosen Oberflächen der Stadt.</div>
    <div class="InfoList">Intervention im öffentlichen Raum<br>Saarbrücken<br>Eigenauftrag</div>
    <img src="/Urwald (7).jpg" class="ProjectImage lImg"> 
    <img src="/Urwald (5).jpg" class="ProjectImage sImg"> 
    <img src="/Urwald (4).jpg" class="ProjectImage sImg"> 
    <img src="/Urwald (2).jpg" class="ProjectImage xImg"> 
    <img src="/Urwald (8).jpg" class="ProjectImage xImg"> 
    <img src="/Urwald (3).jpg" class="ProjectImage mImg"> 
    <img src="/Urwald (6).jpg" class="ProjectImage mImg"> 
    <img src="/Urwald (1).jpg" class="ProjectImage xImg"> 

  </div>
</template>

<style>

.Close{
  background-image: url('close.svg');
  background-position: center;
  background-size: contain;
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: var(--padding-gap);
  left: var(--padding-gap);
  margin: calc(var(--padding-gap) / 2);
  opacity: 0.7;
  z-index: 1000;
  transition: all ease 0.5s;
}
.Close:hover{
  scale: 1.2;
  cursor: pointer;
  opacity: 1;
}

.sImg{
  grid-column: span 4;
}

.mImg{
  grid-column: span 6;
}

.lImg{
  grid-column: span 8;
  grid-row: span 2;
}

.xImg{
  grid-column: span 12;
}

.Start{
  width: 100vw;
  height: 100vh;
  padding: var(--padding-gap);
  background-color: green;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.Title{
  color: white;
  text-shadow: 0px 0px 20px black;
  margin-bottom: -0.2em;
  /* font-family: sans-serif; */
}


.ImageGrid{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--padding-gap);
  padding: var(--padding-gap);

}

.ProjectImage{
  width: 100%;
  height: 100%;
}

.InfoText{
  grid-column: 1 / 9;
  padding-right: 1rem;
  font-family: "Januar";
  letter-spacing: 0.01em;
  line-height: 1.15;
}

.InfoList{
  grid-column: 9 / 13;
  font-family: "Monospace";
  font-size: 0.666rem;
}

.InfoList, .InfoText{
  padding-bottom: 1rem;

}




@media (min-width: 600px) and (max-width: 1024px) {
  /* Your CSS styles for tablets */


.sImg{
  grid-column: span 6;
}

.mImg{
  grid-column: span 6;
}

.lImg{
  grid-column: span 12;
  grid-row: span 1;
}


}


@media (max-width: 599px) {
  /* Your CSS styles for phones */

  .sImg{
    grid-column: span 12;
  }

  .mImg{
    grid-column: span 12;
  }

  .lImg{
  grid-column: span 12;
  grid-row: span 1;
  }
  .InfoText{
  grid-column: 1/13;
  }
  .InfoList{
  grid-column: 1/13;
  }

  .Start{
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: flex-start;
  }
}


</style>

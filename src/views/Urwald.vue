<template>
    <Layout
      headerTitle="Urwald Saarbrücken"
      headerSubtitle="2020/21"
      headerBackgroundImage="/Urwald (9).jpg"
      infoText="Im Rahmen eines Studienprojekts habe ich Naturfunde aus dem sogenannten 'Urwald vor den Toren der Stadt' im Norden von Saarbrücken in Diarahmen fixiert und als Teil einer ästhetischen Recherche nachts auf die Stadt projiziert, teilweise auch aus einem fahrenden Zug. Die Ergebnisse offenbaren ansonsten kaum wahrgenommene, fast mikroskopisch kleine feine Strukturen in metergroßem Maßstab auf den kahlen, leblosen Oberflächen der Stadt."
      infoList="Intervention im öffentlichen Raum<br>Saarbrücken<br>Eigenauftrag"
      :images="[
        { src: '/Urwald (7).jpg', class: 'lImg' },
        { src: '/Urwald (5).jpg', class: 'sImg' },
        { src: '/Urwald (4).jpg', class: 'sImg' },
        { src: '/Urwald (2).jpg', class: 'xImg' },
        { src: '/Urwald (8).jpg', class: 'xImg' },
        { src: '/Urwald (3).jpg', class: 'mImg' },
        { src: '/Urwald (6).jpg', class: 'mImg' },
        { src: '/Urwald (1).jpg', class: 'xImg' }
      ]"
    />
  </template>
  
  <script>
  import Layout from '../components/Layout.vue'
  
  export default {
    name: 'Home',
    components: {
      Layout
    }
  }
  </script>
  
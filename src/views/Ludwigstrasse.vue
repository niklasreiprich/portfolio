<template>
    <Layout
      headerTitle="Plakate für die Ludwigstrasse60"
      headerSubtitle="2020/21"
      headerBackgroundImage="/Ludwigstrasse/Ludwigstrasse1.jpg"
      infoText="In den letzten 2 Jahren meines Bachelorstudiums engagiere ich mich stark bei dem studentischen Projektraum Ludwigstrasse60. Dabei gestalte ich zusammen mit anderen Studierenden regelmäßig Plakate für Ausstellungen und Veranstaltungen. Wir haben uns für den Raum bewusst gegen ein umfassendes Corporate Design entschieden, da wir uns als noch Studierende bei jedem Poster maximal kreativ ausprobieren wollen. Auf den folgenden Seiten ich zeige Plakate, bei denen ich maßgeblich mitgewirkt habe. Außerdem war ich stark in der Organisation des Raumes involviert."
      infoList="Grafikdesign<br>Ludwigstrasse60"
      :images="[
        { src: '/Ludwigstrasse/Ludwigstrasse (7).jpg', class: 'lImg' },
        { src: '/Ludwigstrasse/Ludwigstrasse (4).jpg', class: 'sImg' },
        { src: '/Ludwigstrasse/Ludwigstrasse (3).jpg', class: 'sImg' },
        { src: '/Ludwigstrasse/Ludwigstrasse (5).jpg', class: 'xImg' },
        { src: '/Ludwigstrasse/Ludwigstrasse (8).jpg', class: 'xImg' },
        { src: '/Ludwigstrasse/Ludwigstrasse (9).jpg', class: 'mImg' },
        { src: '/Ludwigstrasse/Ludwigstrasse (6).jpg', class: 'mImg' },
        { src: '/Ludwigstrasse/Ludwigstrasse (2).jpg', class: 'xImg' }
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
  
// projects.js
import { defineStore } from "pinia";
export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [
      {
        id: 0,
        title: "Plakate für die Ludwigstrasse 60",
        tags: "Plakatgestaltung",
        year: "2021-23",
        text: "In the last two years of my bachelor studies, I have been involved with the student project space Ludwigstrasse60. In this role, I collaborate with other students to create posters for exhibitions and events on a regular basis. We intentionally opted not to adopt a comprehensive corporate design, as we, as students, want to push our creativity to the maximum for each poster. On the following pages, I showcase posters in which I have been significantly involved. In addition, for the past six months, I have been increasingly dedicated to space organization and am now employed as a student assistant (Hiwi) for this purpose.",
        route: "Ludwigstrasse",
        color: "#014a97",
        previewImage: "Ludwigstrasse1.jpg",
        images: [
          "Ludwigstrasse1.jpg",
          "Ludwigstrasse (2).jpg",
          "Ludwigstrasse (3).jpg",
          "Ludwigstrasse (4).jpg",
          "Ludwigstrasse (5).jpg",
          "Ludwigstrasse (6).jpg",
          "Ludwigstrasse (7).jpg",
          "Ludwigstrasse (8).jpg",
          "Ludwigstrasse (9).jpg"
        ],
        category: ["Plakatgestaltung", "Branding"]
      },
      {
        id: 1,
        title: "Urwald Saarbrücken",
        tags: "Experimentelle Installation",
        year: "2020",
        text: "In a study project, I framed natural findings from the so-called Urwald Saarbrücken in the north of Saarbrücken and projected them onto the city as part of an aesthetic exploration at night, sometimes even from a moving train. The results reveal nearly imperceptible, almost microscopic delicate structures, magnified to the scale of meters, on the barren, lifeless surfaces of the city.",
        route: "Urwald",
        previewImage: "Urwald1.jpg",
        color: "black",

        category: ["Freie Arbeit"],
        images: [
          "Urwald1.jpg",
          "Urwald2.jpg",
          "Urwald3.jpg",
          "Urwald4.jpg",
          "Urwald5.jpg",
          "Urwald6.jpg",
          "Urwald7.jpg",
          "Urwald8.jpg",
          "Urwald9.jpg"
        ]
      },
      {
        id: 2,
        title: "Fressen",
        tags: "Plakatgestaltung und Branding",
        year: "2023",
        text: "For the exhibition Fressen by Gabriele Langendorf, featuring paintings of food items, I designed the exhibition poster. To do this, I deconstructed the paintings, enlarged and digitally reproduced them. Additionally, I introduced a communicative element by screen-printing a bold typographic design in white. This creates a strong contrast between text and image, enhancing the visual and conceptual impact of the artwork.",
        route: "Fressen",
        previewImage: "Fressen2.jpg",
        color: "#f84127",

        category: ["Plakatgestaltung", "Branding"],
        images: [
          "Fressen1.jpg",
          "Fressen2.jpg",
          "Fressen3.jpg",
          "Fressen4.jpg",
          "Fressen5.jpg",
          "Fressen6.jpg",
          "Fressen7.jpg",
          "Fressen8.jpg",
          "Fressen9.jpg"
        ]
      },
      {
        id: 3,
        title: "Website für die Arrival Room Galerie",
        tags: "Webdesign",
        year: "2022",
        text: "I have designed and implemented a new website (arrivalroom.de) for the Arrival Room Gallery. For this project, I simplified the old complex logo featuring heads, repurposing it as a background for the homepage. The heads derived from the logo move freely and respond to mouse movements. As the gallery promotes engagement with individuals with a migration background, I also ensured that the website is consistently bilingual.",
        route: "ArrivalRoom",
        previewImage: "ArrivalRoom3.jpg",
        color: "#014a97",

        category: ["Webdesign"],
        images: [
          "ArrivalRoom3.jpg",
          "ArrivalRoom4.jpg",

          "ArrivalRoom2.jpg",
          "ArrivalRoom5.jpg",

          "ArrivalRoom1.jpg"
        ]
      },
      {
        id: 4,
        title: "Saarbrücker Pfostenkultur",
        tags: "Experimentelle Archivierung",
        year: "2021",
        text: "As part of a study project on identity, I delved into the sticker culture in Saarbrücken. During that time, the mayor framed stickers as a supposed main issue of the city and called for their removal on World Cleanup Day. To counter this framing and document the diverse sticker culture in Saarbrücken, I captured posts along Schumannstraße, where I resided, using 3D scans. These works were intended to be presented in an exhibition, but the event could not take place publicly due to the pandemic. The generated scans depict the entire range of stickers along Schumannstraße, which begins on a bustling multi-lane road and near a vocational school, ending in a peaceful row house settlement.",
        route: "Schumannstrasse",
        previewImage: "Schumannstrasse6.jpg",
        category: ["Freie Arbeit"],
        color: "#f4001d",

        images: [
          "Schumannstrasse1.jpg",
          "Schumannstrasse2.jpg",
          "Schumannstrasse3.jpg",
          "Schumannstrasse4.jpg",
          "Schumannstrasse5.jpg",
          "Schumannstrasse6.jpg",
          "Schumannstrasse7.jpg",
          "Schumannstrasse8.jpg",
          "Schumannstrasse9.jpg"
        ]
      },
      {
        id: 5,
        title: "Januar – variable Sansserif",
        tags: "Schriftgestaltung",
        year: "2023",
        text: "To better understand the traditional construction of grotesque typefaces, I designed a variable grotesque typeface myself, with both a width and weight axis. This typeface also serves as a foundation for my future type design projects.",
        route: "Januar",
        previewImage: "Januar3.jpg",
        category: ["Schriftgestaltung", "Plakatgestaltung"],
        color: "#2b8ecf",

        images: [
          "Januar1.jpg",
          "Januar2.jpg",
          "Januar3.jpg",
          "Januar4.jpg",
          "Januar5.jpg",
          "Januar6.jpg"
        ]
      },
      {
        id: 6,
        title: "Diacollage",
        tags: "Ästhetische Recherche",
        year: "2021",
        text: "In an independent project, I overlaid various slide films containing predominantly vacation photos, clamped them in slide frames, and displayed them using a slide projector. The results showcase absurd worlds that, through analog photography, also exude a certain sense of nostalgia.",
        route: "Diacollage",
        previewImage: "Diacollage5.jpg",
        color: "#d30000",

        category: ["Freie Arbeit"],
        images: [
          "Diacollage1.jpg",
          "Diacollage2.jpg",
          "Diacollage3.jpg",
          "Diacollage4.jpg",
          "Diacollage5.jpg",
          "Diacollage6.jpg"
        ]
      },
      {
        id: 7,
        title: "Bli – Typographie transfrontaliére",
        tags: "Schriftgestaltung",
        year: "2023",
        text: "In my bachelor project Typographie Transfrontalière, various type styles from the French town of Grosblieders­troff and the neighboring German town of Kleinblittersdorf were brought together in a digital variable typeface. The typeface celebrates the 60th anniversary of the Élysée Treaty (Franco-German Friendship Treaty) by commemorating the convergence of German and French cultures in these two locations. For the typeface, I researched, combined, and interpolated the historical type styles from both towns.",
        route: "Bli",
        previewImage: "Bli2.jpg",
        color: "#e52323",

        category: ["Schriftgestaltung", "Typographie"],
        images: [
          "Bli1.jpg",
          "Bli2.jpg",
          "Bli3.jpg",
          "Bli4.jpg",
          "Bli5.jpg",
          "Bli6.jpg",
          "Bli7.jpg",
          "Bli8.jpg",
          "Bli9.jpg",
          "Bli10.jpg",
          "Bli11.jpg",
        ]
      },
      {
        id: 8,
        title: "Dispersionen",
        tags: "Branding und Plakatgestaltung",
        year: "2023",
        text: "For the Dispersionen exhibition at the HBKsaar gallery, featuring artistic works by students from Munich, I collaborated with M. O'Connor to design a promotional poster. This poster was produced in a limited edition using cut-out holes. Additionally, I worked with B. Edinger to design an easily producible leaflet that explains the individual artworks.",
        route: "Dispersionen",
        previewImage: "Dispersionen3.jpg",
        color: "black",

        category: ["Plakatgestaltung", "Branding", "Typographie"],
        images: [
          "Dispersionen1.jpg",
          "Dispersionen2.jpg",
          "Dispersionen3.jpg",
          "Dispersionen4.jpg",
          "Dispersionen5.jpg",
          "Dispersionen6.jpg"
        ]
      }
    ]
  })
});

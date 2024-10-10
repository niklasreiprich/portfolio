import { defineStore } from "pinia";
export const usePlaygroundStore = defineStore('playground', {
    state: () => ({
        projects: [
            {
                id: 1,
                title: "Das kleine Krabbeln",
                type: "video",
                year: "2020",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "urwald",
                source: "AntScape.mp4",
                width: 30,
                category: ["Animation"]
            },
            {
                id: 15,
                title: "Cloud Data",
                type: "video",
                year: "2021-23",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "ludwigstrasse",
                source: "CloudData.mp4",
                width: 20,
                category: ["Creative Coding", "Kinetic Type"]
            },
            {
                id: 2,
                title: "Time-Scan",
                type: "video",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "fressen",
                source: "TimeScan.mp4",
                width: 25,
                category: ["Creative Coding"]
            },
            {
                id: 3,
                title: "Audio-Reactive Particle Life",
                type: "video",
                year: "2022",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "arrivalroom",
                source: "Particle Life.mp4",
                width: 20,
                category: ["Creative Coding"]
            },
            {
                id: 4,
                title: "Flock of Words",
                type: "video",
                year: "2021",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "pfostenkultur",
                source: "Flock of Words.mp4",
                width: 30,
                category: ["Creative Coding"]
            },
            {
                id: 5,
                title: "Nicht bügeln!",
                type: "video",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "Bügelperlen.mp4",
                width: 20,
                category: ["Animation"]
            },
            {
                id: 6,
                title: "Karma",
                type: "image",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "Karma.gif",
                width: 20,
                category: ["Animation", "Analog"]
            },
            {
                id: 7,
                title: "Antimaterie",
                type: "video",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "antimaterie.mp4",
                width: 18,
                category: ["Animation"]
            },
            {
                id: 8,
                title: "Burning Woods",
                type: "image",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "burning.jpg",
                width: 20,
                category: ["Illustration", "Analog"]
            },
            {
                id: 9,
                title: "Couscous",
                type: "image",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "couscous.jpg",
                width: 25,
                category: ["Illustration"]
            },
            {
                id: 10,
                title: "Saarbahn",
                type: "video",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "Saarbahn.mp4",
                width: 30,
                category: ["Animation", "Illustration"]
            },
            {
                id: 11,
                title: "strasbourg",
                type: "image",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "strasbourg.jpg",
                width: 20,
                category: ["Illustration", "Analog"]
            },
            {
                id: 12,
                title: "Vice versa",
                type: "image",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "vice_versa.png",
                width: 20,
                category: ["Illustration", "3D"]
            },
            {
                id: 13,
                title: "Plastic in progress",
                type: "font",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "Plastic-Regular.otf",
                width: 100,
                category: ["typedesign"]
            },  
            {
                id: 14,
                title: "Diable in progress",
                type: "font",
                year: "2023",
                text: "Lorem Ipsum sadasd sdfsdf sdf erwgeb wrevfdsfvsdfv rfwrfer",
                route: "januar",
                source: "diable-Regular.otf",
                width: 100,
                category: ["typedesign"]
            }
        ]
    })
});

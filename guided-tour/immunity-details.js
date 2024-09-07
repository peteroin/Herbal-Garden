document.addEventListener('DOMContentLoaded', () => {
    // Mock plant data
    const plants = {
        0: {
            name: "Echinacea",
            scientificName: "Echinacea purpurea",
            description: "A North American herb with pink-purple flowers, used to boost the immune system and shorten colds.",
            uses: "Often used to enhance immune function and reduce the duration of colds and infections.",
            region: "Native to North America, particularly the central and eastern United States.",
            type: "Herbaceous perennial.",
            image: "../images/Echinacea.jpg",
            moreImages: "https://example.com/more-images/ginger",
            watchVideo: "https://example.com/videos/ginger",
            additionalInfo: "https://example.com/info/ginger"
        },
        1: {
            name: "Astragalus",
            scientificName: "Astragalus membranaceus",
            description: " A leguminous herb with a long history in Chinese medicine, known for its immune-enhancing roots.",
            uses: "Used in traditional Chinese medicine to strengthen the immune system and improve overall vitality.",
            region: "Native to China, Mongolia, and Korea.",
            type: "Herbaceous perennial.",
            image: "../images/astragalus.jpg",
            moreImages: "https://example.com/more-images/peppermint",
            watchVideo: "https://example.com/videos/peppermint",
            additionalInfo: "https://example.com/info/peppermint"
        },
        2: {
            name: "Turmeric",
            scientificName: "Curcuma longa",
            description: "A tropical rhizome with bright yellow flesh, containing curcumin for its anti-inflammatory benefits.",
            uses: "Contains curcumin, which has anti-inflammatory and antioxidant properties that can help support immune function.",
            region: "Native to Southeast Asia, including India and Indonesia.",
            type: "Herbaceous perennial.",
            image: "../images/turmeric.jpg",
            moreImages: "https://example.com/more-images/echinacea",
            watchVideo: "https://example.com/videos/echinacea",
            additionalInfo: "https://example.com/info/echinacea"
        },
        3: {
            name: "Ginger",
            scientificName: "SZingiber officinale",
            description: "A spicy, aromatic rhizome used for digestive and anti-inflammatory benefits.",
            uses: "Known for its anti-inflammatory and antioxidant properties, ginger helps support the immune system and alleviate digestive issues.",
            region: "Native to Southeast Asia, particularly India and China.",
            type: "Herbaceous perennial.",
            image: "../images/ginger.jpg",
            moreImages: "https://example.com/more-images/elderberry",
            watchVideo: "https://example.com/videos/elderberry",
            additionalInfo: "https://example.com/info/elderberry"
        },
        4: {
            name: "Garlic",
            scientificName: "Allium sativum",
            description: "A bulbous plant known for its strong flavor and health benefits, including antimicrobial properties.",
            uses: "Has antimicrobial and immune-boosting properties, often used to support cardiovascular health and combat infections.",
            region: "Native to Central Asia and northeastern Iran, but now widely cultivated worldwide.",
            type: "Bulbous perennial.",
            image: "../images/garlic.jpg",
            moreImages: "https://example.com/more-images/echinacea",
            watchVideo: "https://example.com/videos/echinacea",
            additionalInfo: "https://example.com/info/echinacea"
        },
        5: {
            name: "Andrographis",
            scientificName: "Andrographis paniculata",
            description: "An herb with green leaves and white flowers, used in traditional medicine for immune support.",
            uses: "Used in traditional medicine to enhance immune response, reduce fever, and treat respiratory infections.",
            region: "Native to South Asian countries, including India, Sri Lanka, and Thailand.",
            type: "Herbaceous annua.",
            image: "../images/Andrographis.jpg",
            moreImages: "https://example.com/more-images/echinacea",
            watchVideo: "https://example.com/videos/echinacea",
            additionalInfo: "https://example.com/info/echinacea"
        },
        6: {
            name: "Elderberry",
            scientificName: "Sambucus nigra",
            description: "A deciduous shrub with dark purple berries, valued for its antioxidant properties.",
            uses: "The berries are used to boost the immune system, alleviate cold and flu symptoms, and reduce inflammation.",
            region: "Native to Europe, but also found in North America.",
            type: "Deciduous shrub or small tree.",
            image: "../images/elderberry.jpg",
            moreImages: "https://example.com/more-images/echinacea",
            watchVideo: "https://example.com/videos/echinacea",
            additionalInfo: "https://example.com/info/echinacea"
        }
 
        // Add more plants here
    };

    const urlParams = new URLSearchParams(window.location.search);
    const plantId = urlParams.get('id');

    if (plants[plantId]) {
        const plant = plants[plantId];
        document.getElementById('plant-name').textContent = plant.name;
        document.getElementById('plant-scientific-name').textContent = `Scientific Name: ${plant.scientificName}`;
        document.getElementById('plant-description').textContent = `Description: ${plant.description}`;
        document.getElementById('plant-uses').textContent = `Uses: ${plant.uses}`;
        document.getElementById('plant-region').textContent = `Region: ${plant.region}`;
        document.getElementById('plant-type').textContent = `Type: ${plant.type}`;
        document.getElementById('plant-image').src = plant.image;
        
        // Set extra links
        document.getElementById('more-images').href = plant.moreImages;
        document.getElementById('watch-video').href = plant.watchVideo;
        document.getElementById('additional-info').href = plant.additionalInfo;
    } else {
        document.querySelector('.plant-detail-container').innerHTML = '<h2>Plant Not Found</h2>';
    }
});


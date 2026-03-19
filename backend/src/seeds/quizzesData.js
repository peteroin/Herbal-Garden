const quizzesData = [
  {
    title: "Herbal Wisdom Challenge",
    slug: "herbal-wisdom-challenge",
    description: "Test your knowledge of common medicinal plants and their uses in AYUSH systems.",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        question: "Which herb is known as the 'Queen of Herbs'?",
        options: ["Neem", "Tulsi", "Ashwagandha", "Amla"],
        correctAnswer: "Tulsi",
        explanation: "Tulsi (Holy Basil) is revered as the Queen of Herbs for its extensive medicinal and spiritual benefits."
      },
      {
        id: "q2",
        question: "Which system of medicine is based on 'Like cures like'?",
        options: ["Ayurveda", "Unani", "Homeopathy", "Siddha"],
        correctAnswer: "Homeopathy",
        explanation: "Homeopathy operates on the principle of Similia Similibus Curantur, meaning substances that cause symptoms in large doses can cure them in small doses."
      },
      {
        id: "q3",
        question: "Which plant is primarily used for heart health in Ayurveda?",
        options: ["Arjuna", "Aloe Vera", "Ginger", "Lavender"],
        correctAnswer: "Arjuna",
        explanation: "The bark of the Terminalia arjuna tree is a primary remedy for strengthening heart muscles and maintaining healthy circulation."
      }
    ],
    order: 1
  },
  {
    title: "AYUSH Systems Basics",
    slug: "ayush-systems-basics",
    description: "Learn about the five major systems of traditional medicine recognized by India.",
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        question: "What does AYUSH stand for?",
        options: ["Ayurveda, Yoga, Unani, Siddha, Homeopathy", "Ancient, Year, Unique, System, Herbs", "Ayurveda, Years, Universal, System, Health", "All, Year, Unity, System, Healing"],
        correctAnswer: "Ayurveda, Yoga, Unani, Siddha, Homeopathy",
        explanation: "AYUSH is an acronym representing five major traditional medicine systems recognized and supported by the Indian government."
      },
      {
        id: "q2",
        question: "Which AYUSH system originated in the Middle East and Arabian Peninsula?",
        options: ["Ayurveda", "Unani", "Siddha", "Sowa-Rigpa"],
        correctAnswer: "Unani",
        explanation: "Unani medicine, based on the teachings of Hippocrates and Galen, originated in the Middle East and developed in the Islamic world."
      },
      {
        id: "q3",
        question: "How many doshas are there in Ayurveda?",
        options: ["2", "3", "4", "5"],
        correctAnswer: "3",
        explanation: "The three doshas are Vata (air/ether), Pitta (fire/water), and Kapha (water/earth)."
      }
    ],
    order: 2
  },
  {
    title: "Immune System Boosters",
    slug: "immune-boosters",
    description: "Test your knowledge about herbs that support immune health.",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        question: "Which herb is known as the 'King of Bitters' and supports liver and immunity?",
        options: ["Turmeric", "Neem", "Ginger", "Garlic"],
        correctAnswer: "Neem",
        explanation: "Neem has been used for centuries in Ayurveda for its powerful detoxifying and immune-enhancing properties."
      },
      {
        id: "q2",
        question: "Vitamin C rich herb used to boost immunity in traditional systems?",
        options: ["Ashwagandha", "Amla", "Brahmi", "Shatavari"],
        correctAnswer: "Amla",
        explanation: "Indian gooseberry (Amla) is one of the richest sources of Vitamin C and is a key immunity boosting herb in Ayurveda."
      },
      {
        id: "q3",
        question: "Which adaptogenic herb helps the body resist stress and illness?",
        options: ["Ginger", "Ashwagandha", "Mint", "Basil"],
        correctAnswer: "Ashwagandha",
        explanation: "Ashwagandha is an adaptogen that helps regulate immune response and manage stress-related illnesses."
      }
    ],
    order: 3
  },
  {
    title: "Digestive Health Quiz",
    slug: "digestive-health",
    description: "Explore herbs and practices that promote digestive wellness.",
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        question: "Which spice aids digestion and is called 'Vishaghna' (poison destroyer) in Ayurveda?",
        options: ["Fenugreek", "Turmeric", "Ginger", "Cumin"],
        correctAnswer: "Turmeric",
        explanation: "Turmeric has powerful anti-inflammatory properties and supports healthy digestion while protecting the GI tract."
      },
      {
        id: "q2",
        question: "What is the main digestive herb used in Ayurvedic 'Triphala' formula?",
        options: ["Neem, Amla, Ginger", "Amla, Haritaki, Vibhitaki", "Turmeric, Ginger, Cumin", "Ashwagandha, Brahmi, Tulsi"],
        correctAnswer: "Amla, Haritaki, Vibhitaki",
        explanation: "Triphala combines three fruits: Amla (Indian gooseberry), Haritaki, and Vibhitaki for balanced digestive support."
      },
      {
        id: "q3",
        question: "Which digestive spice is often taken with warm water after meals?",
        options: ["Fenugreek", "Fennel", "Clove", "Cinnamon"],
        correctAnswer: "Fennel",
        explanation: "Fennel seeds are traditionally chewed or consumed as a tea after meals to promote digestion and fresh breath."
      }
    ],
    order: 4
  }
];

export default quizzesData;

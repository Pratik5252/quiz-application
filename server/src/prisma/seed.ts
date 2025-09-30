import prisma from './prismaClient.js';

const quizes = [
    {
        question: "Which element has the chemical symbol 'Fe'?",
        options: ['Fluorine', 'Iron', 'Francium', 'Fermium'],
        answer: 1,
    },
    {
        question: 'Who developed the theory of general relativity?',
        options: [
            'Isaac Newton',
            'Albert Einstein',
            'Niels Bohr',
            'Galileo Galilei',
        ],
        answer: 1,
    },
    {
        question: 'What is the capital city of Canada?',
        options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
        answer: 2,
    },
    {
        question: 'Which planet has the most moons?',
        options: ['Earth', 'Jupiter', 'Saturn', 'Mars'],
        answer: 2,
    },
    {
        question: "In computing, what does 'CPU' stand for?",
        options: [
            'Central Processing Unit',
            'Computer Personal Unit',
            'Central Peripheral Unit',
            'Control Processing Utility',
        ],
        answer: 0,
    },
    {
        question: 'Who painted the ceiling of the Sistine Chapel?',
        options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'],
        answer: 2,
    },
    {
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Skin', 'Liver', 'Lungs'],
        answer: 1,
    },
    {
        question: 'Which programming language is known for its snake logo?',
        options: ['Java', 'Python', 'Ruby', 'C++'],
        answer: 1,
    },
    {
        question: 'What is the value of Pi to three decimal places?',
        options: ['3.142', '3.141', '3.143', '3.140'],
        answer: 0,
    },
    {
        question: 'Which country hosted the 2016 Summer Olympics?',
        options: ['China', 'Brazil', 'United Kingdom', 'Russia'],
        answer: 1,
    },
];

const seed = async () => {
    await prisma.quiz.deleteMany({});

    for (const quiz of quizes) {
        await prisma.quiz.create({
            data: quiz,
        });
    }
};

seed()
    .then(async () => {
        await prisma.$disconnect();
        console.log('Seeding completed');
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

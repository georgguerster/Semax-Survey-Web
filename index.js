const slides = document.getElementById("slides");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentSlide = 0;

const totalSlides =
    document.querySelectorAll(".slide").length;

function updateSlider() {

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;
}


document.querySelectorAll('.nextBtn').forEach(btn => {

    btn.addEventListener("click", () => {
        console.log("Next button clicked");

        if (currentSlide < totalSlides - 1) {

            currentSlide++;
            updateSlider();
        }
    });
});

prevBtn.addEventListener("click", () => {

    if (currentSlide > 0) {

        currentSlide--;
        updateSlider();
    }
});

const translations = {

    en: {

        heroTitle:
            "Exploring the Cognitive Effects of Semax",

        heroText:
            "Anonymous research questionnaire focused on subjective nootropic effects, cognition, mood, and experience reports.",

        github:
            "Visit my GitHub",

        step1:
            "Optional Contact Information",

        step2:
            "Cognitive Effects",

        step3:
            "Experience Report",

        firstName:
            "First Name (Optional)",

        lastName:
            "Last Name (Optional)",

        email:
            "Email (Optional)",

        mobile:
            "Mobile Number (Optional)",

        age:
            "Age (Optional)",

        gender:
            "Gender (Optional)",

        whyStarted:
            "Why did you start using Semax?",

        tripReport:
            "Trip Report / Subjective Experience",

        otherSubstances:
            "Other substances used besides Semax (Optional)",

        submit:
            "Submit Survey",

        submitted:
            "Survey submitted successfully."
    },

    de: {

        heroTitle:
            "Erforschung der kognitiven Effekte von Semax",

        heroText:
            "Anonymer Forschungsfragebogen über subjektive nootropische Effekte, Kognition, Stimmung und Erfahrungsberichte.",

        github:
            "Mein GitHub besuchen",

        step1:
            "Optionale Kontaktinformationen",

        step2:
            "Kognitive Effekte",

        step3:
            "Erfahrungsbericht",

        firstName:
            "Vorname (Optional)",

        lastName:
            "Nachname (Optional)",

        email:
            "E-Mail (Optional)",

        mobile:
            "Telefonnummer (Optional)",

        age:
            "Alter (Optional)",

        gender:
            "Geschlecht (Optional)",

        whyStarted:
            "Warum haben Sie begonnen Semax zu verwenden?",

        tripReport:
            "Erfahrungsbericht / Subjektive Erfahrung",

        otherSubstances:
            "Andere verwendete Substanzen neben Semax (Optional)",

        submit:
            "Umfrage absenden",

        submitted:
            "Umfrage erfolgreich gesendet."
    }
};

let currentLanguage = "en";

function applyTranslations(lang) {

    currentLanguage = lang;

    const t = translations[lang];

    document.querySelector(".hero h1")
        .innerHTML = t.heroTitle;

    document.querySelector(".hero p")
        .innerHTML = t.heroText;

    document.querySelector("#githubLink")
        .innerHTML = t.github;

    document.querySelectorAll(".card h2")[0]
        .innerHTML = t.step1;

    document.querySelectorAll(".card h2")[1]
        .innerHTML = t.step2;

    document.querySelectorAll(".card h2")[2]
        .innerHTML = t.step3;

    const labels =
        document.querySelectorAll("label");

    labels[0].innerHTML = t.firstName;
    labels[1].innerHTML = t.lastName;
    labels[2].innerHTML = t.email;
    labels[3].innerHTML = t.mobile;
    labels[4].innerHTML = t.age;
    labels[5].innerHTML = t.gender;
    labels[6].innerHTML = t.whyStarted;
    labels[7].innerHTML = t.tripReport;
    labels[8].innerHTML = t.otherSubstances;

    document.querySelector("#submitBtn")
        .innerHTML = t.submit;
}

document
    .querySelectorAll(".lang-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            document
                .querySelectorAll(".lang-btn")
                .forEach(b => {

                    b.classList.remove("active-lang");
                });

            btn.classList.add("active-lang");

            applyTranslations(
                btn.dataset.lang
            );
        });
    });

const questions = [

    {
        en: "Semax improved my focus and concentration.",
        de: "Semax hat meinen Fokus und meine Konzentration verbessert."
    },

    {
        en: "Semax improved my memory retention.",
        de: "Semax hat mein Erinnerungsvermögen verbessert."
    },

    {
        en: "Semax increased my mental clarity.",
        de: "Semax hat meine mentale Klarheit erhöht."
    },

    {
        en: "Semax improved my productivity and motivation.",
        de: "Semax hat meine Produktivität und Motivation verbessert."
    },

    {
        en: "Semax reduced anxiety or stress.",
        de: "Semax hat Angst oder Stress reduziert."
    },

    {
        en: "Semax improved my mood.",
        de: "Semax hat meine Stimmung verbessert."
    },

    {
        en: "Semax enhanced my cognitive performance.",
        de: "Semax hat meine kognitive Leistungsfähigkeit verbessert."
    },

    {
        en: "Semax improved my reaction time and awareness.",
        de: "Semax hat meine Reaktionszeit und Aufmerksamkeit verbessert."
    }
];

const options = {

    en: [
        "I Strongly Agree",
        "I Agree",
        "Not Sure",
        "I Don't Agree",
        "I Strongly Disagree"
    ],

    de: [
        "Ich stimme stark zu",
        "Ich stimme zu",
        "Nicht sicher",
        "Ich stimme nicht zu",
        "Ich stimme überhaupt nicht zu"
    ]
};

const answers = {};

const questionsContainer =
    document.getElementById("questionsContainer");

function renderQuestions() {

    questionsContainer.innerHTML = "";

    questions.forEach((question, qIndex) => {

        const wrapper =
            document.createElement("div");

        wrapper.classList.add("question");

        const title =
            document.createElement("div");

        title.classList.add("question-title");

        title.innerText =
            question[currentLanguage];

        const optionsWrapper =
            document.createElement("div");

        optionsWrapper.classList.add("options");

        options[currentLanguage]
            .forEach(option => {

                const button =
                    document.createElement("div");

                button.classList.add("option-btn");

                button.innerText = option;

                button.addEventListener("click", () => {

                    const siblings =
                        optionsWrapper.querySelectorAll(".option-btn");

                    siblings.forEach(sib => {

                        sib.classList.remove("selected");
                    });

                    button.classList.add("selected");

                    answers[`question_${qIndex + 1}`] = {

                        question:
                            question[currentLanguage],

                        answer:
                            option
                    };
                });

                optionsWrapper.appendChild(button);
            });

        wrapper.appendChild(title);
        wrapper.appendChild(optionsWrapper);

        questionsContainer.appendChild(wrapper);
    });
}

renderQuestions();

document
    .querySelectorAll(".lang-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            renderQuestions();
        });
    });

document
    .getElementById("submitBtn")
    .addEventListener("click", () => {

        const surveyData = {

            language:
                currentLanguage,

            name:
                document.getElementById("name").value,

            lastname:
                document.getElementById("lastname").value,

            email:
                document.getElementById("email").value,

            mobile:
                document.getElementById("mobile").value,

            age:
                document.getElementById("age").value,

            gender:
                document.getElementById("gender").value,

            semax_questions:
                answers,

            why_started_using_semax:
                document.getElementById("whyStarted").value,

            trip_report:
                document.getElementById("tripReport").value,

            other_substances:
                document
                    .getElementById("otherSubstances")
                    .value
                    .split(",")
                    .map(item => item.trim())
                    .filter(item => item !== "")
        };

        console.log(
            "Survey Submitted:",
            surveyData
        );

        alert(
            translations[currentLanguage].submitted
        );
    });

applyTranslations("en");
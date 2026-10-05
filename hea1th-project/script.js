const $ = (id) => document.getElementById(id);
/* =========================
   الصفحات
========================= */
const pages = [
    "homePage",
    "planetsPage",
    "quizPage",
    "resultPage",
    "gamePage",
    "meteorGamePage",
    "raceGamePage",
    "rescueGamePage",
    "finalGamePage"
];
function showPage(pageId) {
    pages.forEach((id) => {
        const page = $(id);
        if (page) {
            page.classList.add("hidden");
        }
    });
    const page = $(pageId);
    if (page) {
        page.classList.remove("hidden");
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* =========================
   الموسيقى 🎵
========================= */
const music = $("backgroundMusic");
function startMusic() {
    if (!music) {
        return;
    }
    music.volume = 0.25;
    music.currentTime = 0;
    const promise = music.play();
    if (promise) {
        promise.catch(() => {
            console.log("Music could not start.");
        });
    }
}
$("startButton").addEventListener("click", () => {
    startMusic();
    showPage("planetsPage");
});
/* =========================
   الأصوات 🔊
========================= */
let audioContext = null;
function prepareAudio() {
    try {
        if (!audioContext) {
            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;
            if (!AudioContext) {
                return null;
            }
            audioContext = new AudioContext();
        }
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }
        return audioContext;
    } catch (error) {
        return null;
    }
}
function playClickSound() {
    const context = prepareAudio();
    if (!context) return;
    try {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
            520,
            context.currentTime
        );
        oscillator.frequency.exponentialRampToValueAtTime(
            850,
            context.currentTime + 0.08
        );
        gain.gain.setValueAtTime(
            0.15,
            context.currentTime
        );
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + 0.18
        );
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.18);
    } catch (error) {
        console.log("Click sound error");
    }
}
function playCorrectSound() {
    const context = prepareAudio();
    if (!context) return;
    try {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
            600,
            context.currentTime
        );
        oscillator.frequency.setValueAtTime(
            900,
            context.currentTime + 0.12
        );
        gain.gain.setValueAtTime(
            0.12,
            context.currentTime
        );
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + 0.3
        );
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.3);
    } catch (error) {
        console.log("Correct sound error");
    }
}
function playWrongSound() {
    const context = prepareAudio();
    if (!context) return;
    try {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(
            220,
            context.currentTime
        );
        oscillator.frequency.setValueAtTime(
            120,
            context.currentTime + 0.15
        );
        gain.gain.setValueAtTime(
            0.08,
            context.currentTime
        );
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + 0.25
        );
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.25);
    } catch (error) {
        console.log("Wrong sound error");
    }
}
/* =========================
   الكواكب 🪐
========================= */
const planets = [
    {
        name: "عطارد",
        icon: "🟤",
        description:
            "أقرب كوكب إلى الشمس وأصغر كواكب المجموعة الشمسية.",
        info:
            "عطارد كوكب صخري صغير وقريب جدًا من الشمس."
    },
    {
        name: "الزهرة",
        icon: "🟡",
        description:
            "ثاني كواكب المجموعة الشمسية وأكثرها حرارة.",
        info:
            "يمتلك الزهرة غلافًا جويًا كثيفًا جدًا."
    },
    {
        name: "الأرض",
        icon: "🌍",
        description:
            "كوكبنا والموطن المعروف للحياة.",
        info:
            "الأرض هي الكوكب الذي نعيش عليه ولها قمر طبيعي واحد."
    },
    {
        name: "المريخ",
        icon: "🔴",
        description:
            "الكوكب الأحمر.",
        info:
            "يتميز المريخ بلونه الأحمر ويمتلك قمرين صغيرين."
    },
    {
        name: "المشتري",
        icon: "🟠",
        description:
            "أكبر كواكب المجموعة الشمسية.",
        info:
            "المشتري كوكب عملاق غازي ويشتهر بالبقعة الحمراء العظيمة."
    },
    {
        name: "زحل",
        icon: "🪐",
        description:
            "كوكب عملاق يشتهر بحلقاته.",
        info:
            "حلقات زحل تتكون من الجليد والصخور والغبار."
    },
    {
        name: "أورانوس",
        icon: "🔵",
        description:
            "عملاق جليدي أزرق فاتح.",
        info:
            "أورانوس يميل بشكل كبير أثناء دورانه حول الشمس."
    },
    {
        name: "نبتون",
        icon: "🟢",
        description:
            "أبعد كواكب المجموعة الشمسية.",
        info:
            "نبتون عملاق جليدي يتميز برياح قوية جدًا."
    }
];
/* =========================
   أشياء أخرى
========================= */
const spaceObjects = [
    {
        icon: "☀️",
        name: "الشمس",
        description:
            "نجم ضخم يقع في مركز مجموعتنا الشمسية.",
        info:
            "الشمس توفر الضوء والحرارة والطاقة اللازمة للحياة على الأرض."
    },
    {
        icon: "🌙",
        name: "القمر",
        description:
            "القمر هو القمر الطبيعي للأرض.",
        info:
            "يدور القمر حول الأرض وله تأثير في ظاهرة المد والجزر."
    },
    {
        icon: "⭐",
        name: "النجم",
        description:
            "جسم فضائي مضيء ينتج الطاقة والضوء.",
        info:
            "الشمس نفسها نجم، وهناك نجوم كثيرة في الكون."
    },
    {
        icon: "☄️",
        name: "الشهاب",
        description:
            "ضوء يظهر عندما يدخل جسم صغير الغلاف الجوي.",
        info:
            "يظهر الشهاب كخط مضيء في السماء."
    },
    {
        icon: "☄️",
        name: "المذنب",
        description:
            "جسم جليدي يدور حول الشمس وقد يظهر له ذيل.",
        info:
            "عندما يقترب المذنب من الشمس يمكن أن يظهر له ذيل."
    },
    {
        icon: "🌌",
        name: "درب التبانة",
        description:
            "المجرة التي توجد فيها مجموعتنا الشمسية.",
        info:
            "تحتوي مجرة درب التبانة على عدد هائل من النجوم."
    }
];
/* =========================
   البطاقات
========================= */
function createCards() {
    const planetsContainer =
        $("planetsContainer");
    const spaceContainer =
        $("spaceContainer");
    planets.forEach((planet, index) => {
        const card =
            document.createElement("div");
        card.className =
            "planet-card";
        card.innerHTML = `
            <div class="planet-icon">
                ${planet.icon}
            </div>
            <h3>
                ${planet.name}
            </h3>
        `;
        card.addEventListener("click", () => {
            playClickSound();
            openDetails(
                planet.icon,
                planet.name,
                planet.description,
                `${planet.info}<br><br>
                الترتيب من الشمس:
                ${index + 1}`
            );
        });
        planetsContainer.appendChild(card);
    });
    spaceObjects.forEach((object) => {
        const card =
            document.createElement("div");
        card.className =
            "space-card";
        card.innerHTML = `
            <div class="space-icon">
                ${object.icon}
            </div>
            <h3>
                ${object.name}
            </h3>
        `;
        card.addEventListener("click", () => {
            playClickSound();
            openDetails(
                object.icon,
                object.name,
                object.description,
                object.info
            );
        });
        spaceContainer.appendChild(card);
    });
}
function openDetails(
    icon,
    title,
    description,
    info
) {
    $("detailIcon").textContent = icon;
    $("detailTitle").textContent = title;
    $("detailDescription").textContent = description;
    $("detailInfo").innerHTML = info;
    $("planetDetails")
        .classList
        .remove("hidden");
}
$("closeDetails").addEventListener("click", () => {
    $("planetDetails")
        .classList
        .add("hidden");
});
$("planetDetails").addEventListener(
    "click",
    (event) => {
        if (event.target === $("planetDetails")) {
            $("planetDetails")
                .classList
                .add("hidden");
        }
    }
);
createCards();
/* =========================
   الاختبار 🧠
========================= */
const questions = [
    {
        question:
            "ما أكبر كوكب في المجموعة الشمسية؟",
        answers: [
            "الأرض",
            "المريخ",
            "المشتري",
            "عطارد"
        ],
        correct: 2
    },
    {
        question:
            "ما الكوكب المعروف بالكوكب الأحمر؟",
        answers: [
            "المريخ",
            "الزهرة",
            "نبتون",
            "زحل"
        ],
        correct: 0
    },
    {
        question:
            "ما الكوكب المشهور بحلقاته؟",
        answers: [
            "الأرض",
            "زحل",
            "عطارد",
            "الزهرة"
        ],
        correct: 1
    },
    {
        question:
            "ما أقرب كوكب إلى الشمس؟",
        answers: [
            "عطارد",
            "الأرض",
            "المشتري",
            "نبتون"
        ],
        correct: 0
    },
    {
        question:
            "ما الكوكب الذي نعيش عليه؟",
        answers: [
            "المريخ",
            "الأرض",
            "الزهرة",
            "أورانوس"
        ],
        correct: 1
    },
    {
        question:
            "ما اسم مجرتنا؟",
        answers: [
            "أندروميدا",
            "درب التبانة",
            "المجرة الحمراء",
            "مجرة الشمس"
        ],
        correct: 1
    },
    {
        question:
            "ما النجم الموجود في مركز مجموعتنا الشمسية؟",
        answers: [
            "الشمس",
            "النجم القطبي",
            "سيريوس",
            "الشعرى"
        ],
        correct: 0
    },
    {
        question:
            "ما أبعد كوكب عن الشمس؟",
        answers: [
            "زحل",
            "أورانوس",
            "نبتون",
            "المريخ"
        ],
        correct: 2
    },
    {
        question:
            "ما القمر الطبيعي للأرض؟",
        answers: [
            "القمر",
            "فوبوس",
            "ديموس",
            "تيتان"
        ],
        correct: 0
    },
    {
        question:
            "أي كوكب هو الأكبر حجمًا؟",
        answers: [
            "زحل",
            "المشتري",
            "نبتون",
            "الأرض"
        ],
        correct: 1
    }
];
let currentQuestion = 0;
let quizScore = 0;
$("quizButton").addEventListener("click", () => {
    currentQuestion = 0;
    quizScore = 0;
    showPage("quizPage");
    showQuestion();
});
function showQuestion() {
    const data =
        questions[currentQuestion];
    $("questionNumber").textContent =
        `السؤال ${currentQuestion + 1} من ${questions.length}`;
    $("progressFill").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;
    $("question").textContent =
        data.question;
    const answers =
        $("answers");
    answers.innerHTML = "";
    data.answers.forEach((answer, index) => {
        const button =
            document.createElement("button");
        button.className =
            "answer";
        button.textContent =
            answer;
        button.addEventListener(
            "click",
            () => {
                checkAnswer(
                    button,
                    index,
                    data.correct
                );
            }
        );
        answers.appendChild(button);
    });
}
function checkAnswer(
    selectedButton,
    selectedIndex,
    correctIndex
) {
    const buttons =
        document.querySelectorAll(".answer");
    buttons.forEach((button) => {
        button.disabled = true;
    });
    if (selectedIndex === correctIndex) {
        selectedButton.classList.add("correct");
        quizScore++;
        playCorrectSound();
    } else {
        selectedButton.classList.add("wrong");
        if (buttons[correctIndex]) {
            buttons[correctIndex]
                .classList
                .add("correct");
        }
        playWrongSound();
    }
    setTimeout(() => {
        currentQuestion++;
        if (
            currentQuestion <
            questions.length
        ) {
            showQuestion();
        } else {
            showQuizResult();
        }
    }, 1000);
}
function showQuizResult() {
    $("score").textContent =
        `${quizScore} / 10`;
    if (quizScore === 10) {
        $("resultText").textContent =
            "ممتاز! 🚀 أنت مستكشف فضاء محترف!";
    } else if (quizScore >= 7) {
        $("resultText").textContent =
            "رائع جدًا! 🌟 معلوماتك عن الفضاء ممتازة.";
    } else if (quizScore >= 5) {
        $("resultText").textContent =
            "جيد! 🪐 استمر في استكشاف الفضاء.";
    } else {
        $("resultText").textContent =
            "حاول مرة أخرى 🚀 وستصبح أفضل.";
    }
    showPage("resultPage");
}
$("restartButton").addEventListener("click", () => {
    currentQuestion = 0;
    quizScore = 0;
    showPage("quizPage");
    showQuestion();
});
$("backHomeButton").addEventListener("click", () => {
    showPage("homePage");
});
/* =========================
   مساعد الفضاء 🤖
========================= */
$("aiButton").addEventListener("click", () => {
    const text =
        $("aiQuestion")
            .value
            .trim()
            .toLowerCase();
    if (!text) {
        $("aiAnswer").textContent =
            "اكتب سؤالك أولًا 🚀";
        $("aiAnswer")
            .classList
            .remove("hidden");
        return;
    }
    let answer =
        "سؤال جميل! 🤖 اسألني عن الكواكب أو الشمس أو القمر أو النجوم أو المجرات أو المجموعة الشمسية.";
    if (
        text.includes("أكبر") ||
        text.includes("اكبر")
    ) {
        answer =
            "أكبر كوكب في المجموعة الشمسية هو المشتري، وهو كوكب عملاق غازي.";
    } else if (
        text.includes("أصغر") ||
        text.includes("اصغر")
    ) {
        answer =
            "أصغر كوكب من الكواكب الثمانية هو عطارد.";
    } else if (
        text.includes("عطارد")
    ) {
        answer =
            "عطارد هو أقرب كوكب إلى الشمس وأصغر كواكب المجموعة الشمسية.";
    } else if (
        text.includes("الزهرة")
    ) {
        answer =
            "الزهرة هو ثاني كوكب من الشمس، ويُعد أكثر كواكب المجموعة الشمسية حرارة.";
    } else if (
        text.includes("الأرض")
    ) {
        answer =
            "الأرض هي الكوكب الذي نعيش عليه، وهي الكوكب المعروف بوجود الحياة عليه.";
    } else if (
        text.includes("المريخ")
    ) {
        answer =
            "المريخ هو الكوكب الأحمر، وله قمران صغيران يُعرفان باسم فوبوس وديموس.";
    } else if (
        text.includes("المشتري")
    ) {
        answer =
            "المشتري هو أكبر كواكب المجموعة الشمسية، وهو كوكب عملاق غازي.";
    } else if (
        text.includes("زحل")
    ) {
        answer =
            "زحل كوكب عملاق غازي ويشتهر بحلقاته المكونة من الجليد والصخور والغبار.";
    } else if (
        text.includes("أورانوس") ||
        text.includes("اورانوس")
    ) {
        answer =
            "أورانوس عملاق جليدي لونه أزرق مخضر، ويميل بشكل كبير أثناء دورانه.";
    } else if (
        text.includes("نبتون")
    ) {
        answer =
            "نبتون هو أبعد كوكب عن الشمس من بين الكواكب الثمانية، وهو عملاق جليدي.";
    } else if (
        text.includes("الشمس")
    ) {
        answer =
            "الشمس نجم يقع في مركز مجموعتنا الشمسية، وهي مصدر الضوء والحرارة للأرض.";
    } else if (
        text.includes("القمر")
    ) {
        answer =
            "القمر هو القمر الطبيعي للأرض، ويدور حولها.";
    } else if (
        text.includes("نجم") ||
        text.includes("نجوم")
    ) {
        answer =
            "النجم جسم فضائي ينتج الضوء والطاقة. والشمس نفسها نجم.";
    } else if (
        text.includes("مذنب")
    ) {
        answer =
            "المذنب جسم يتكون غالبًا من الجليد والغبار والصخور، ويمكن أن يظهر له ذيل عند اقترابه من الشمس.";
    } else if (
        text.includes("شهاب")
    ) {
        answer =
            "الشهاب هو الوميض الذي نراه عندما يدخل جسم صغير الغلاف الجوي بسرعة كبيرة.";
    } else if (
        text.includes("مجرة") ||
        text.includes("درب التبانة")
    ) {
        answer =
            "درب التبانة هي المجرة التي توجد فيها مجموعتنا الشمسية.";
    } else if (
        text.includes("كواكب")
    ) {
        answer =
            "لدينا 8 كواكب في المجموعة الشمسية: عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس ونبتون.";
    } else if (
        text.includes("حلقات")
    ) {
        answer =
            "زحل هو أشهر كوكب بحلقاته، لكن بعض الكواكب العملاقة الأخرى لديها حلقات أيضًا.";
    } else if (
        text.includes("لون")
    ) {
        answer =
            "تختلف ألوان الكواكب بسبب تركيب أسطحها وأغلفتها الجوية، مثل المريخ الأحمر ونبتون الأزرق المخضر.";
    } else if (
        text.includes("فضاء")
    ) {
        answer =
            "الفضاء واسع جدًا ويضم النجوم والكواكب والمجرات والسدم وأجرامًا فضائية كثيرة.";
    } else if (
        text.includes("مجموعة شمسية")
    ) {
        answer =
            "المجموعة الشمسية تتكون من الشمس وثمانية كواكب وأقمار وكويكبات ومذنبات وأجرام أخرى.";
    } else if (
        text.includes("أبعد")
    ) {
        answer =
            "نبتون هو أبعد كوكب عن الشمس من بين الكواكب الثمانية.";
    } else if (
        text.includes("أقرب")
    ) {
        answer =
            "عطارد هو أقرب كوكب إلى الشمس.";
    }
    $("aiAnswer").textContent =
        answer;
    $("aiAnswer")
        .classList
        .remove("hidden");
});
/* =========================
   المغامرة 🎮
========================= */
let gameScores = {
    stage1: 0,
    stage2: 0,
    stage3: 0
};
function updateTotalScore() {
    const total =
        gameScores.stage1 +
        gameScores.stage2 +
        gameScores.stage3;
    $("gameTotalScore").textContent =
        total;
    return total;
}
$("gameButton").addEventListener("click", () => {
    updateTotalScore();
    showPage("gamePage");
});
$("backToSpaceButton").addEventListener("click", () => {
    showPage("planetsPage");
});
/* =========================
   العد التنازلي ⏳
========================= */
function countdown(
    elementId,
    callback
) {
    const element =
        $(elementId);
    if (!element) {
        callback();
        return;
    }
    element.classList.remove("hidden");
    let number = 3;
    element.textContent = number;
    const timer =
        setInterval(() => {
            number--;
            if (number > 0) {
                element.textContent =
                    number;
            } else {
                element.textContent =
                    "🚀 انطلق!";
                clearInterval(timer);
                setTimeout(() => {
                    element.classList.add("hidden");
                    callback();
                }, 600);
            }
        }, 1000);
}
/* =========================
   المرحلة 1 ☄️
========================= */
let meteorTimer = null;
let meteorSpawnTimer = null;
let meteorScore = 0;
let meteorTime = 20;
let meteorFinished = false;
$("stage1Button").addEventListener(
    "click",
    startMeteorGame
);
function startMeteorGame() {
    clearInterval(meteorTimer);
    clearInterval(meteorSpawnTimer);
    meteorScore = 0;
    meteorTime = 20;
    meteorFinished = false;
    $("meteorScore").textContent = "0";
    $("meteorTime").textContent = "20";
    $("meteorGameResult")
        .classList
        .add("hidden");
    $("meteorGameArea").innerHTML = "";
    showPage("meteorGamePage");
    countdown(
        "meteorCountdown",
        beginMeteorGame
    );
}
function beginMeteorGame() {
    meteorSpawnTimer =
        setInterval(
            createMeteor,
            500
        );
    meteorTimer =
        setInterval(() => {
            if (meteorFinished) return;
            meteorTime--;
            $("meteorTime").textContent =
                meteorTime;
            if (meteorTime <= 0) {
                finishMeteorGame();
            }
        }, 1000);
}
function createMeteor() {
    const area =
        $("meteorGameArea");
    if (
        !area ||
        meteorFinished ||
        $("meteorGamePage")
            .classList
            .contains("hidden")
    ) {
        return;
    }
    const meteor =
        document.createElement("div");
    meteor.className =
        "meteor";
    meteor.textContent =
        "☄️";
    meteor.style.left =
        `${Math.random() *
        Math.max(
            20,
            area.clientWidth - 55
        )}px`;
    meteor.style.top =
        `${Math.random() *
        Math.max(
            20,
            area.clientHeight - 55
        )}px`;
    meteor.addEventListener("click", () => {
        if (meteorFinished) return;
        if (meteorScore < 30) {
            meteorScore++;
            $("meteorScore").textContent =
                meteorScore;
            playCorrectSound();
        }
        meteor.remove();
        if (meteorScore >= 30) {
            finishMeteorGame();
        }
    });
    area.appendChild(meteor);
    setTimeout(() => {
        if (meteor.parentNode) {
            meteor.remove();
        }
    }, 1600);
}
function finishMeteorGame() {
    if (meteorFinished) return;
    meteorFinished = true;
    clearInterval(meteorTimer);
    clearInterval(meteorSpawnTimer);
    meteorScore =
        Math.min(
            meteorScore,
            30
        );
    gameScores.stage1 =
        meteorScore;
    $("finalMeteorScore").textContent =
        meteorScore;
    $("meteorGameResult")
        .classList
        .remove("hidden");
    updateTotalScore();
    setTimeout(() => {
        startRaceGame();
    }, 1300);
}
$("continueStage2").addEventListener(
    "click",
    startRaceGame
);
$("backGameMenu").addEventListener(
    "click",
    () => {
        showPage("gamePage");
    }
);
/* =========================
   المرحلة 2 🚀
========================= */
let raceTimer = null;
let raceSpawnTimer = null;
let raceTime = 20;
let raceScore = 0;
let shipPosition = 50;
let raceFinished = false;
let raceObjects = [];
$("stage2Button").addEventListener(
    "click",
    startRaceGame
);
function startRaceGame() {
    clearInterval(raceTimer);
    clearInterval(raceSpawnTimer);
    raceObjects.forEach((object) => {
        if (object.timer) {
            clearInterval(object.timer);
        }
    });
    raceObjects = [];
    raceTime = 20;
    raceScore = 0;
    shipPosition = 50;
    raceFinished = false;
    $("raceScore").textContent =
        "0";
    $("raceTime").textContent =
        "20";
    $("raceGameResult")
        .classList
        .add("hidden");
    $("raceGameArea").innerHTML = `
        <div id="playerShip">
            🚀
        </div>
    `;
    showPage("raceGamePage");
    updateShipPosition();
    countdown(
        "raceCountdown",
        beginRaceGame
    );
}
function beginRaceGame() {
    raceSpawnTimer =
        setInterval(
            createAsteroid,
            650
        );
    raceTimer =
        setInterval(() => {
            if (raceFinished) return;
            raceTime--;
            $("raceTime").textContent =
                raceTime;
            if (raceScore < 35) {
                raceScore++;
                $("raceScore").textContent =
                    raceScore;
            }
            if (raceTime <= 0) {
                finishRaceGame();
            }
        }, 1000);
}
function updateShipPosition() {
    const ship =
        $("playerShip");
    if (ship) {
        ship.style.left =
            `${shipPosition}%`;
    }
}
function moveShip(direction) {
    if (
        $("raceGamePage")
            .classList
            .contains("hidden") ||
        raceFinished
    ) {
        return;
    }
    shipPosition +=
        direction * 5;
    shipPosition =
        Math.max(
            7,
            Math.min(
                93,
                shipPosition
            )
        );
    updateShipPosition();
}
document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key === "ArrowLeft"
        ) {
            moveShip(-1);
        }
        if (
            event.key === "ArrowRight"
        ) {
            moveShip(1);
        }
    }
);
function createAsteroid() {
    const area =
        $("raceGameArea");
    if (
        !area ||
        raceFinished ||
        $("raceGamePage")
            .classList
            .contains("hidden")
    ) {
        return;
    }
    const asteroid =
        document.createElement("div");
    asteroid.className =
        "asteroid";
    asteroid.textContent =
        "☄️";
    asteroid.style.left =
        `${Math.random() *
        Math.max(
            10,
            area.clientWidth - 50
        )}px`;
    asteroid.style.top =
        "-50px";
    area.appendChild(asteroid);
    let top = -50;
    let alreadyHit = false;
    const movement =
        setInterval(() => {
            if (raceFinished) {
                clearInterval(movement);
                if (asteroid.parentNode) {
                    asteroid.remove();
                }
                return;
            }
            top += 5;
            asteroid.style.top =
                `${top}px`;
            const ship =
                $("playerShip");
            if (
                ship &&
                !alreadyHit &&
                collision(
                    ship,
                    asteroid
                )
            ) {
                alreadyHit = true;
                raceScore =
                    Math.max(
                        0,
                        raceScore - 3
                    );
                $("raceScore")
                    .textContent =
                    raceScore;
                playWrongSound();
                clearInterval(movement);
                asteroid.remove();
            }
            if (
                top >
                area.clientHeight
            ) {
                clearInterval(movement);
                asteroid.remove();
            }
        }, 50);
    raceObjects.push({
        element: asteroid,
        timer: movement
    });
}
function collision(a, b) {
    const r1 =
        a.getBoundingClientRect();
    const r2 =
        b.getBoundingClientRect();
    return !(
        r1.right < r2.left ||
        r1.left > r2.right ||
        r1.bottom < r2.top ||
        r1.top > r2.bottom
    );
}
function finishRaceGame() {
    if (raceFinished) return;
    raceFinished = true;
    clearInterval(raceTimer);
    clearInterval(raceSpawnTimer);
    raceObjects.forEach((object) => {
        if (object.timer) {
            clearInterval(object.timer);
        }
    });
    raceObjects = [];
    raceScore =
        Math.max(
            0,
            Math.min(
                35,
                raceScore
            )
        );
    gameScores.stage2 =
        raceScore;
    $("finalRaceScore")
        .textContent =
        raceScore;
    $("raceGameResult")
        .classList
        .remove("hidden");
    updateTotalScore();
    setTimeout(() => {
        startRescueGame();
    }, 1300);
}
$("continueStage3").addEventListener(
    "click",
    startRescueGame
);
$("backGameMenu2").addEventListener(
    "click",
    () => {
        showPage("gamePage");
    }
);
/* =========================
   المرحلة 3 🛰️
   إنقاذ محطة الفضاء
========================= */
let rescueTimer = null;
let rescueEnergyTimer = null;
let rescueAsteroidTimer = null;
let rescueObjectTimers = [];
let rescueScore = 0;
let rescueTime = 30;
let rescueShipPosition = 50;
let rescueFinished = false;
$("stage3Button").addEventListener(
    "click",
    startRescueGame
);
function startRescueGame() {
    clearInterval(rescueTimer);
    clearInterval(rescueEnergyTimer);
    clearInterval(rescueAsteroidTimer);
    rescueObjectTimers.forEach((timer) => {
        clearInterval(timer);
    });
    rescueObjectTimers = [];
    rescueScore = 0;
    rescueTime = 30;
    rescueShipPosition = 50;
    rescueFinished = false;
    $("rescueScore").textContent =
        "0";
    $("rescueTime").textContent =
        "30";
    $("rescueGameResult")
        .classList
        .add("hidden");
    $("rescueGameArea").innerHTML = `
        <div id="spaceStation">
            🛰️
        </div>
        <div id="rescueShip">
            🚀
        </div>
    `;
    showPage("rescueGamePage");
    updateRescueShipPosition();
    countdown(
        "rescueCountdown",
        beginRescueGame
    );
}
function beginRescueGame() {
    rescueEnergyTimer =
        setInterval(
            createEnergyCell,
            800
        );
    rescueAsteroidTimer =
        setInterval(
            createRescueAsteroid,
            900
        );
    rescueTimer =
        setInterval(() => {
            if (rescueFinished) return;
            rescueTime--;
            $("rescueTime").textContent =
                rescueTime;
            if (rescueTime <= 0) {
                finishRescueGame();
            }
        }, 1000);
}
function updateRescueShipPosition() {
    const ship =
        $("rescueShip");
    if (ship) {
        ship.style.left =
            `${rescueShipPosition}%`;
    }
}
function moveRescueShip(direction) {
    if (
        $("rescueGamePage")
            .classList
            .contains("hidden") ||
        rescueFinished
    ) {
        return;
    }
    rescueShipPosition +=
        direction * 6;
    rescueShipPosition =
        Math.max(
            7,
            Math.min(
                93,
                rescueShipPosition
            )
        );
    updateRescueShipPosition();
}
$("rescueLeftButton").addEventListener(
    "click",
    () => {
        moveRescueShip(-1);
    }
);
$("rescueRightButton").addEventListener(
    "click",
    () => {
        moveRescueShip(1);
    }
);
document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key === "ArrowLeft"
        ) {
            moveRescueShip(-1);
        }
        if (
            event.key === "ArrowRight"
        ) {
            moveRescueShip(1);
        }
    }
);
function createEnergyCell() {
    const area =
        $("rescueGameArea");
    if (
        !area ||
        rescueFinished ||
        $("rescueGamePage")
            .classList
            .contains("hidden")
    ) {
        return;
    }
    const cell =
        document.createElement("div");
    cell.className =
        "energy-cell";
    cell.textContent =
        "🔋";
    cell.style.left =
        `${Math.random() *
        Math.max(
            20,
            area.clientWidth - 55
        )}px`;
    cell.style.top =
        "-45px";
    area.appendChild(cell);
    let top = -45;
    let collected = false;
    const movement =
        setInterval(() => {
            if (rescueFinished) {
                clearInterval(movement);
                if (cell.parentNode) {
                    cell.remove();
                }
                return;
            }
            top += 4;
            cell.style.top =
                `${top}px`;
            const ship =
                $("rescueShip");
            if (
                ship &&
                !collected &&
                collision(
                    ship,
                    cell
                )
            ) {
                collected = true;
                rescueScore =
                    Math.min(
                        35,
                        rescueScore + 5
                    );
                $("rescueScore")
                    .textContent =
                    rescueScore;
                playCorrectSound();
                clearInterval(movement);
                cell.remove();
                if (rescueScore >= 35) {
                    finishRescueGame();
                }
            }
            if (
                top >
                area.clientHeight
            ) {
                clearInterval(movement);
                cell.remove();
            }
        }, 50);
    rescueObjectTimers.push(movement);
}
function createRescueAsteroid() {
    const area =
        $("rescueGameArea");
    if (
        !area ||
        rescueFinished ||
        $("rescueGamePage")
            .classList
            .contains("hidden")
    ) {
        return;
    }
    const asteroid =
        document.createElement("div");
    asteroid.className =
        "rescue-asteroid";
    asteroid.textContent =
        "☄️";
    asteroid.style.left =
        `${Math.random() *
        Math.max(
            20,
            area.clientWidth - 55
        )}px`;
    asteroid.style.top =
        "-50px";
    area.appendChild(asteroid);
    let top = -50;
    let hit = false;
    const movement =
        setInterval(() => {
            if (rescueFinished) {
                clearInterval(movement);
                if (asteroid.parentNode) {
                    asteroid.remove();
                }
                return;
            }
            top += 5;
            asteroid.style.top =
                `${top}px`;
            const ship =
                $("rescueShip");
            if (
                ship &&
                !hit &&
                collision(
                    ship,
                    asteroid
                )
            ) {
                hit = true;
                rescueTime =
                    Math.max(
                        0,
                        rescueTime - 2
                    );
                $("rescueTime")
                    .textContent =
                    rescueTime;
                playWrongSound();
                clearInterval(movement);
                asteroid.remove();
                if (rescueTime <= 0) {
                    finishRescueGame();
                }
            }
            if (
                top >
                area.clientHeight
            ) {
                clearInterval(movement);
                asteroid.remove();
            }
        }, 50);
    rescueObjectTimers.push(movement);
}
function finishRescueGame() {
    if (rescueFinished) return;
    rescueFinished = true;
    clearInterval(rescueTimer);
    clearInterval(rescueEnergyTimer);
    clearInterval(rescueAsteroidTimer);
    rescueObjectTimers.forEach((timer) => {
        clearInterval(timer);
    });
    rescueObjectTimers = [];
    rescueScore =
        Math.max(
            0,
            Math.min(
                35,
                rescueScore
            )
        );
    gameScores.stage3 =
        rescueScore;
    $("finalRescueScore")
        .textContent =
        rescueScore;
    $("rescueGameResult")
        .classList
        .remove("hidden");
    updateTotalScore();
    setTimeout(() => {
        showFinalGame();
    }, 1300);
}
$("finalGameButton").addEventListener(
    "click",
    showFinalGame
);
$("backGameMenu3").addEventListener(
    "click",
    () => {
        showPage("gamePage");
    }
);
/* =========================
   النتيجة النهائية 🏆
========================= */
function showFinalGame() {
    const total =
        updateTotalScore();
    $("finalGameScore")
        .textContent =
        total;
    $("breakdown1")
        .textContent =
        gameScores.stage1;
    $("breakdown2")
        .textContent =
        gameScores.stage2;
    $("breakdown3")
        .textContent =
        gameScores.stage3;
    if (total === 100) {
        $("finalGameTitle")
            .textContent =
            "🏆 مستكشف فضاء أسطوري!";
        $("finalGameText")
            .textContent =
            "أبدعت! حصلت على الدرجة الكاملة 100 / 100.";
    } else if (total >= 75) {
        $("finalGameTitle")
            .textContent =
            "🌟 مستكشف فضاء ممتاز!";
        $("finalGameText")
            .textContent =
            "نتيجة رائعة جدًا! استمر في المغامرة.";
    } else if (total >= 50) {
        $("finalGameTitle")
            .textContent =
            "🚀 مستكشف فضاء جيد!";
        $("finalGameText")
            .textContent =
            "أداء جميل! حاول مرة أخرى لتحصل على نقاط أكثر.";
    } else {
        $("finalGameTitle")
            .textContent =
            "🌌 بداية جيدة!";
        $("finalGameText")
            .textContent =
            "جرب المراحل مرة أخرى وحاول تحسين نتيجتك.";
    }
    showPage("finalGamePage");
}
$("playAgainGame").addEventListener(
    "click",
    () => {
        gameScores = {
            stage1: 0,
            stage2: 0,
            stage3: 0
        };
        updateTotalScore();
        showPage("gamePage");
    }
);
$("finalBackHome").addEventListener(
    "click",
    () => {
        showPage("homePage");
    }
);
/* =========================
   ESC
========================= */
document.addEventListener(
    "keydown",
    (event) => {
        if (event.key === "Escape") {
            $("planetDetails")
                .classList
                .add("hidden");
        }
    }
);
(() => {
  const $ = (id) => document.getElementById(id);

  // Views
  const quizView = $("quizView");
  const resultView = $("resultView");

  // Quiz UI
  const progressLabel = $("progressLabel");
  const progressPct = $("progressPct");
  const progressBar = $("progressBar");
  const questionText = $("questionText");
  const optionsWrap = $("optionsWrap");
  const btnNext = $("btnNext");
  const btnBack = $("btnBack");
  const btnRestartTop = $("btnRestartTop");
  const spinner = $("spinner");
  const statusEl = $("status");

  // Result UI
  const archetypeTitle = $("archetypeTitle");
  const revealText = $("revealText");
  const teamName = $("teamName");
  const teamNameSmall = $("teamNameSmall");
  const btnRestartResult = $("btnRestartResult");

  // NUEVO: imagen y botón a tienda
  const teamImage = $("teamImage");
  const btnBuyJersey = $("btnBuyJersey");

  
  const ARCHETYPES = {
    A: {
      key: "A",
      title: "Tradición y pertenencia",
      team: "Chivas",
      image: "escudos/chivas.png",
      reveal: [
        "Tu identidad como aficionado se construye desde el arraigo: la lealtad, la herencia emocional y el orgullo colectivo pesan más que un momento aislado.",
        "Vives el fútbol como pertenencia. Para ti, apoyar es sostener una historia compartida y defender un vínculo que se siente como familia."
      ].join(" "),
      shopParam: "chivas"
    },
    B: {
      key: "B",
      title: "Grandeza y ambición",
      team: "América",
      image: "escudos/america.png",
      reveal: [
        "Tu afición se guía por estándares altos: te atrae el protagonismo, la excelencia y la mentalidad de competir siempre arriba.",
        "Aceptas la presión como parte natural de un equipo grande: exigir, dominar y responder con autoridad es parte de tu forma de vivir la pasión."
      ].join(" "),
      shopParam: "america"
    },
    C: {
      key: "C",
      title: "Resiliencia y fe",
      team: "Cruz Azul",
      image: "escudos/cruz.png",
      reveal: [
        "Tu perfil de aficionado es resistente: no te define un instante, te define la constancia. Permaneces y crees, incluso cuando el contexto es adverso.",
        "Para ti, apoyar es insistir. La esperanza y la perseverancia son tu sello: confías en que la recompensa llega a quien no abandona."
      ].join(" "),
      shopParam: "cruzazul"
    },
    D: {
      key: "D",
      title: "Identidad y formación",
      team: "Tigres",
      image: "escudos/tigres.png",
      reveal: [
        "Tu afición se alinea con principios: valoras la coherencia, el proceso y la construcción sostenida. Te importa lo que un club forma, no solo lo que logra.",
        "Te identificas con la idea de evolucionar: aprender, crecer y sostener una identidad clara con convicción a lo largo del tiempo."
      ].join(" "),
      shopParam: "tigres"
    }
  };

  // =========================================================
  // PREGUNTAS (10)
  // =========================================================
  const QUESTIONS = [
    { id: 1, text: "Cuando apoyas a un equipo, lo que más valoras es:", options: {
      A: "Que represente una tradición que pasa de generación en generación.",
      B: "Que siempre esté obligado a competir por lo más alto.",
      C: "Que nunca se rinda, incluso cuando todo parece perdido.",
      D: "Que tenga valores claros y forme personas, no solo resultados."
    }},
    { id: 2, text: "Para ti, ser aficionado significa principalmente:", options: {
      A: "Defender una identidad que se siente como familia.",
      B: "Exigir excelencia y asumir la responsabilidad de ser protagonista.",
      C: "Mantener la fe aun en los momentos más difíciles.",
      D: "Crecer junto al equipo, aprender y evolucionar."
    }},
    { id: 3, text: "Ante una derrota importante, tu reacción natural es:", options: {
      A: "Recordar la historia y confiar en lo que siempre ha sido el club.",
      B: "Exigir cambios inmediatos y una respuesta contundente.",
      C: "Pensar que tarde o temprano la recompensa llegará.",
      D: "Analizar el proceso y creer en el desarrollo a largo plazo."
    }},
    { id: 4, text: "¿Qué frase conecta más contigo como aficionado?", options: {
      A: "“Esto es más grande que cualquier resultado.”",
      B: "“Aquí solo se juega para ganar.”",
      C: "“Algún día todo valdrá la pena.”",
      D: "“Lo importante es el camino y lo que construimos.”"
    }},
    { id: 5, text: "En una final, prefieres un equipo que:", options: {
      A: "Honre su historia y su gente.",
      B: "Imponga respeto desde el primer minuto.",
      C: "Luche hasta el último segundo.",
      D: "Juegue con identidad y convicción."
    }},
    { id: 6, text: "Lo que más te enorgullece de un club es:", options: {
      A: "Su arraigo cultural y social.",
      B: "Su mentalidad dominante.",
      C: "Su capacidad de levantarse una y otra vez.",
      D: "Su compromiso con la formación y los valores."
    }},
    { id: 7, text: "Si el equipo pasa por una mala racha, tú:", options: {
      A: "Sigues ahí porque así te enseñaron a sentirlo.",
      B: "Te mantienes crítico, porque sabes lo que debe representar.",
      C: "No abandonas, porque crees que la recompensa llegará.",
      D: "Confías en el proyecto y en el crecimiento interno."
    }},
    { id: 8, text: "¿Qué tipo de afición te identifica más?", options: {
      A: "Apasionada y profundamente leal.",
      B: "Exigente y protagonista.",
      C: "Fiel y resistente.",
      D: "Consciente y formativa."
    }},
    { id: 9, text: "Para ti, un equipo ideal es aquel que:", options: {
      A: "Representa a su gente dentro y fuera de la cancha.",
      B: "Marca la pauta y no sigue a nadie.",
      C: "Nunca deja de intentar.",
      D: "Tiene una identidad clara y coherente."
    }},
    { id: 10, text: "Al final del día, apoyas a un equipo porque:", options: {
      A: "Es parte de quién eres.",
      B: "Representa el máximo nivel.",
      C: "Refleja tu perseverancia.",
      D: "Conecta con tus valores personales."
    }},
  ];

 
  const state = {
    index: 0,
    answers: Array(QUESTIONS.length).fill(null), 
    scores: { A: 0, B: 0, C: 0, D: 0 }
  };

  function setLoading(isLoading, msg) {
    spinner.classList.toggle("d-none", !isLoading);
    statusEl.textContent = msg || (isLoading ? "Procesando..." : "Listo.");
  }

  function resetState() {
    state.index = 0;
    state.answers = Array(QUESTIONS.length).fill(null);
    state.scores = { A: 0, B: 0, C: 0, D: 0 };
  }

  function updateProgress() {
    const current = state.index + 1;
    const total = QUESTIONS.length;
    const pct = Math.round((current / total) * 100);
    progressLabel.textContent = `Pregunta ${current} de ${total}`;
    progressPct.textContent = `${pct}%`;
    progressBar.style.width = `${pct}%`;
  }

  function renderQuestion() {
    const q = QUESTIONS[state.index];
    updateProgress();

    questionText.textContent = q.text;
    optionsWrap.innerHTML = "";

    const savedChoice = state.answers[state.index]?.choiceKey || null;

    ["A", "B", "C", "D"].forEach((key) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-outline-light app-option";
      btn.textContent = `${key}) ${q.options[key]}`;

      if (savedChoice === key) btn.classList.add("active");

      btn.addEventListener("click", () => {
        state.answers[state.index] = { qId: q.id, choiceKey: key };

        [...optionsWrap.querySelectorAll("button")].forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        btnNext.disabled = false;
        statusEl.textContent = "Respuesta seleccionada. Puede continuar.";
      });

      optionsWrap.appendChild(btn);
    });

    btnBack.disabled = (state.index === 0);
    btnNext.disabled = !state.answers[state.index];
    statusEl.textContent = "Listo.";
  }

  function recalcScoresFromAnswers() {
    state.scores = { A: 0, B: 0, C: 0, D: 0 };
    for (const ans of state.answers) {
      if (!ans) continue;
      state.scores[ans.choiceKey] += 1;
    }
  }

  function determineWinner() {
    recalcScoresFromAnswers();

    const entries = Object.entries(state.scores);
    let max = -1;
    for (const [, score] of entries) max = Math.max(max, score);

    const tiedKeys = entries.filter(([, score]) => score === max).map(([k]) => k);
    if (tiedKeys.length === 1) return tiedKeys[0];

    for (let i = state.answers.length - 1; i >= 0; i--) {
      const ans = state.answers[i];
      if (ans && tiedKeys.includes(ans.choiceKey)) return ans.choiceKey;
    }
    return tiedKeys[0];
  }

  function launchConfetti() {
    if (typeof confetti !== "function") return;
    confetti({ particleCount: 140, spread: 80, origin: { y: 0.65 } });
    setTimeout(() => confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } }), 250);
    setTimeout(() => confetti({ particleCount: 90, spread: 90, origin: { y: 0.7 } }), 600);
  }

  function renderResult() {
    const winnerKey = determineWinner();
    const winner = ARCHETYPES[winnerKey];

    archetypeTitle.textContent = winner.title;
    revealText.textContent = winner.reveal;
    teamName.textContent = winner.team;

    
    teamNameSmall.textContent = `Perfil dominante: ${winner.title}`;

    
    if (teamImage) {
      teamImage.src = winner.image;
      teamImage.alt = winner.team;

      teamImage.onerror = () => {
        teamImage.removeAttribute("src");
        teamImage.alt = "No se encontró la imagen.";
      };
    }

    
    if (btnBuyJersey) {
      btnBuyJersey.href = `tienda.html`
    }

    quizView.classList.add("d-none");
    resultView.classList.remove("d-none");

    launchConfetti();
  }

  
  btnNext.addEventListener("click", () => {
    if (!state.answers[state.index]) return;

    setLoading(true, "Avanzando...");
    setTimeout(() => {
      setLoading(false);

      if (state.index < QUESTIONS.length - 1) {
        state.index += 1;
        renderQuestion();
      } else {
        renderResult();
      }
    }, 120);
  });

  btnBack.addEventListener("click", () => {
    if (state.index === 0) return;
    state.index -= 1;
    renderQuestion();
  });

  function restart() {
    resetState();
    quizView.classList.remove("d-none");
    resultView.classList.add("d-none");
    renderQuestion();
  }

  btnRestartTop.addEventListener("click", restart);
  btnRestartResult.addEventListener("click", restart);

  
  restart();
})();

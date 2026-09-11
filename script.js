// 一般常識クイズの問題バンク（全30問・4択形式）
const questionBank = [
  { questionText: "1年は何日ありますか？（うるう年を除く）", choices: ["360日", "365日", "366日", "364日"], correctIndex: 1 },
  { questionText: "日本の首都はどこですか？", choices: ["大阪", "京都", "東京", "横浜"], correctIndex: 2 },
  { questionText: "水が氷になる温度は何度ですか？（摂氏）", choices: ["0度", "10度", "-10度", "100度"], correctIndex: 0 },
  { questionText: "1週間は何日ですか？", choices: ["5日", "6日", "7日", "8日"], correctIndex: 2 },
  { questionText: "人間の体温の平熱はおよそ何度ですか？", choices: ["25度前後", "30度前後", "36度前後", "40度前後"], correctIndex: 2 },
  { questionText: "1時間は何分ですか？", choices: ["50分", "60分", "100分", "30分"], correctIndex: 1 },
  { questionText: "1分は何秒ですか？", choices: ["100秒", "30秒", "60秒", "90秒"], correctIndex: 2 },
  { questionText: "日本で一番高い山はどこですか？", choices: ["富士山", "北岳", "立山", "御嶽山"], correctIndex: 0 },
  { questionText: "世界で一番面積が広い海洋はどこですか？", choices: ["大西洋", "インド洋", "太平洋", "北極海"], correctIndex: 2 },
  { questionText: "虹は一般的に何色に分けられますか？", choices: ["5色", "6色", "7色", "8色"], correctIndex: 2 },
  { questionText: "1キログラムは何グラムですか？", choices: ["100グラム", "1000グラム", "10000グラム", "10グラム"], correctIndex: 1 },
  { questionText: "1メートルは何センチメートルですか？", choices: ["10センチ", "100センチ", "1000センチ", "50センチ"], correctIndex: 1 },
  { questionText: "こどもの日は何月何日ですか？", choices: ["4月29日", "5月3日", "5月5日", "5月4日"], correctIndex: 2 },
  { questionText: "日本の通貨の単位は何ですか？", choices: ["ドル", "ウォン", "円", "ユーロ"], correctIndex: 2 },
  { questionText: "信号機で「進んでよい」ことを示す色は何色ですか？", choices: ["赤", "黄", "青（緑）", "白"], correctIndex: 2 },
  { questionText: "日本国内の郵便番号は何桁ですか？", choices: ["5桁", "6桁", "7桁", "8桁"], correctIndex: 2 },
  { questionText: "1年のうち昼が最も長い日を何と呼びますか？", choices: ["夏至", "冬至", "春分", "秋分"], correctIndex: 0 },
  { questionText: "1年のうち夜が最も長い日を何と呼びますか？", choices: ["夏至", "冬至", "春分", "秋分"], correctIndex: 1 },
  { questionText: "日本の国花としてよく知られる花は何ですか？", choices: ["バラ", "桜", "チューリップ", "ひまわり"], correctIndex: 1 },
  { questionText: "1ダースは何個ですか？", choices: ["10個", "12個", "15個", "20個"], correctIndex: 1 },
  { questionText: "三角形の内角の和は何度ですか？", choices: ["90度", "180度", "270度", "360度"], correctIndex: 1 },
  { questionText: "四角形の内角の和は何度ですか？", choices: ["180度", "270度", "360度", "450度"], correctIndex: 2 },
  { questionText: "太陽系の惑星の中で、太陽に一番近い惑星はどれですか？", choices: ["地球", "金星", "水星", "火星"], correctIndex: 2 },
  { questionText: "お正月に食べる、餅の入った汁物料理を何と言いますか？", choices: ["お雑煮", "おでん", "けんちん汁", "豚汁"], correctIndex: 0 },
  { questionText: "世界で一番長い川はどこですか？", choices: ["アマゾン川", "ナイル川", "黄河", "長江"], correctIndex: 1 },
  { questionText: "1年を12等分した単位を何と言いますか？", choices: ["週", "月", "季節", "旬"], correctIndex: 1 },
  { questionText: "日本の義務教育は何年間ですか？", choices: ["6年間", "9年間", "12年間", "3年間"], correctIndex: 1 },
  { questionText: "「起承転結」は主に何の構成を表す言葉ですか？", choices: ["文章や物語", "料理の手順", "スポーツのルール", "建物の設計"], correctIndex: 0 },
  { questionText: "豆まきをする行事は次のうちどれですか？", choices: ["七夕", "節分", "花見", "お盆"], correctIndex: 1 },
  { questionText: "二進法で使われる数字は何種類ですか？", choices: ["2種類", "8種類", "10種類", "16種類"], correctIndex: 0 }
];

// 1回のクイズで出題する問題数
const QUIZ_LENGTH = 10;

// 状態管理用の変数
let quizQuestions = [];
let currentQuestionIndex = 0;
let correctAnswerCount = 0;
let hasAnswered = false;

// DOM要素の取得
const progressText = document.getElementById("progressText");
const questionScreen = document.getElementById("questionScreen");
const questionText = document.getElementById("questionText");
const choicesList = document.getElementById("choicesList");
const feedbackText = document.getElementById("feedbackText");
const nextButton = document.getElementById("nextButton");
const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");
const retryButton = document.getElementById("retryButton");

// 配列をシャッフルする（フィッシャー・イェーツ法）
function shuffleArray(sourceArray) {
  const shuffled = [...sourceArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 問題バンクから重複なくQUIZ_LENGTH問を選び出す
function pickQuizQuestions() {
  return shuffleArray(questionBank).slice(0, QUIZ_LENGTH);
}

// 問題を画面に表示する
function renderQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  hasAnswered = false;
  progressText.textContent = `第${currentQuestionIndex + 1}問 / 全${quizQuestions.length}問`;
  questionText.textContent = currentQuestion.questionText;
  feedbackText.textContent = "";
  feedbackText.className = "feedbackText";
  choicesList.innerHTML = "";

  currentQuestion.choices.forEach((choiceLabel, choiceIndex) => {
    const choiceButton = document.createElement("button");
    choiceButton.type = "button";
    choiceButton.className = "choiceButton";
    choiceButton.textContent = choiceLabel;
    choiceButton.addEventListener("click", () => handleChoiceClick(choiceIndex, choiceButton));
    choicesList.appendChild(choiceButton);
  });
}

// 選択肢がクリックされたときの処理
function handleChoiceClick(selectedIndex, selectedButton) {
  if (hasAnswered) {
    return;
  }
  hasAnswered = true;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.correctIndex;

  // 選択後はすべてのボタンを操作不可にする
  const allButtons = choicesList.querySelectorAll(".choiceButton");
  allButtons.forEach((button) => {
    button.disabled = true;
  });

  if (isCorrect) {
    correctAnswerCount++;
    selectedButton.classList.add("correctChoice");
    feedbackText.textContent = "正解です！";
    feedbackText.classList.add("correctFeedback");
  } else {
    selectedButton.classList.add("incorrectChoice");
    allButtons[currentQuestion.correctIndex].classList.add("correctChoice");
    feedbackText.textContent = "不正解です…";
    feedbackText.classList.add("incorrectFeedback");
  }
}

// 未回答のまま正解を表示し、不正解として確定する
function revealAsUnanswered() {
  hasAnswered = true;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const allButtons = choicesList.querySelectorAll(".choiceButton");
  allButtons.forEach((button) => {
    button.disabled = true;
  });
  allButtons[currentQuestion.correctIndex].classList.add("correctChoice");

  feedbackText.textContent = "未回答のため不正解です";
  feedbackText.classList.add("incorrectFeedback");
}

// 「次の問題へ」ボタンの処理
function handleNextButtonClick() {
  // 回答せずに次へ進もうとした場合は、まず不正解として確定させる
  if (!hasAnswered) {
    revealAsUnanswered();
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// 結果画面を表示する
function showResult() {
  questionScreen.hidden = true;
  resultScreen.hidden = false;
  scoreText.textContent = `${quizQuestions.length}問中${correctAnswerCount}問正解でした！`;
}

// クイズを最初からやり直す
function startQuiz() {
  quizQuestions = pickQuizQuestions();
  currentQuestionIndex = 0;
  correctAnswerCount = 0;
  resultScreen.hidden = true;
  questionScreen.hidden = false;
  renderQuestion();
}

// イベントリスナーの登録
nextButton.addEventListener("click", handleNextButtonClick);
retryButton.addEventListener("click", startQuiz);

// 初期表示
startQuiz();

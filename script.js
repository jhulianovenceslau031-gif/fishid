// Base de dados simulada dos peixes
const fishDatabase = {
  tucunare: {
    name: "Tucunaré Amarelo",
    scientificName: "Cichla ocellaris",
    description: "Peixe esportivo de água doce muito agressivo e territorial, famoso por seus ataques explosivos na superfície.",
    origin: "Bacia Amazônica e Araguaia-Tocantins (Introduzido no Sudeste)",
    diet: "Carnívoro (Predador ativo)",
    baitType: "Artificial (Preferencial) ou Viva",
    bestBaits: "Iscas de superfície (Popper, Zara), Shads e Tuviras",
    bestTime: "Início da manhã (06h às 09h) e fim de tarde (16h às 18h)",
    bestSeason: "Época de seca / Águas baixas (Setembro a Fevereiro)",
    social: "Solitário ou em Pares (Pequenos grupos)",
    tip: "Trabalhe a isca de superfície com toques rápidos. Quando o Tucunaré errar o bote, continue trabalhando a isca no mesmo ritmo."
  },
  tambaqui: {
    name: "Tambaqui",
    scientificName: "Colossoma macropomum",
    description: "Um dos maiores peixes de escama do Brasil. Possui forte dentição adaptada para quebrar sementes e frutos duros.",
    origin: "Bacias do Amazonas e Orinoco",
    diet: "Onívoro (Alimenta-se de frutos, sementes e pequenos organismos)",
    baitType: "Viva / Natural",
    bestBaits: "Massa de pesca, Ração passaguá, Goiaba, Salsicha e Miçangas",
    bestTime: "Horários mais quentes do dia (10h às 15h)",
    bestSeason: "Verão / Meses quentes",
    social: "Solitário ou pequenos grupos (Cardumes quando jovens)",
    tip: "Utilize boias cevadeiras para atrair o Tambaqui até a superfície em pesqueiros ou rios."
  },
  dourado: {
    name: "Dourado",
    scientificName: "Salminus brasiliensis",
    description: "Conhecido como 'O Rei do Rio'. Peixe extremamente valente, que dá saltos espetaculares fora da água ao ser fisgado.",
    origin: "Bacias do Prata, Paraná, Paraguai e São Francisco",
    diet: "Carnívoro (Piscívoro)",
    baitType: "Artificial e Viva",
    bestBaits: "Iscas de meia-água barulhentas, Corcovas, Tuviras e Lambaris",
    bestTime: "Amanhecer e durante corredeiras fortes",
    bestSeason: "Primavera e Verão (Período pré e pós piracema)",
    social: "Andam em Cardumes (Especialmente durante caçadas)",
    tip: "Sempre use empate de aço (encastoado), pois os dentes do Dourado cortam facilmente linhas de monofilamento."
  },
  tilapia: {
    name: "Tilápia do Nilo",
    scientificName: "Oreochromis niloticus",
    description: "Peixe de origem africana amplamente distribuído. É muito popular na pesca esportiva e na culinária.",
    origin: "Bacia do Rio Nilo (África) - Presente em todo o Brasil",
    diet: "Onívoro (Microalgas, plantas e pequenos insetos)",
    baitType: "Natural / Viva",
    bestBaits: "Massa tradicional, Minhoca, Milho e Bicho-da-seda",
    bestTime: "Início da manhã e final de tarde com águas calmas",
    bestSeason: "Ano todo (Mais ativa nas estações quentes)",
    social: "Vivem em Grandes Cardumes",
    tip: "A Tilápia é muito manhosa. Use anzóis pequenos, linhas finas e sensíveis com boias leves."
  },
  robalo: {
    name: "Robalo Flecha",
    scientificName: "Centropomus undecimalis",
    description: "Peixe euriatrativo (habita água salgada e salobra em mangues). Muito cobiçado pela astúcia e brigas técnicas.",
    origin: "Litoral do Atlântico ocidental (Estuários e Manguezais)",
    diet: "Carnívoro (Camarões e peixes menores)",
    baitType: "Artificial e Viva",
    bestBaits: "Camarão vivo, Shads com Jig Head, Plugs de meia-água",
    bestTime: "Mudanças de maré (Especialmente maré enchendo ou vazando)",
    bestSeason: "Outono e Inverno",
    social: "Solitário (Exemplares grandes) ou pequenos grupos",
    tip: "Busque estruturas como galhadas de mangue e pilares de pontes. O arremesso precisa ser preciso."
  }
};

// Elementos do DOM
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const dropzoneContent = document.getElementById('dropzoneContent');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const scannerBar = document.getElementById('scannerBar');
const btnScan = document.getElementById('btnScan');
const btnReset = document.getElementById('btnReset');
const resultSection = document.getElementById('resultSection');
const sampleButtons = document.querySelectorAll('.btn-sample');

// Imagens de exemplo para os testes rápidos
const sampleImages = {
  tucunare: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  tambaqui: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
  dourado: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=600&q=80",
  tilapia: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=600&q=80",
  robalo: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=600&q=80"
};

let currentFishKey = 'tucunare';

// Eventos de Upload
dropzone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      showPreview(event.target.result);
      // Escolhe um peixe aleatório para simular a leitura do arquivo enviado
      const keys = Object.keys(fishDatabase);
      currentFishKey = keys[Math.floor(Math.random() * keys.length)];
    };
    reader.readAsDataURL(file);
  }
});

// Drag & Drop
dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.style.borderColor = '#0284c7';
});

dropzone.addEventListener('dragleave', () => {
  dropzone.style.borderColor = '#334155';
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.style.borderColor = '#334155';
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = (event) => {
      showPreview(event.target.result);
      const keys = Object.keys(fishDatabase);
      currentFishKey = keys[Math.floor(Math.random() * keys.length)];
    };
    reader.readAsDataURL(file);
  }
});

// Botões de Exemplo
sampleButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const fishKey = btn.getAttribute('data-sample');
    currentFishKey = fishKey;
    showPreview(sampleImages[fishKey]);
  });
});

function showPreview(imageSrc) {
  imagePreview.src = imageSrc;
  dropzoneContent.classList.add('hidden');
  previewContainer.classList.remove('hidden');
  btnScan.disabled = false;
  resultSection.classList.add('hidden');
}

// Botão Identificar / Scanner
btnScan.addEventListener('click', () => {
  btnScan.disabled = true;
  scannerBar.classList.remove('hidden');

  // Simulação de tempo de processamento por IA (2 segundos)
  setTimeout(() => {
    scannerBar.classList.add('hidden');
    displayResults(fishDatabase[currentFishKey]);
    btnScan.classList.add('hidden');
    btnReset.classList.remove('hidden');
  }, 2000);
});

// Botão Reset
btnReset.addEventListener('click', () => {
  previewContainer.classList.add('hidden');
  dropzoneContent.classList.remove('hidden');
  resultSection.classList.add('hidden');
  btnScan.classList.remove('hidden');
  btnScan.disabled = true;
  btnReset.classList.add('hidden');
  fileInput.value = '';
});

// Exibir Resultados no DOM
function displayResults(fish) {
  document.getElementById('fishName').innerText = fish.name;
  document.getElementById('scientificName').innerText = fish.scientificName;
  document.getElementById('fishDescription').innerText = fish.description;
  document.getElementById('fishOrigin').innerText = fish.origin;
  document.getElementById('fishDiet').innerText = fish.diet;
  document.getElementById('baitType').innerText = fish.baitType;
  document.getElementById('bestBaits').innerText = fish.bestBaits;
  document.getElementById('bestTime').innerText = fish.bestTime;
  document.getElementById('bestSeason').innerText = fish.bestSeason;
  document.getElementById('socialBadge').innerHTML = `<i class="fa-solid fa-users"></i> ${fish.social}`;
  document.getElementById('fishingTip').innerText = fish.tip;

  // Porcentagem de precisão simulada entre 94% e 99%
  document.getElementById('confidenceScore').innerText = `${Math.floor(Math.random() * 6) + 94}%`;

  resultSection.classList.remove('hidden');
  resultSection.scrollIntoView({ behavior: 'smooth' });
}

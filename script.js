// --- БАЗА ДАННЫХ ДЛЯ ДИНАМИЧЕСКОГО РЕНДЕРИНГА ЧЕРЕЗ JS ---
const NATIONS_DATA = [
    { name: "Османская Империя", searchKey: "османская империя османы", badge: "easy", badgeText: "Новичок", desc: "Гегемон Ближнего Востока и Балкан. Уникальные механики янычар." },
    { name: "Франция", searchKey: "франция", badge: "easy", badgeText: "Новичок", desc: "Военный гегемон Западной Европы с мощными национальными идеями." },
    { name: "Кастилия → Испания", searchKey: "кастилия испания", badge: "easy", badgeText: "Новичок", desc: "Главная колониальная держава, золотые флоты и Реконкиста." },
    { name: "Московия → Россия", searchKey: "московия россия", badge: "easy", badgeText: "Новичок", desc: "Объединение русских земель и безграничная экспансия в Сибирь." },
    { name: "Австрия", searchKey: "австрия схри", badge: "medium", badgeText: "Средний", desc: "Император Священной Римской Империи. Мастер дипломатии и уний." },
    { name: "Англия → Великобритания", searchKey: "англия великобритания", badge: "medium", badgeText: "Средний", desc: "Владычица морей, парламент и Столетняя война." },
    { name: "Польша → Речь Посполитая", searchKey: "польша речь посполитая", badge: "medium", badgeText: "Средний", desc: "Выборная монархия, крылатые гусары и уния с Литвой." },
    { name: "Бранденбург → Пруссия", searchKey: "бранденбург пруссия", badge: "medium", badgeText: "Средний", desc: "Армия-государство с высочайшей дисциплиной в игре." },
    { name: "Византия", searchKey: "византия", badge: "hard", badgeText: "Сложно", desc: "Сложнейший старт на грани уничтожения. Восстановите Рим!" },
    { name: "Великий Мин", searchKey: "мин китай", badge: "hard", badgeText: "Сложно", desc: "Хранитель Небесного Мандата с огромным доходом и кризисами." },
    { name: "Ода → Япония", searchKey: "ода япония", badge: "hard", badgeText: "Сложно", desc: "Маленький даймё с невероятными военными идеями." },
    { name: "Ульм", searchKey: "ульм", badge: "easy", badgeText: "Новичок", desc: "Легендарный свободный имперский город. Бесконечный потенциал." }
];

const MONUMENTS_DATA = [
    { title: "Собор Святой Софии", location: "Константинополь", bonus: "+1 Терпимость к истинной вере, +10% Престиж" },
    { title: "Нотр-Дам де Пари", location: "Париж", bonus: "+15% Авторитет церкви, -10% Стоимость технологий" },
    { title: "Альгамбра", location: "Гранада", bonus: "+5% Дисциплина армии, +1 Дипломатическое отношение" },
    { title: "Запретный город", location: "Пекин", bonus: "+1 Небесный Мандат, -10% Стоимость советников" },
    { title: "Тадж-Махал", location: "Агра", bonus: "+10% Доход от налогов, -10% Стоимость провинций" },
    { title: "Пирамиды Гизы", location: "Каир", bonus: "+10% Престиж, +10% Скорость рекрутов" }
];

const LINKS_DATA = [
    { name: "Официальная EU4 Wiki", url: "https://eu4.paradoxwikis.com/" },
    { name: "Страница игры в Steam", url: "https://store.steampowered.com/app/236850/Europa_Universalis_IV/" },
    { name: "Сообщество Reddit (/r/eu4)", url: "https://reddit.com/r/eu4" },
    { name: "Steam Workshop Mods", url: "https://steamcommunity.com/app/236850/workshop/" }
];

// --- ИНИЦИАЛИЗАЦИЯ И РЕНДЕРИНГ ЧЕРЕЗ DOM API ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderNations(NATIONS_DATA);
    renderMonuments();
    renderLinks();
    initCalculators();
    initVisitorCounter();
});

// 1. Управление SPA-навигацией на JS
function initNavigation() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

            document.getElementById(targetId).classList.add('active');
            btn.classList.add('active');
        });
    });
}

// 2. Рендеринг списка стран с привязкой модальных окон
function renderNations(data) {
    const grid = document.getElementById('nations-grid');
    grid.innerHTML = '';

    data.forEach(nation => {
        const card = document.createElement('div');
        card.className = 'card nation-card';
        card.setAttribute('data-name', nation.searchKey);
        
        card.innerHTML = `
            <span class="badge ${nation.badge}">${nation.badgeText}</span>
            <h3>${nation.name}</h3>
            <p>${nation.desc}</p>
        `;

        // Клик открывает динамическое модальное окно на JS
        card.addEventListener('click', () => {
            openModal(nation.name, `${nation.desc} (Сложность: ${nation.badgeText}). Нажмите ESC или кнопку ниже для закрытия.`);
        });

        grid.appendChild(card);
    });
}

// 3. Рендеринг монументов
function renderMonuments() {
    const grid = document.getElementById('monuments-grid');
    grid.innerHTML = '';

    MONUMENTS_DATA.forEach(mon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="badge monument">${mon.location}</span>
            <h3>${mon.title}</h3>
            <p><strong>Бонусы:</strong> ${mon.bonus}</p>
        `;
        card.addEventListener('click', () => {
            openModal(mon.title, `Великое сооружение в провинции ${mon.location}. Эффекты: ${mon.bonus}`);
        });
        grid.appendChild(card);
    });
}

// 4. Рендеринг полезных ссылок
function renderLinks() {
    const list = document.getElementById('links-list');
    list.innerHTML = '';
    LINKS_DATA.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a> — Официальный ресурс сообщества.`;
        list.appendChild(li);
    });
}

// 5. Живой поиск по странам через JS фильтрацию массива
document.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'nation-search') {
        const query = e.target.value.toLowerCase();
        const filtered = NATIONS_DATA.filter(n => n.searchKey.includes(query));
        renderNations(filtered);
    }
});

// 6. Калькуляторы (AE и Дисциплина)
function initCalculators() {
    const aeDev = document.getElementById('ae-dev');
    const aeRel = document.getElementById('ae-rel');
    
    function updateAE() {
        const dev = parseFloat(aeDev.value) || 0;
        const mult = parseFloat(aeRel.value);
        const res = Math.round(dev * 0.75 * mult * 10) / 10;
        document.getElementById('ae-result').innerHTML = `Примерное Агрессивное Расширение: <strong>${res} AE</strong>`;
    }

    aeDev.addEventListener('input', updateAE);
    aeRel.addEventListener('change', updateAE);

    // Калькулятор дисциплины с перебором чекбоксов через JS
    const checkboxes = document.querySelectorAll('#discipline-checkboxes input[data-val]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            let total = 100;
            checkboxes.forEach(item => {
                if (item.checked) total += parseInt(item.getAttribute('data-val'));
            });
            document.getElementById('disc-result').innerHTML = `Итоговая Дисциплина: <strong>${total}%</strong>`;
        });
    });
}

// 7. Счётчик посещений на localStorage (показывает продвинутый JS)
function initVisitorCounter() {
    let visits = localStorage.getItem('eu4_visits') || 0;
    visits++;
    localStorage.setItem('eu4_visits', visits);
    document.getElementById('visitor-counter').innerHTML = `Вы открыли эту сессию браузера раз: <strong>#${visits}</strong>`;
}

// 8. Управление модальными окнами
function openModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    document.getElementById('modal').style.display = 'flex';
}

document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
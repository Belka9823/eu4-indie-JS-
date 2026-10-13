const { useState, useEffect } = React;

// Массивы данных для рендеринга через React JSX mapping
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

// Главный React Компонент (SPA Architecture)
function App() {
    const [currentSection, setCurrentSection] = useState('main');
    const [modalData, setModalData] = useState(null);
    
    // Состояние для калькулятора Агрессивного Расширения (AE State)
    const [aeDev, setAeDev] = useState(30);
    const [aeRel, setAeRel] = useState(1);
    
    // Состояние для живого поиска по странам
    const [searchQuery, setSearchQuery] = useState('');

    // Состояние для калькулятора Дисциплины
    const [discValues, setDiscValues] = useState({
        advisor: false,
        quality: false,
        weapon: false,
        monarch: false
    });

    // Хук useEffect для управления сессией (localStorage State)
    const [visits, setVisits] = useState(1);
    useEffect(() => {
        let v = parseInt(localStorage.getItem('eu4_react_visits') || '0') + 1;
        localStorage.setItem('eu4_react_visits', v);
        setVisits(v);
    }, []);

    const calcAE = Math.round(aeDev * 0.75 * aeRel * 10) / 10;
    
    const totalDiscipline = 100 + 
        (discValues.advisor ? 5 : 0) + 
        (discValues.quality ? 5 : 0) + 
        (discValues.weapon ? 5 : 0) + 
        (discValues.monarch ? 5 : 0);

    const filteredNations = NATIONS_DATA.filter(n => n.searchKey.includes(searchQuery.toLowerCase()));

    return (
        <div>
            {/* Навигационная панель (SPA Router Component) */}
            <header className="navbar">
                <div className="logo">👑 EU4 REACT SPA</div>
                <nav className="nav-links">
                    <button className={`nav-btn ${currentSection === 'main' ? 'active' : ''}`} onClick={() => setCurrentSection('main')}>Главная</button>
                    <button className={`nav-btn ${currentSection === 'nations' ? 'active' : ''}`} onClick={() => setCurrentSection('nations')}>Интересные страны</button>
                    <button className={`nav-btn ${currentSection === 'monuments' ? 'active' : ''}`} onClick={() => setCurrentSection('monuments')}>Великие постройки</button>
                    <button className={`nav-btn ${currentSection === 'mechanics' ? 'active' : ''}`} onClick={() => setCurrentSection('mechanics')}>Игровые механики</button>
                    <button className={`nav-btn ${currentSection === 'links' ? 'active' : ''}`} onClick={() => setCurrentSection('links')}>Полезные ссылки</button>
                </nav>
            </header>

            <main className="container">
                {/* РАЗДЕЛ 1: Главная */}
                {currentSection === 'main' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Europa Universalis IV (React SPA)</h1>
                            <p>Одностраничное веб-приложение (Single Page Application), спроектированное на React, JSX и Virtual DOM.</p>
                        </div>
                        <div className="card">
                            <h2>📜 Архитектура и State Management</h2>
                            <p>Приложение использует декларативный рендеринг, React Hooks (`useState`, `useEffect`) и персистентное состояние через `localStorage`.</p>
                            <div className="result-box" style={{marginTop: '15px'}}>
                                Количество открытий сессии (localStorage State): <strong>#{visits}</strong>
                            </div>
                        </div>
                        <div class="card">
                            <h2>⚖️ Калькулятор Агрессивного Расширения (AE)</h2>
                            <div className="calculator-grid">
                                <div>
                                    <label>Развитие провинций (Development):</label>
                                    <input type="number" value={aeDev} onChange={e => setAeDev(parseFloat(e.target.value) || 0)} min="1" />
                                </div>
                                <div>
                                    <label>Религия цели отличается?</label>
                                    <select value={aeRel} onChange={e => setAeRel(parseFloat(e.target.value))}>
                                        <option value="1">Да (Иноверцы / Христиане vs Мусульмане)</option>
                                        <option value="0.5">Нет (Одна религиозная группа)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="result-box">
                                Примерное Агрессивное Расширение (реактивный расчет): <strong>{calcAE} AE</strong>
                            </div>
                        </div>
                    </section>
                )}

                {/* РАЗДЕЛ 2: Интересные страны */}
                {currentSection === 'nations' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Интересные страны</h1>
                            <p>Каталог држав скомпилирован через JSX mapping с фильтрацией state в реальном времени.</p>
                        </div>
                        <div className="search-bar">
                            <input 
                                type="text" 
                                placeholder="Поиск страны через React State..." 
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="grid">
                            {filteredNations.map((nation, idx) => (
                                <div key={idx} className="card nation-card" onClick={() => setModalData(nation)}>
                                    <span className={`badge ${nation.badge}`}>{nation.badgeText}</span>
                                    <h3>{nation.name}</h3>
                                    <p>{nation.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* РАЗДЕЛ 3: Великие постройки */}
                {currentSection === 'monuments' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Великие постройки (Monuments)</h1>
                            <p>Интерактивные карточки монументов с вызовом React Modal по клику.</p>
                        </div>
                        <div className="grid">
                            {MONUMENTS_DATA.map((mon, idx) => (
                                <div key={idx} className="card" onClick={() => setModalData({name: mon.title, desc: `Провинция: ${mon.location}. Бонусы: ${mon.bonus}`})}>
                                    <span className="badge monument">{mon.location}</span>
                                    <h3>{mon.title}</h3>
                                    <p><strong>Бонусы:</strong> {mon.bonus}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* РАЗДЕЛ 4: Игровые механики */}
                {currentSection === 'mechanics' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Игровые механики</h1>
                            <p>Интерактивный расчет характеристик армии через React State.</p>
                        </div>
                        <div className="card">
                            <h2>⚔️ Калькулятор Дисциплины армии</h2>
                            <div className="checkbox-group">
                                <label><input type="checkbox" checked disabled /> Базовая дисциплина (100%)</label>
                                <label><input type="checkbox" checked={discValues.advisor} onChange={e => setDiscValues({...discValues, advisor: e.target.checked})} /> Советник Комендант (+5%)</label>
                                <label><input type="checkbox" checked={discValues.quality} onChange={e => setDiscValues({...discValues, quality: e.target.checked})} /> Идеи Качества (+5%)</label>
                                <label><input type="checkbox" checked={discValues.weapon} onChange={e => setDiscValues({...discValues, weapon: e.target.checked})} /> Политика «Качественное оружие» (+5%)</label>
                                <label><input type="checkbox" checked={discValues.monarch} onChange={e => setDiscValues({...discValues, monarch: e.target.checked})} /> Черта правителя «Военный гений» (+5%)</label>
                            </div>
                            <div className="result-box">
                                Итоговая Дисциплина (React State): <strong>{totalDiscipline}%</strong>
                            </div>
                        </div>
                    </section>
                )}

                {/* РАЗДЕЛ 5: Полезные ссылки */}
                {currentSection === 'links' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Полезные ссылки</h1>
                            <p>Динамически сгенерированный список внешних ресурсов сообщества.</p>
                        </div>
                        <div className="card">
                            <ul className="links-list">
                                {LINKS_DATA.map((l, idx) => (
                                    <li key={idx}><a href={l.url} target="_blank" rel="noreferrer">{l.name}</a> — Официальный ресурс.</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>

            {/* Модальное окно (React Modal State Component) */}
            {modalData && (
                <div className="modal-overlay" onClick={() => setModalData(null)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <h3>{modalData.name || modalData.title}</h3>
                        <p>{modalData.desc || `Провинция: ${modalData.location}. Бонусы: ${modalData.bonus}`}</p>
                        <button className="nav-btn" style={{marginTop: '15px'}} onClick={() => setModalData(null)}>Закрыть окно</button>
                    </div>
                </div>
            )}

            <footer className="footer">
                <p>© 1444–2026 <strong>Europa Universalis IV React SPA</strong>. Учебный проект с CI/CD автодеплоем и Virtual DOM.</p>
            </footer>
        </div>
    );
}

// Монтирование приложения в DOM через ReactDOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
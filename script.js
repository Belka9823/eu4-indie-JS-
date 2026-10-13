const { useState, useEffect } = React;

// База данных динамических компонентов
const DYNASTIES_DATA = [
    { name: "Династия Капетингов", realm: "Франция", trait: "Дипломатия", type: "diplomacy", desc: "Мастера династических браков и укрепления короны на западе." },
    { name: "Династия Рюриковичей", realm: "Киевская Русь", trait: "Интриги / Война", type: "intrigue", desc: "Раздробленные княжества, регулярные усобицы и борьба за престол." },
    { name: "Рюгенские Ярлы", realm: "Скандинавия", trait: "Военное дело", type: "martial", desc: "Языческие набеги на побережья Европы и захват заложников." },
    { name: "Династия Комнинов", realm: "Византия", trait: "Интриги", type: "intrigue", desc: "Сложные дворцовые заговоры, ослепление врагов и имперские посты." },
    { name: "Габсбурги", realm: "Священная Римская Империя", trait: "Дипломатия", type: "diplomacy", desc: "Начало великого возвышения через наследование дипломатическим путем." },
    { name: "Династия Аббасидов", realm: "Багдадский Халифат", trait: "Управление", type: "martial", desc: "Управление великими торговыми путями и религиозным единством." }
];

const LIFESTYLES_DATA = [
    { name: "Интриган (Intrigue)", perk: "Плетение заговоров, убранство шпионов, вымогательство и шантаж секретами." },
    { name: "Стратег (Martial)", perk: "Управление армиями, личные дуэли и проведение успешных осад замков." },
    { name: "Дипломат (Diplomacy)", perk: "Улучшение мнения вассалов, заключение союзов и организация пиров." },
    { name: "Управляющий (Stewardship)", perk: "Увеличение сбора налогов, строительство замков и расширение домена." }
];

const CK3_RESOURCES = [
    { title: "Официальная CK3 Wiki", link: "https://ck3.paradoxwikis.com/" },
    { title: "Страница игры в Steam", link: "https://store.steampowered.com/app/1158310/Crusader_Kings_III/" },
    { title: "Сообщество Reddit (/r/CrusaderKings)", link: "https://reddit.com/r/CrusaderKings" }
];

function App() {
    const [view, setView] = useState('home');
    const [modalInfo, setModalInfo] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');

    // State для калькулятора стресса
    const [dread, setDread] = useState(50);
    const [vassals, setVassals] = useState(5);

    // State для счетчика хроник через localStorage
    const [chronicleCount, setChronicleCount] = useState(1);
    useEffect(() => {
        let count = parseInt(localStorage.getItem('ck3_vault_visits') || '0') + 1;
        localStorage.setItem('ck3_vault_visits', count);
        setChronicleCount(count);
    }, []);

    const stressRisk = Math.max(0, Math.round((vassals * 12) - (dread * 0.5)));

    const filteredDynasties = DYNASTIES_DATA.filter(d => 
        d.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
        d.realm.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
        <div>
            <header className="navbar">
                <div className="logo">⚔️ CK3 DYNASTY VAULT</div>
                <nav className="nav-links">
                    <button className={`nav-btn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>Летопись</button>
                    <button className={`nav-btn ${view === 'dynasties' ? 'active' : ''}`} onClick={() => setView('dynasties')}>Великие Династии</button>
                    <button className={`nav-btn ${view === 'lifestyles' ? 'active' : ''}`} onClick={() => setView('lifestyles')}>Образы жизни</button>
                    <button className={`nav-btn ${view === 'calculators' ? 'active' : ''}`} onClick={() => setView('calculators')}>Калькулятор Страха</button>
                    <button className={`nav-btn ${view === 'resources' ? 'active' : ''}`} onClick={() => setView('resources')}>Манускрипты</button>
                </nav>
            </header>

            <main className="container">
                {/* 1. Главная */}
                {view === 'home' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Crusader Kings III (React Edition)</h1>
                            <p>Интерактивный свод знаний о средневековых династиях, интригах и управлении государством.</p>
                        </div>
                        <div className="card">
                            <h2>🏰 Хроники Совета</h2>
                            <p>Приложение работает как Single Page Application (SPA) с использованием Virtual DOM и React Hooks.</p>
                            <div className="result-box">
                                Открыто страниц летописи в этой сессии браузера: <strong>#{chronicleCount}</strong>
                            </div>
                        </div>
                    </section>
                )}

                {/* 2. Династии */}
                {view === 'dynasties' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Великие Династии</h1>
                            <p>Фильтрация родов и правящих домов в реальном времени через React State.</p>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Поиск династии или королевства..." 
                            value={filterQuery} 
                            onChange={e => setFilterQuery(e.target.value)}
                        />
                        <div className="grid" style={{marginTop: '20px'}}>
                            {filteredDynasties.map((d, i) => (
                                <div key={i} className="card" onClick={() => setModalInfo(d)}>
                                    <span className={`badge ${d.type}`}>{d.trait}</span>
                                    <h3>{d.name}</h3>
                                    <p><strong>Королевство:</strong> {d.realm}</p>
                                    <p>{d.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Образы жизни */}
                {view === 'lifestyles' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Образы жизни Правителя</h1>
                            <p>Древа навыков и специализации вашего монарха.</p>
                        </div>
                        <div className="grid">
                            {LIFESTYLES_DATA.map((l, i) => (
                                <div key={i} className="card" onClick={() => setModalInfo({name: l.name, desc: l.perk})}>
                                    <h3>{l.name}</h3>
                                    <p>{l.perk}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. Калькулятор */}
                {view === 'calculators' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Калькулятор Бунта Вассалов</h1>
                            <p>Рассчитайте риск фракционного заговора против вашей короны.</p>
                        </div>
                        <div className="card">
                            <h2>⚖️ Баланс Ужаса и Вассалов</h2>
                            <div className="calculator-grid">
                                <div>
                                    <label>Уровень Ужаса правителя (Dread 0-100):</label>
                                    <input type="number" value={dread} onChange={e => setDread(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label>Количество недовольных вассалов:</label>
                                    <input type="number" value={vassals} onChange={e => setVassals(Number(e.target.value))} />
                                </div>
                            </div>
                            <div className="result-box">
                                Вероятность фракционного восстания: <strong>{stressRisk}%</strong>
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. Ресурсы */}
                {view === 'resources' && (
                    <section className="section">
                        <div className="hero">
                            <h1>Древние Манускрипты</h1>
                            <p>Внешние ссылки на базы данных и сообщество.</p>
                        </div>
                        <div className="card">
                            <ul style={{listStyle: 'none'}}>
                                {CK3_RESOURCES.map((res, i) => (
                                    <li key={i} style={{marginBottom: '10px'}}>
                                        <a href={res.link} target="_blank" rel="noreferrer" style={{color: 'var(--royal-gold)', fontWeight: 'bold'}}>
                                            {res.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>

            {/* Modal Component */}
            {modalInfo && (
                <div className="modal-overlay" onClick={() => setModalInfo(null)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <h3>{modalInfo.name}</h3>
                        <p>{modalInfo.desc}</p>
                        <button className="nav-btn" style={{marginTop: '15px'}} onClick={() => setModalInfo(null)}>Закрыть свиток</button>
                    </div>
                </div>
            )}

            <footer className="footer">
                <p>© Crusader Kings III Dynasty Vault. React SPA Edition with CI/CD.</p>
            </footer>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
const { useState, useEffect } = React;

function App() {
    // SPA Навигация через React State
    const [tab, setTab] = useState('throne');

    // 1. Состояние для симулятора наследования (Succession Calculator State)
    const [heirsCount, setHeirsCount] = useState(2);
    const [realmSize, setRealmSize] = useState(15);
    const [successionLaw, setSuccessionLaw] = useState('partition'); // partition / primogeniture

    // 2. Состояние для калькулятора заговоров (Scheme Success Calculator State)
    const [agentIntrigue, setAgentIntrigue] = useState(18);
    const [targetSecr, setTargetSecr] = useState(10);

    // 3. Состояние для интерактивного списка членов династии с localStorage
    const [familyMembers, setFamilyMembers] = useState(() => {
        const saved = localStorage.getItem('ck3_family_ledger');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Король Альфонсо VI', title: 'Основатель династии', status: живой },
            { id: 2, name: 'Принцесса Елена', title: 'Наследница престола', status: жива }
        ];
    });
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('ck3_family_ledger', JSON.stringify(familyMembers));
    }, [familyMembers]);

    // 4. Счетчик сессий через localStorage
    const [sessionVisits, setSessionVisits] = useState(1);
    useEffect(() => {
        let visits = parseInt(localStorage.getItem('ck3_royal_visits') || '0') + 1;
        localStorage.setItem('ck3_royal_visits', visits);
        setSessionVisits(visits);
    }, []);

    // Расчеты для наследования
    const calculatedSplit = successionLaw === 'partition' 
        ? Math.round(realmSize / heirsCount) 
        : realm2SizeCheck = realmSize;

    // Расчет шансов заговора
    const schemeChance = Math.min(95, Math.max(5, (agentIntrigue * 3) - (targetSecr * 2) + 25));

    const addMember = (e) => {
        e.preventDefault();
        if(!newName) return;
        const newItem = { id: Date.now(), name: newName, title: newTitle || 'Придворный', status: 'Жив' };
        setFamilyMembers([...familyMembers, newItem]);
        setNewName('');
        setNewTitle('');
    };

    const removeMember = (id) => {
        setFamilyMembers(familyMembers.filter(m => m.id !== id));
    };

    return (
        <div className="app-layout">
            {/* Боковая панель (Sidebar Navigation) */}
            <aside className="sidebar">
                <div className="logo-area">
                    <h2>👑 ROYAL COURT</h2>
                    <p>CK3 Realm Manager</p>
                    <div style={{fontSize: '0.75rem', color: '#c5a059', background: '#241c30', padding: '6px', borderRadius: '4px', marginTop: '10px'}}>
                        Сессия в реестре: #{sessionVisits}
                    </div>
                </div>

                <nav className="nav-menu">
                    <button className={`nav-item ${tab === 'throne' ? 'active' : ''}`} onClick={() => setTab('throne')}>1. Тронный зал</button>
                    <button className={`nav-item ${tab === 'succession' ? 'active' : ''}`} onClick={() => setTab('succession')}>2. Наследование</button>
                    <button className={`nav-item ${tab === 'schemes' ? 'active' : ''}`} onClick={() => setTab('schemes')}>3. Интриги и Заговоры</button>
                    <button className={`nav-item ${tab === 'ledger' ? 'active' : ''}`} onClick={() => setTab('ledger')}>4. Летопись Династии</button>
                    <button className={`nav-item ${tab === 'vassals' ? 'active' : ''}`} onClick={() => setTab('vassals')}>5. Совет и Вассалы</button>
                </nav>

                <div className="footer-info">
                    React 18 SPA • Virtual DOM
                </div>
            </aside>

            {/* Основной контент (Main SPA Viewport) */}
            <main className="main-content">
                {tab === 'throne' && (
                    <section>
                        <h1 className="header-title">Тронный Зал Королевства</h1>
                        <p className="subtitle">Добро пожаловать в панель управления государством Crusader Kings III на базе React Virtual DOM.</p>
                        
                        <div className="grid-2">
                            <div className="card">
                                <h3>📜 Состояние Короны</h3>
                                <p>Здесь отображается сводная информация о стабильности вашего дома, уровне престижа и текущих угрозах со стороны соседей.</p>
                                <div className="stat-box">
                                    Статус династии: <strong>Процветающая</strong><br />
                                    Уровень благочестия: <strong>Набожный (+2)</strong>
                                </div>
                            </div>
                            <div className="card">
                                <h3>⚙️ Архитектура Приложения</h3>
                                <p>Этот проект реализован как SPA (Single Page Application) с использованием декларативного рендеринга и хуков состояния (`useState`, `useEffect`).</p>
                                <div className="stat-box">
                                    Хранилище: <strong>localStorage Active</strong>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {tab === 'succession' && (
                    <section>
                        <h1 className="header-title">Симулятор Наследования</h1>
                        <p className="subtitle">Рассчитайте раздел земель между наследниками в зависимости от выбранного закона.</p>
                        
                        <div className="card">
                            <h3>⚖️ Калькулятор раздела владений</h3>
                            <div className="grid-2">
                                <div>
                                    <label>Количество законных наследников:</label>
                                    <input type="number" min="1" max="10" value={heirsCount} onChange={e => setHeirsCount(Number(e.target.value))} />
                                    
                                    <label>Общий размер домена (графств):</label>
                                    <input type="number" min="1" max="50" value={realmSize} onChange={e => setRealmSize(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label>Закон престолонаследия:</label>
                                    <select value={successionLaw} onChange={e => setSuccessionLaw(e.target.value)}>
                                        <option value="partition">Равный раздел (Partition)</option>
                                        <option value="primogeniture">Первородство (Primogeniture)</option>
                                    </select>

                                    <div className="stat-box">
                                        {successionLaw === 'partition' ? (
                                            <span>Каждому наследнику достанется примерно по: <strong>{Math.floor(realmSize / heirsCount)} графств</strong></span>
                                        ) : (
                                            <span>Всё королевство целиком перейдет старшему наследнику: <strong>{realmSize} графств</strong></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {tab === 'schemes' && (
                    <section>
                        <h1 className="header-title">Интриги и Заговоры</h1>
                        <p className="subtitle">Оценка шансов на успешное устранение неугодного вассала или соперника.</p>
                        
                        <div className="card">
                            <h3>🗡️ Расчет шанса успеха заговора</h3>
                            <div className="grid-2">
                                <div>
                                    <label>Интрига тайного советника / агента:</label>
                                    <input type="number" value={agentIntrigue} onChange={e => setAgentIntrigue(Number(e.target.value))} />
                                    
                                    <label>Бдительность цели (Тайные знания):</label>
                                    <input type="number" value={targetSecr} onChange={e => setTargetSecr(Number(e.target.value))} />
                                </div>
                                <div>
                                    <div className="stat-box" style={{marginTop: '30px'}}>
                                        Итоговый шанс успеха интриги: <strong style={{color: '#d4af37', fontSize: '1.2rem'}}>{schemeChance}%</strong>
                                    </div>
                                    <p style={{fontSize: '0.85rem', color: '#b0a4be', marginTop: '10px'}}>
                                        *Значение рассчитывается реактивно через State формулу с ограничением от 5% до 95%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {tab === 'ledger' && (
                    <section>
                        <h1 className="header-title">Летопись Династии</h1>
                        <p className="subtitle">Интерактивный список членов семьи с сохранением в постоянную память браузера (localStorage).</p>
                        
                        <div className="card">
                            <h3>➕ Добавить персонажа в реестр дома</h3>
                            <form onSubmit={addMember}>
                                <div className="grid-2">
                                    <div>
                                        <label>Имя персонажа:</label>
                                        <input type="text" placeholder="Например: Герцог Роберт" value={newName} onChange={e => setNewName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Титул / Должность:</label>
                                        <input type="text" placeholder="Например: Маршал армии" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                                    </div>
                                </div>
                                <button type="submit" className="btn-royal">Вписать в Летопись</button>
                            </form>
                        </div>

                        <div className="card">
                            <h3>📜 Живые члены династии ({familyMembers.length})</h3>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
                                {familyMembers.map(m => (
                                    <div key={m.id} style={{background: '#181220', padding: '12px 15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #4a3860'}}>
                                        <div>
                                            <strong style={{color: '#d4af37'}}>{m.name}</strong> — <span style={{color: '#b0a4be'}}>{m.title}</span>
                                        </div>
                                        <button onClick={() => removeMember(m.id)} style={{background: '#5a189a', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem'}}>Удалить</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {tab === 'vassals' && (
                    <section>
                        <h1 className="header-title">Совет и Вассалы</h1>
                        <p className="subtitle">Справочная информация по ключевым аспектам феодальных отношений в CK3.</p>
                        
                        <div className="grid-2">
                            <div className="card">
                                <h3>🛡️ Военные обязательства</h3>
                                <p>Вассалы обязаны предоставлять фиксированный процент от своего ополчения и рыцарей в зависимости от контракта феода.</p>
                            </div>
                            <div class="card">
                                <h3>💰 Налоги и Сборы</h3>
                                <p>Размер налогов зависит от мнения вассала о сюзерене. Если мнение выше 0, выплаты поступают в полном объеме.</p>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

const [result, setResult] = useState<string | null>(null);

const calculate = () => {
    const r_annual = parseFloat(rate) / 100;
    const r_monthly = r_annual / 12;

    if (isNaN(r_annual)) return;

    let res = 0;

    if (mode === 'retirement' || mode === 'sip') {
        // Future Value of Series (SIP) + Future Value of Lump Sum (Current Savings)
        const years = mode === 'retirement' ? (parseFloat(retireAge) - parseFloat(currentAge)) : parseFloat(currentAge); // Reuse currentAge field for 'Years duration' in SIP mode
        const months = years * 12;

        const montlyInv = parseFloat(monthlySavings);
        const lumpsum = parseFloat(currentSavings) || 0;

        if (isNaN(years) || isNaN(montlyInv)) return;

        // FV(SIP) = P * [ (1+i)^n - 1 ] / i * (1+i) -- assume beginning of period
        const fv_sip = montlyInv * ((Math.pow(1 + r_monthly, months) - 1) / r_monthly) * (1 + r_monthly);

        // FV(Lumpsum) = P * (1+r)^t
        const fv_lumpsum = lumpsum * Math.pow(1 + r_annual, years);

        res = fv_sip + fv_lumpsum;
    } else if (mode === 'goal') {
        // Calculate required monthly savings to reach Goal
        // Goal = P * [ (1+i)^n - 1 ] / i * (1+i)
        // P = Goal / ( ... )
        const goal = parseFloat(goalAmount);
        const years = parseFloat(currentAge); // Reuse for duration
        const months = years * 12;

        if (isNaN(goal) || isNaN(years)) return;

        const factor = ((Math.pow(1 + r_monthly, months) - 1) / r_monthly) * (1 + r_monthly);
        res = goal / factor;
    }

    setResult(res.toFixed(2));
};

return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">

        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Retirement & Goals</h1>
            <p className="text-muted-foreground">Plan for your future.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar justify-center">
                {(['retirement', 'sip', 'goal'] as Mode[]).map(m => (
                    <button
                        key={m}
                        onClick={() => { setMode(m); setCurrentAge(''); setResult(null); }}
                        className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                            }`}
                    >
                        {m === 'sip' ? 'SIP Calculator' : m === 'goal' ? 'Goal Planner' : 'Retirement Plan'}
                    </button>
                ))}
            </div>

            <div className="max-w-md mx-auto space-y-6">
                {mode === 'goal' ? (
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Target Goal Amount</label>
                        <input type="number" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="1000000" />
                    </div>
                ) : null}

                {mode === 'retirement' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Current Age</label>
                            <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Retire Age</label>
                            <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Time Period (Years)</label>
                        <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="10" />
                    </div>
                )}

                {mode !== 'goal' && (
                    <>
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Monthly Investment</label>
                            <input type="number" value={monthlySavings} onChange={e => setMonthlySavings(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="500" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Current Lumpsum Savings</label>
                            <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="0" />
                        </div>
                    </>
                )}

                <div>
                    <label className="text-sm font-semibold mb-2 block">Expected Annual Return (%)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="12" />
                </div>

                <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                    Calculate
                </button>

                {result && (
                    <div className="bg-secondary/20 p-6 rounded-2xl text-center border-2 border-dashed border-border mt-6">
                        <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                            {mode === 'goal' ? 'Required Monthly Savings' : 'Estimated Corpus Value'}
                        </div>
                        <div className="text-4xl font-extrabold text-foreground">${result}</div>
                    </div>
                )}
            </div>
        </div>
        {/* SEO Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none mt-16 bg-secondary/10 p-8 rounded-2xl border border-border/50">
            <h2>Retirement Planning: The Power of Starting Early</h2>
            <p>
                Retirement planning is not about "saving money"; it is about <strong>replacing your income</strong>.
                The <strong>UnitMaster Retirement Planner</strong> helps you calculate the "Corpus" (total pot of money) you need to survive without a salary.
            </p>

            <h3>Concept: The 4% Rule</h3>
            <p>
                A popular rule of thumb in finance is the "4% Rule". It states that you can safely withdraw 4% of your retirement savings each year (adjusted for inflation) without ever running out of money.
            </p>
            <ul>
                <li>If you need $40,000/year to live, you need a corpus of $1,000,000.</li>
                <li>If you need $100,000/year to live, you need a corpus of $2,500,000.</li>
            </ul>

            <h3>The Magic of Compounding</h3>
            <p>
                Albert Einstein reputedly called Compound Interest the "Eighth Wonder of the World".
                <br />
                <em>Example:</em> If you save $500/month starting at age 25, you might have $1.7 million by age 65 (at 10% return).
                If you wait until age 35 to start saving the same amount, you will only have $600,000.
                <strong>The 10-year delay costs you over $1 million.</strong>
            </p>

            <h3>Inflation: The Silent Killer</h3>
            <p>
                $1 million today will not buy $1 million worth of goods in 30 years.
                If inflation averages 3% per year, the purchasing power of your money halves every 24 years.
                Our calculator helps you factor this in by allowing you to adjust your "Expected Return" (try using a "Real Rate of Return" relative to inflation).
            </p>
        </div>
    </div>
);
}

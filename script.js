// 最新 Fortune Global 500 數據
const companyData = [
    { rank: 1, name: "Walmart (沃爾瑪)", country: "美國", revenue: 6809.8, growth: 5.1 },
    { rank: 2, name: "Amazon (亞馬遜)", country: "美國", revenue: 6379.5, growth: 11.0 },
    { rank: 3, name: "State Grid (中國國家電網)", country: "中國", revenue: 5484.1, growth: 0.5 },
    { rank: 4, name: "Saudi Aramco (沙烏地阿美)", country: "沙烏地阿拉伯", revenue: 4801.9, growth: -3.0 },
    { rank: 5, name: "China National Petroleum (中國石油)", country: "中國", revenue: 4126.4, growth: -2.2 },
    { rank: 6, name: "Sinopec Group (中國石化)", country: "中國", revenue: 4074.9, growth: -5.2 },
    { rank: 7, name: "UnitedHealth Group (聯合健康)", country: "美國", revenue: 4002.7, growth: 7.7 },
    { rank: 8, name: "Apple (蘋果)", country: "美國", revenue: 3910.3, growth: 2.0 },
    { rank: 9, name: "CVS Health (西維斯健康)", country: "美國", revenue: 3728.0, growth: 4.2 },
    { rank: 10, name: "Berkshire Hathaway (波克夏)", country: "美國", revenue: 3714.3, growth: 1.9 }
];

// 1. 動態渲染表格
const tbody = document.querySelector("#companyTable tbody");
companyData.forEach(company => {
    const growthClass = company.growth >= 0 ? "positive-growth" : "negative-growth";
    const growthSign = company.growth >= 0 ? `+${company.growth}` : `${company.growth}`;
    
    const row = `
        <tr>
            <td>${company.rank}</td>
            <td><strong>${company.name}</strong></td>
            <td>${company.country}</td>
            <td>$${company.revenue.toLocaleString()}</td>
            <td class="${growthClass}">${growthSign}%</td>
        </tr>
    `;
    tbody.innerHTML += row;
});

// 2. 初始化 Chart.js 雙軸混合圖表
const ctx = document.getElementById('revenueChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: companyData.map(c => c.name.split(" ")[0]), // 簡化圖表標籤
        datasets: [
            {
                label: '年營收 (億美元)',
                data: companyData.map(c => c.revenue),
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1,
                yAxisID: 'y-revenue',
            },
            {
                label: '年成長率 (%)',
                data: companyData.map(c => c.growth),
                type: 'line',
                borderColor: '#e67e22',
                backgroundColor: '#e67e22',
                fill: false,
                tension: 0.2,
                yAxisID: 'y-growth',
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            'y-revenue': {
                type: 'linear',
                position: 'left',
                title: { display: true, text: '營收 (億美元)' }
            },
            'y-growth': {
                type: 'linear',
                position: 'right',
                title: { display: true, text: '成長率 (%)' },
                grid: { drawOnChartArea: false } // 隱藏右側格線，畫面才不會亂
            }
        }
    }
});

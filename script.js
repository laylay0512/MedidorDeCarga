function calcular() {
    const E = parseFloat(document.getElementById('campo').value);
    const m = parseFloat(document.getElementById('massa').value);
    const ang = parseFloat(document.getElementById('angulo').value);

    const resultado = document.getElementById('resultado');

    // Validação dos campos
    if (isNaN(E) || isNaN(m) || isNaN(ang)) {
        resultado.innerHTML = `<span style="color: #ff8080;">Por favor, preencha todos os campos corretamente!</span>`;
        return;
    }

    // Limpa mensagem anterior
    resultado.innerHTML = "";

    const angRad = ang * Math.PI / 180;
    const g = 9.8;

    const q = (m * g * Math.tan(angRad)) / E;

    resultado.innerHTML = `A carga na esfera é aproximadamente <b>${q.toExponential(3)} C</b>`;

    // Animação do fio
    const string = document.getElementById('string');
    string.style.transform = `rotate(${ang}deg)`;

    // Atualiza gráfico
    grafico.data.labels.push(ang);
    grafico.data.datasets[0].data.push(q);
    grafico.update();
}

// Configuração do gráfico Chart.js
const ctx = document.getElementById('grafico').getContext('2d');
const grafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Carga (C)',
            data: [],
            borderColor: '#00ffd5',
            backgroundColor: 'rgba(0, 255, 213, 0.2)',
            tension: 0.3,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ângulo (graus)',
                    color: 'white'
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Carga (C)',
                    color: 'white'
                },
                ticks: {
                    color: 'white'
                }
            }
        }
    }
});
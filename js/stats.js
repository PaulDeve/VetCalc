/**
 * MÓDULO: ESTADÍSTICAS
 * Descripción: Dashboard con estadísticas y gráficos
 * Archivo: js/stats.js
 */

class StatsModule {
    constructor() {
        this.canvas = document.getElementById('drugsChart');
        this.chartLegend = document.getElementById('chartLegend');
        this.exportButton = document.getElementById('exportButton');
        this.clearButton = document.getElementById('clearButton');

        this.init();
    }

    /**
     * Inicializa el módulo
     */
    init() {
        this.attachEventListeners();
        this.updateStats();
    }

    /**
     * Adjunta eventos
     */
    attachEventListeners() {
        window.addEventListener('calculationSaved', () => this.updateStats());
        window.addEventListener('vaccineSaved', () => this.updateStats());
        
        this.exportButton.addEventListener('click', () => this.exportData());
        this.clearButton.addEventListener('click', () => this.clearAllData());
    }

    /**
     * Actualiza todas las estadísticas
     */
    updateStats() {
        this.updateCounters();
        this.drawChart();
    }

    /**
     * Actualiza los contadores
     */
    updateCounters() {
        // Tratamientos
        const calculations = window.calculator ? window.calculator.getCalculationHistory() : [];
        const totalTreatments = calculations.length;
        this.animateCounter('totalTreatments', totalTreatments);

        // Vacunas
        const vaccines = window.vaccines ? window.vaccines.getVaccineRecords() : [];
        const totalVaccines = vaccines.length;
        this.animateCounter('totalVaccines', totalVaccines);

        // Vacunas próximas
        const vaccineStats = window.vaccines ? window.vaccines.getStatistics() : {};
        const upcomingVaccines = vaccineStats.upcoming || 0;
        this.animateCounter('upcomingVaccines', upcomingVaccines);
    }

    /**
     * Anima un contador con incremento progresivo
     * @param {string} elementId - ID del elemento
     * @param {number} target - Valor objetivo
     */
    animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        const current = parseInt(element.textContent) || 0;
        
        if (current === target) return;

        const increment = target > current ? 1 : -1;
        const steps = Math.min(20, Math.abs(target - current));
        const stepValue = Math.abs(target - current) / steps;
        let value = current;

        const interval = setInterval(() => {
            value += stepValue * increment;
            
            if ((increment > 0 && value >= target) || (increment < 0 && value <= target)) {
                element.textContent = target;
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(value);
            }
        }, 30);
    }

    /**
     * Dibuja el gráfico de medicamentos más usados
     */
    drawChart() {
        const calculations = window.calculator ? window.calculator.getCalculationHistory() : [];
        
        // Contar uso de medicamentos
        const drugUsage = {};
        for (const calc of calculations) {
            drugUsage[calc.drug] = (drugUsage[calc.drug] || 0) + 1;
        }

        // Ordenar y tomar top 5
        const sortedDrugs = Object.entries(drugUsage)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        if (sortedDrugs.length === 0) {
            this.drawEmptyChart();
            this.chartLegend.innerHTML = '';
            return;
        }

        // Colores para el gráfico
        const colors = [
            '#2E7D32', '#1565C0', '#FF6F00', '#C62828', '#6A1B9A'
        ];

        const ctx = this.canvas.getContext('2d');
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Limpiar canvas
        ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
        ctx.fillRect(0, 0, width, height);

        // Dibujar gráfico de barras
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const maxValue = Math.max(...sortedDrugs.map(d => d[1]));
        const barWidth = chartWidth / (sortedDrugs.length * 1.5);

        // Dibujar barras
        sortedDrugs.forEach((drug, index) => {
            const barHeight = (drug[1] / maxValue) * chartHeight;
            const x = padding + (index * (barWidth * 1.5)) + barWidth * 0.25;
            const y = height - padding - barHeight;

            // Barra
            ctx.fillStyle = colors[index];
            ctx.fillRect(x, y, barWidth, barHeight);

            // Valor en la barra
            ctx.fillStyle = '#212121';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(drug[1], x + barWidth / 2, y - 5);

            // Etiqueta (girada)
            ctx.save();
            ctx.translate(x + barWidth / 2, height - padding + 10);
            ctx.rotate(-Math.PI / 4);
            ctx.fillStyle = '#757575';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'right';
            const shortName = drug[0].length > 15 ? drug[0].substring(0, 15) + '...' : drug[0];
            ctx.fillText(shortName, 0, 0);
            ctx.restore();
        });

        // Dibujar eje X
        ctx.strokeStyle = '#EEEEEE';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Dibujar eje Y
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(padding, padding);
        ctx.stroke();

        // Leyenda
        this.drawLegend(sortedDrugs, colors);
    }

    /**
     * Dibuja un gráfico vacío
     */
    drawEmptyChart() {
        const ctx = this.canvas.getContext('2d');
        const width = this.canvas.width;
        const height = this.canvas.height;

        ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#757575';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Sin datos de tratamientos', width / 2, height / 2);

        ctx.font = '12px sans-serif';
        ctx.fillText('Realiza cálculos de dosis para ver estadísticas', width / 2, height / 2 + 25);
    }

    /**
     * Dibuja la leyenda del gráfico
     * @param {Array} drugs - Datos de medicamentos
     * @param {Array} colors - Colores
     */
    drawLegend(drugs, colors) {
        const html = drugs.map((drug, index) => {
            return `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${colors[index]}"></div>
                    <span>${drug[0]} (${drug[1]})</span>
                </div>
            `;
        }).join('');

        this.chartLegend.innerHTML = html;
    }

    /**
     * Exporta todos los datos a JSON
     */
    exportData() {
        const exportData = {
            exportDate: new Date().toISOString(),
            app: 'VetCalc v1.0',
            calculations: window.calculator ? window.calculator.getCalculationHistory() : [],
            vaccines: window.vaccines ? window.vaccines.getVaccineRecords() : [],
            statistics: {
                calculations: window.calculator ? window.calculator.getStatistics() : {},
                vaccines: window.vaccines ? window.vaccines.getStatistics() : {}
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = `VetCalc_Export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Confirmación visual
        const originalText = this.exportButton.textContent;
        this.exportButton.textContent = '✅ Exportado';
        setTimeout(() => {
            this.exportButton.textContent = originalText;
        }, 2000);
    }

    /**
     * Limpia todos los datos
     */
    clearAllData() {
        const confirmed = confirm(
            '⚠️ ADVERTENCIA: Esto eliminará todos los datos guardados (cálculos y vacunas).\n' +
            '¿Estás completamente seguro?'
        );

        if (!confirmed) return;

        const confirmed2 = confirm('Esta acción no se puede deshacer. ¿Continuar?');
        if (!confirmed2) return;

        // Limpiar datos
        localStorage.removeItem('calculationHistory');
        localStorage.removeItem('vaccineRecords');

        alert('✅ Todos los datos han sido eliminados');

        // Recargar página
        location.reload();
    }

    /**
     * Obtiene un resumen quick de estadísticas
     * @returns {Object} Resumen
     */
    getSummary() {
        return {
            totalTreatments: window.calculator ? window.calculator.getCalculationHistory().length : 0,
            totalVaccines: window.vaccines ? window.vaccines.getVaccineRecords().length : 0,
            upcomingVaccines: window.vaccines ? window.vaccines.getStatistics().upcoming : 0
        };
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.stats = new StatsModule();
    });
} else {
    window.stats = new StatsModule();
}

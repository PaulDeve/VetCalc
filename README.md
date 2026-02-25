# VetCalc - Asistente Veterinario Profesional

Aplicación web moderna, responsive y offline-first para profesionales veterinarios. Diseñada con enfoque mobile-first y lista para convertirse en APK.

## 🎯 Características Principales

### ✅ Calculadora de Posología
- **9 medicamentos** veterinarios más utilizados configurados
- Cálculo automático de dosis por kg de peso
- Soporte para **5 especies** (Perro, Gato, Oveja, Conejo, Aves)
- Validaciones avanzadas y advertencias clínicas
- Historial guardado automáticamente

**Medicamentos incluidos:**
- Pen Duo Strep 250/200
- Dexalan 500 mL
- Catosal 100 mL
- Meloxisan Pets 50mL
- Entomic 10% 100 mL
- Biomizona 100 mL
- Hepatin
- Bio-C
- Vigantol Biovalgina 250 mL

### 💉 Gestión de Vacunas
- Registro de vacunas aplicadas
- Cálculo automático de próximas dosis
- Estados: Vigente, Próxima, Vencida
- Edición y eliminación de registros
- Alertas para vacunas próximas (14 días)

**Vacunas base por especie:**
- **Perros:** Parvovirus, Moquillo, Rabia
- **Gatos:** Triple Felina, Rabia
- **Ovejas:** Clostridiales
- **Conejos:** Mixomatosis, VHD
- **Aves:** Newcastle

### 📊 Estadísticas
- Contadores animados de tratamientos y vacunas
- Gráfico de medicamentos más utilizados (Canvas nativo)
- Vacunas próximas a vencer
- Exportación de datos a JSON
- Limpiar base de datos

## 🎨 Diseño & Experiencia

### Paleta de Colores Clínica
- **Verde Clínico:** #2E7D32 (Primario)
- **Azul Médico:** #1565C0 (Secundario)
- **Gris Claro:** #F5F5F5 (Fondo)
- **Blanco:** #FFFFFF (Limpio)

### Características de UX
- ✨ Transiciones suaves fade + slide
- 🎯 Botones táctiles optimizados para móvil
- 🌙 Modo oscuro con toggle automático
- ♿ Animaciones reducidas para accesibilidad
- 📱 Diseño 100% responsive
- 🚀 Cero scroll horizontal

### Animaciones
- Contadores animados
- Efecto elevation en tarjetas
- Microinteracciones táctiles
- Loader animado
- Transiciones de secciones

## 📱 Responsive & Móvil

La aplicación está **optimizada para Android**:
- Viewport optimizado para WebView
- No permite zoom (prevenido)
- Gestures nativas del sistema
- Botones táctiles grandes (mín. 44x44px)
- Tipografía legible en cualquier tamaño
- Sin scroll horizontal

## 🔒 Almacenamiento Local

### LocalStorage
- Historial de cálculos (máx 50)
- Registros de vacunas (máx 200)
- Preferencias de tema

### Datos Guardados Quedan

Los datos se guardan de manera persistente:
```json
{
  "calculationHistory": [...],
  "vaccineRecords": [...],
  "theme-preference": "light|dark"
}
```

## 📦 Conversión a APK

Para convertir a APK:

### Opción 1: Android Studio + WebView
```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<activity>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</activity>
```

### Opción 2: Apache Cordova
```bash
cordova create VetCalc
cd VetCalc
cordova platform add android
cordova plugin add cordova-plugin-whitelist
# Copiar archivos al directorio www/
cordova build android
```

### Opción 3: Capacitor (Recomendado)
```bash
npm install -g @ionic/cli
ionic start VetCalc
ionic capacitor add android
ionic capacitor build android
```

## 💾 Estructura de Archivos

```
VetCalc/
├── index.html              # Estructura HTML completa
├── css/
│   └── styles.css         # Estilos responsive + animaciones
├── js/
│   ├── app.js             # Aplicación principal
│   ├── drugs-core.js      # Base de datos de medicamentos
│   ├── calculator.js      # Lógica calculadora
│   ├── vaccines.js        # Lógica gestión vacunas
│   └── stats.js           # Lógica estadísticas
├── manifest.json          # Configuración PWA
├── sw.js                  # Service Worker (Offline)
└── README.md             # Este archivo
```

## 🚀 Uso

### Abrir en Navegador
1. Abrir `index.html` en un navegador web
2. La aplicación se ejecutará completamente offline

### Instalar como PWA
1. Abrir en Android Chrome
2. Menú → "Instalar aplicación"
3. La aplicación se instala como app nativa

### Usar Offline
- Una vez abierta por primera vez, se cachea automáticamente
- Toda la funcionalidad funciona sin internet
- Los datos se guardan localmente

## 🔧 Requisitos Técnicos

✅ **Cumplidos:**
- [x] HTML puro (sin frameworks)
- [x] CSS puro (sin frameworks)
- [x] JavaScript vanilla (sin librerías externas)
- [x] Funciona 100% offline
- [x] Responsive mobile-first
- [x] Preparado para APK
- [x] Sin CDN externos
- [x] Rápido y ligero (~200KB total)

## 🧮 Ejemplos de Uso

### Calcular Dosis

```
1. Seleccionar especie: Perro
2. Ingresa peso: 25 kg
3. Selecciona medicamento: Pen Duo Strep 250/200
4. Clic en "Calcular Dosis"
5. Resultado: 1.0 mL C/12h IM
```

### Registrar Vacuna

```
1. Ir a sección Vacunas → Registrar
2. Especie: Perro
3. Vacuna: Parvovirus
4. Fecha: Hoy
5. Próxima dosis: Automática (+365 días)
```

### Ver Estadísticas

```
1. Ir a sección Estadísticas
2. Ver contadores en tiempo real
3. Gráfico de medicamentos más usados
4. Alertas de vacunas próximas
```

## 🐛 Consideraciones

### Limitaciones Intencionales
- No requiere autenticación (es local)
- No tiene conexión a servidor (funciona offline)
- Datos solo en el dispositivo (privacidad)

### Extensiones Futuras
- Sincronización en la nube
- Múltiples pacientes
- Recordatorios de vacunas
- Reportes personalizables
- API REST

## 📝 API Pública

### Funciones Disponibles Globalmente

```javascript
// Calculadora
calculator.getCalculationHistory()
calculator.getStatistics()
calculator.clearHistory()

// Vacunas
vaccines.getVaccineRecords()
vaccines.getStatistics()
vaccines.deleteVaccine(id)
vaccines.editVaccine(id)

// Estadísticas
stats.getSummary()
stats.exportData()
stats.clearAllData()

// Medicamentos (core)
getDrug(drugId)
getAllDrugs()
getDrugsBySpecies(species)
calculateDose(drugId, species, weight)
```

## 🖼️ Capturas

### Calculadora
- Formulario limpio con validaciones
- Resultado con dosis exacta y advertencias

### Vacunas
- Tabs para registrar y ver historial
- Estados visuales de cada vacuna
- Botones de editar/eliminar

### Estadísticas
- Grid de contadores animados
- Gráfico interactivo con Canvas
- Botones de exportar/limpiar

## 📱 Compatibilidad

| Navegador | Desktop | Móvil | Offline |
|-----------|---------|-------|---------|
| Chrome    | ✅      | ✅    | ✅      |
| Firefox   | ✅      | ✅    | ✅      |
| Safari    | ✅      | ✅    | ✅      |
| Edge      | ✅      | ✅    | ✅      |
| Android   | -       | ✅    | ✅      |
| iOS       | -       | ✅    | ✅      |

## 📄 Licencia

Esta aplicación es de código abierto y libre para usar y modificar.

## 📞 Soporte

Para reportar bugs o sugerencias, contacta al desarrollador.

---

**VetCalc v1.0.0** | Hecho con ❤️ para profesionales veterinarios

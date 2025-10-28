// Находим наш <canvas> в HTML по его id
const canvas = document.getElementById('stars-canvas');
// Получаем "контекст" для рисования. Будем рисовать в 2D
const ctx = canvas.getContext('2d');

// Устанавливаем размер холста равным размеру окна браузера
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

// --- Настройки для звезд ---
const STAR_COUNT = 300; // Количество звезд
const STAR_COLOR = 'white';
const STAR_RADIUS_MIN = 0.2; // Минимальный радиус стал меньше
const STAR_RADIUS_MAX = 1.2; // Максимальный радиус стал меньше
const TWINKLE_SPEED = 0.05; // Скорость мерцания

// Массив, в котором будем хранить все наши звезды
let stars = [];

// Функция для создания одной звезды
function createStar() {
    return {
        x: Math.random() * canvas.width,   // случайная позиция по X
        y: Math.random() * canvas.height,  // случайная позиция по Y
        radius: Math.random() * (STAR_RADIUS_MAX - STAR_RADIUS_MIN) + STAR_RADIUS_MIN, // случайный радиус
        alpha: Math.random(),             // начальная прозрачность (для эффекта мерцания)
        twinkle: Math.random() * TWINKLE_SPEED * (Math.random() > 0.5 ? 1 : -1) // направление мерцания (увеличение или уменьшение прозрачности)
    };
}

// Заполняем массив звездами
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
}

// --- Цикл анимации ---
function animate() {
    // Очищаем холст перед каждым кадром
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Проходим по каждой звезде в массиве
    stars.forEach(star => {
        // Обновляем прозрачность звезды
        star.alpha += star.twinkle;

        // Если звезда стала совсем невидимой или слишком яркой, меняем направление мерцания
        if (star.alpha < 0 || star.alpha > 1) {
            star.twinkle = -star.twinkle;
        }

        // Рисуем звезду
ctx.beginPath();

// --- СТРОКИ ДЛЯ СВЕЧЕНИЯ ---
ctx.shadowBlur = 5; // Насколько сильно "размывать" тень (это и есть свечение)
ctx.shadowColor = 'white'; // Цвет свечения
// ------------------------------------

ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
ctx.fill();
    });

    // Запрашиваем у браузера нарисовать следующий кадр. Это создает плавную анимацию.
    requestAnimationFrame(animate);
}

// Запускаем анимацию
animate();

// Добавляем обработчик события, чтобы при изменении размера окна холст подстраивался
window.addEventListener('resize', setCanvasSize);

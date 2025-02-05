class Workout {
    constructor(date, time, duration, exercise) {
        this.date = date;
        this.time = time;
        this.duration = parseInt(duration, 10);
        this.exercise = exercise;
    }
}

class WorkoutManager {
    constructor() {
        this.workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    }

    addWorkout(workout) {
        this.workouts.push(workout);
        this.saveToLocalStorage();
    }

    updateWorkout(index, updatedWorkout) {
        this.workouts[index] = updatedWorkout;
        this.saveToLocalStorage();
    }

    deleteWorkout(index) {
        this.workouts.splice(index, 1);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }

    getWorkouts() {
        return this.workouts;
    }

    getExerciseDurations(filteredWorkouts) {
        return filteredWorkouts.reduce((acc, workout) => {
            acc[workout.exercise] = (acc[workout.exercise] || 0) + workout.duration;
            return acc;
        }, {});
    }

    filterWorkoutsByMonth(month) {
        return this.workouts.filter(workout => workout.date.startsWith(month));
    }

    clearWorkouts() {
        this.workouts = [];
        this.saveToLocalStorage();
    }
}

const workoutManager = new WorkoutManager();
const form = document.getElementById('workoutForm');
const historyBody = document.getElementById('history');
const exportJsonButton = document.getElementById('exportJson');
const importJsonButton = document.getElementById('importJson');
const editSelectedButton = document.getElementById('editSelected');
const deleteSelectedButton = document.getElementById('deleteSelected');
const applyFilterButton = document.getElementById('applyFilter');
const monthFilter = document.getElementById('monthFilter');
const workoutChartCanvas = document.getElementById('workoutChart');
let workoutChart;

renderHistory(workoutManager.getWorkouts());
renderChart(workoutManager.getWorkouts());

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const duration = document.getElementById('duration').value;
    const exercise = document.getElementById('exercise').value;

    const workout = new Workout(date, time, duration, exercise);
    workoutManager.addWorkout(workout);

    renderHistory(workoutManager.getWorkouts());
    renderChart(workoutManager.getWorkouts());
    form.reset();
});

applyFilterButton.addEventListener('click', () => {
    const month = monthFilter.value;
    const filteredWorkouts = workoutManager.filterWorkoutsByMonth(month);
    renderHistory(filteredWorkouts);
    renderChart(filteredWorkouts);
});

exportJsonButton.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workoutManager.getWorkouts(), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'workouts.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
});

importJsonButton.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedWorkouts = JSON.parse(e.target.result);
            workoutManager.clearWorkouts();
            importedWorkouts.forEach(workout => workoutManager.addWorkout(new Workout(workout.date, workout.time, workout.duration, workout.exercise)));
            renderHistory(workoutManager.getWorkouts());
            renderChart(workoutManager.getWorkouts());
        };
        reader.readAsText(file);
    });
    fileInput.click();
});

editSelectedButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.select-workout:checked');
    if (checkboxes.length !== 1) {
        alert('Vyber vždy pouze jeden záznam pro editaci.');
        return;
    }

    const index = parseInt(checkboxes[0].dataset.index, 10);
    const workout = workoutManager.getWorkouts()[index];

    document.getElementById('date').value = workout.date;
    document.getElementById('time').value = workout.time;
    document.getElementById('duration').value = workout.duration;
    document.getElementById('exercise').value = workout.exercise;

    workoutManager.deleteWorkout(index);
    renderHistory(workoutManager.getWorkouts());
    renderChart(workoutManager.getWorkouts());
});

deleteSelectedButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.select-workout:checked');
    checkboxes.forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index, 10);
        workoutManager.deleteWorkout(index);
    });
    renderHistory(workoutManager.getWorkouts());
    renderChart(workoutManager.getWorkouts());
});

function renderHistory(workouts) {
    historyBody.innerHTML = '';
    workouts.forEach((workout, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="select-workout" data-index="${index}"></td>
            <td>${workout.date}</td>
            <td>${workout.time}</td>
            <td>${workout.duration}</td>
            <td>${workout.exercise}</td>
        `;
        historyBody.appendChild(row);
    });
}

function renderChart(workouts) {
    const exerciseDurations = workoutManager.getExerciseDurations(workouts);
    const labels = Object.keys(exerciseDurations);
    const durations = Object.values(exerciseDurations);

    if (workoutChart) {
        workoutChart.destroy();
    }

    workoutChart = new Chart(workoutChartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Celkový čas podle cvičení (minuty)',
                data: durations,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

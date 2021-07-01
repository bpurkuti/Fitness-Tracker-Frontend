const routine = {
    routineId : 0,
    username : "",
    routineName : "",
    dateScheduled : 0,
    dateCompleted : 0
}

const routineExercise = {
    routineExerciseId : 0,
    exerciseName : "",
    routineId : 0,
    duration : 0,
    reps : 0,
    sets : 0,
    weight : 0
}


function routineName(){
    document.getElementById("routinename").innerHTML = "Test Routine"
}
routineName()

async function getRoutine(){
    //fetch all Routine Exercises for id currRid
    const response = await fetch(`ROUTE/routines/${sessionStorage.getItem(currRid)}/exercises`)
    const exercises = await response.json()

    for(let i of exercises){

    }
}

//Will be async to retrieve the vid url. 
//Will then have to append the link to fit this format:
//Stackoverflow solution: https://stackoverflow.com/questions/20498831/refused-to-display-in-a-frame-because-it-set-x-frame-options-to-sameorigin
function video(){
    url = "https://www.youtube.com/embed/dQw4w9WgXcQ"
    
    document.getElementById("video").src = url
}
video()
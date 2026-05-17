const fileMenu = document.getElementById("fileMenu");

fileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    fileMenu.classList.toggle("active");
});

document.addEventListener("click", () => {
    fileMenu.classList.remove("active");
});

function newFile() {
    console.log("New File");
    // TODO: integrate with editor
}

function openFile() {
    console.log("Open File");
    // TODO: file picker
}

function saveFile() {
    console.log("Save File");
    // TODO: save logic
}

function saveAsFile() {
    console.log("Save File");
    // TODO: save logic
}

function closeApp() {
    console.log("Exit");
}
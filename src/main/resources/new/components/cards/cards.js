let cardIdCounter = 0;

const workspace = document.getElementById("workspace");

const editors = {};

function newCard(isDefault = false) {
    const id = cardIdCounter++;

    const card = document.createElement("div");
    card.className = "card";
    card.style.left = "80px";
    card.style.top = "80px";

    card.innerHTML = `
        <div class="card-header" data-id="${id}">
            <span>Editor ${id}</span>
            <span class="card-close" onclick="removeCard(${id})">✕</span>
        </div>

        <div class="tab-bar" id="tabs-${id}">
            <div class="tab active" onclick="switchTab(${id}, 0)">main.rs</div>
            <div class="tab" onclick="newTab(${id})">+</div>
        </div>

        <div class="editor-container" id="editor-${id}"></div>
    `;

    workspace.appendChild(card);

    makeDraggable(card);

    initEditor(id, isDefault);
}

function removeCard(id) {
    const card = document.querySelector(`.card-header[data-id="${id}"]`)?.parentElement;

    if (card) card.remove();

    if (editors[id]) {
        editors[id].editor.dispose();
        delete editors[id];
    }
}

function makeDraggable(card) {
    const header = card.querySelector(".card-header");

    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    header.addEventListener("mousedown", (e) => {
        dragging = true;

        const rect = card.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        card.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const workspaceRect = workspace.getBoundingClientRect();

        let x = e.clientX - workspaceRect.left - offsetX;
        let y = e.clientY - workspaceRect.top - offsetY;

        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        card.style.zIndex = 1;
    });
}

function initEditor(containerId) {
    require(["vs/editor/editor.main"], function () {

        const container = document.getElementById(containerId);

        monaco.editor.create(container, {
            value: `// Main Editor\nfn main() {\n    println!("Hello Layout IDE");\n}`,
            language: "javascript",
            theme: "vs-dark",
            automaticLayout: true
        });
    });
}

function newTab(cardId) {
    const state = editors[cardId];
    if (!state) return;

    const tabIndex = state.tabs.length;

    const name = `file${tabIndex}.js`;

    const model = monaco.editor.createModel(
        "// new file",
        "javascript"
    );

    state.tabs.push({ name, model });

    const tabsBar = document.getElementById(`tabs-${cardId}`);

    const tab = document.createElement("div");
    tab.className = "tab";
    tab.innerText = name;
    tab.onclick = () => switchTab(cardId, tabIndex);

    tabsBar.insertBefore(tab, tabsBar.lastElementChild);

    switchTab(cardId, tabIndex);
}

function switchTab(cardId, index) {
    const state = editors[cardId];
    if (!state) return;

    state.activeTab = index;

    const tabBar = document.getElementById(`tabs-${cardId}`);
    const tabs = tabBar.querySelectorAll(".tab");

    tabs.forEach((t, i) => {
        if (i === index) t.classList.add("active");
        else t.classList.remove("active");
    });

    const model = state.tabs[index].model;
    state.editor.setModel(model);
}

newCard(true);
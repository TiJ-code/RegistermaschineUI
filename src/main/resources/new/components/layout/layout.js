function createPanel(title, id) {
    const panel = document.createElement("div");
    panel.className = "panel";

    panel.innerHTML = `
        <div class="panel-header">${title}</div>
        <div class="panel-body" id="${id}"></div>
    `;

    return panel;
}

/* =========================
   SPLITTER ENGINE
========================= */

function createSplitter(type, onDrag) {
    const el = document.createElement("div");

    el.className = type === "row" ? "splitter-row" : "splitter-col";

    let isDown = false;

    el.addEventListener("mousedown", (e) => {
        isDown = true;
        document.body.style.cursor =
            type === "row" ? "col-resize" : "row-resize";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        onDrag(e);
    });

    window.addEventListener("mouseup", () => {
        isDown = false;
        document.body.style.cursor = "default";
    });

    return el;
}

/* =========================
   EDITOR INIT
========================= */

function initEditor(containerId) {
    const container = document.getElementById(containerId);

    require(["vs/editor/editor.main"], function () {
        monaco.editor.create(container, {
            value: `// IDE\nfn main() {\n    println!("Hello");\n}`,
            language: "javascript",
            theme: "vs-dark",
            automaticLayout: true
        });
    });
}

/* =========================
   LAYOUT BUILD
========================= */

window.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    const root = document.createElement("div");
    root.className = "row";

    
    const left = document.createElement("div");
    left.className = "panel";
    left.style.flex = "3";

    left.innerHTML = `
        <div class="panel-header">Editor</div>
        <div class="panel-body" id="editor-host"></div>
    `;

    
    const split1 = createSplitter("row", (e) => {
        const rect = root.getBoundingClientRect();

        const min = 150;
        const max = rect.width - 150;

        let newLeftWidth = e.clientX - rect.left;

        newLeftWidth = Math.max(min, Math.min(max, newLeftWidth));

        left.style.flex = "0 0 " + newLeftWidth + "px";
    });

    
    const middle = document.createElement("div");
    middle.className = "col";
    middle.style.flex = "1";

    const env = createPanel("Environment", "env-host");
    const splitMid = createSplitter("col", (e) => {
        const rect = middle.getBoundingClientRect();

        let newTopHeight = e.clientY - rect.top;

        const min = 80;
        const max = rect.height - 80;

        newTopHeight = Math.max(min, Math.min(max, newTopHeight));

        env.style.flex = "0 0 " + newTopHeight + "px";
    });

    const memory = createPanel("Memory", "memory-host");
    memory.style.opacity = "0";

    middle.appendChild(env);
    middle.appendChild(splitMid);
    middle.appendChild(memory);

    
    const split2 = createSplitter("row", (e) => {
        const rect = root.getBoundingClientRect();

        let newRightWidth = rect.right - e.clientX;

        const min = 150;
        const max = rect.width - 150;

        newRightWidth = Math.max(min, Math.min(max, newRightWidth));

        right.style.flex = "0 0 " + newRightWidth + "px";
    });

    
    const right = document.createElement("div");
    right.className = "col";
    right.style.flex = "1";

    const registers = createPanel("Registers", "reg-host");
    right.appendChild(registers);
    
    root.appendChild(left);
    root.appendChild(split1);
    root.appendChild(middle);
    root.appendChild(split2);
    root.appendChild(right);

    app.appendChild(root);

    initEditor("editor-host");
});
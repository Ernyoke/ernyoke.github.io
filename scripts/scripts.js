function getCurrentTheme() {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        return currentTheme;
    } else {
        // try to detect default colorscheme of the system
        const isDarkMode = () =>
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode()) {
            return "dark";
        }
    }

    return "light";
}

function setHighlightJsTheme() {
    if (getCurrentTheme() === "dark") {
        document.querySelector(`link[title="light"]`).setAttribute("disabled", "disabled");
        document.querySelector(`link[title="dark"]`).removeAttribute("disabled");
    } else {
        document.querySelector(`link[title="light"]`).removeAttribute("disabled");
        document.querySelector(`link[title="dark"]`).setAttribute("disabled", "disabled");
    }
}

function createUtterancesIFrame() {
    const id = "utterances";
    const elements = document.getElementsByClassName(id);
    if (elements.length > 0) {
        const placeholder = elements[0];
        const scriptTag = document.createElement("script");
        scriptTag.src = "https://utteranc.es/client.js";
        scriptTag.async = true;
        scriptTag.crossOrigin = "anonymous";
        scriptTag.setAttribute("repo", 'Ernyoke/ernyoke.github.io');
        scriptTag.setAttribute("issue-term", "url");
        scriptTag.setAttribute("label", "Comment");
        scriptTag.setAttribute("theme", getCurrentTheme() === "dark" ? "github-dark" : "github-light");
        scriptTag.setAttribute("id", id);
        placeholder.parentNode.replaceChild(scriptTag, placeholder);
    }
}

function setUtterancesTheme() {
    const theme = getCurrentTheme() === 'dark' ? 'github-dark' : 'github-light'
    const message = {
        type: 'set-theme',
        theme: theme
    };
    const iframe = document.querySelector('.utterances-frame');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(message, '*');
    }
}

function switchTheme() {
    const themeSelector = document.getElementById("themeSwitcher");

    if (document.documentElement.getAttribute("data-theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        themeSelector.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        themeSelector.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    }

    document.documentElement.setAttribute("data-theme", getCurrentTheme());
    setHighlightJsTheme();
    setUtterancesTheme();
}

window.onload = () => {
    setHighlightJsTheme();
    createUtterancesIFrame();

    const themeSelector = document.getElementById("themeSwitcher");

    if (themeSelector) {
        themeSelector.classList.remove("fa-circle");
        if (getCurrentTheme() == "dark") {
            themeSelector.classList.add("fa-sun");
        } else {
            themeSelector.classList.add("fa-moon");
        }
    }
};
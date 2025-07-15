export const Router = {
  init: () => {
    document.querySelectorAll("a.nav-link").forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        const url = new URL(event.currentTarget.href).pathname;
        Router.go(url);
      });
    });
    window.addEventListener("popstate", (e) => {
      Router.go(e.state.route, false);
    });
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("h1");
        pageElement.textContent = "HOME";
        break;
      case "/levels":
        pageElement = document.createElement("levels-page");

        break;

      case "/progress":
        pageElement = document.createElement("progress-page");
        break;
      case "/results":
        pageElement = document.createElement("");

        break;

      case "/settings":
        pageElement = document.createElement("");

        break;
      case "/about":
        pageElement = document.createElement("");
        break;

      default:
        if (route.startsWith("/trainer-")) {
          pageElement = document.createElement("trainer-page");
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.id = paramId;
        }
        break;
    }

    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      document.querySelector("main").append(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;

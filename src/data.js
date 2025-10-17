const DEBUG = true;

export const WIDTH_WHEN_SIDEBAR_HIDES = 600;
export const MAX_TAG_LENGTH = 12;

export const ROOT_PATHNAME = "/ToDoApp-WEB/";
export const SETTINGS_PATHNAME = ROOT_PATHNAME + "settings";

export const API_ROUTES = DEBUG
    ? {
          authenticate:
              "http://localhost:8000/authentication/validation/access_token",
          refresh:
              "http://localhost:8000/authentication/validation/refresh_token",
          register: "http://localhost:8000/authentication/register",
          login: "http://localhost:8000/authentication/login",
          signout: "http://localhost:8000/authentication/signout",
          update_username: "http://localhost:8000/authentication/user/username",
          create_note: "http://localhost:8000/notes",
          get_notes: "http://localhost:8000/notes",
          update_note: "http://localhost:8000/notes",
          delete_note: "http://localhost:8000/notes",
          get_username: "http://localhost:8000/authentication/username",
      }
    : {
          authenticate:
              "https://todoapp-api-hy80.onrender.com/authentication/validation/access_token",
          refresh:
              "https://todoapp-api-hy80.onrender.com/authentication/validation/refresh_token",
          register:
              "https://todoapp-api-hy80.onrender.com/authentication/register",
          login: "https://todoapp-api-hy80.onrender.com/authentication/login",
          signout:
              "https://todoapp-api-hy80.onrender.com/authentication/signout",
          update_username:
              "https://todoapp-api-hy80.onrender.com/authentication/user/username",
          create_note: "https://todoapp-api-hy80.onrender.com/notes",
          get_notes: "https://todoapp-api-hy80.onrender.com/notes",
          update_note: "https://todoapp-api-hy80.onrender.com/notes",
          delete_note: "https://todoapp-api-hy80.onrender.com/notes",
          get_username: "https://todoapp-api-hy80.onrender.com/username",
      };

export const SECTION_NAME_BY_KEY = {
    not_completed: "Not completed",
    completed: "Completed",
    trash: "Trash",
};

export const INDICATOR_ICON_PATH_BY_STATUS = {
    not_completed: "./icons/timer.svg",
    completed: "./icons/check.svg",
    trash: "./icons/trashEmpty.svg",
};

const _colors_by_tags = window.localStorage.getItem("colors_by_tags");
export const colors_by_tags = _colors_by_tags
    ? JSON.parse(_colors_by_tags)
    : {
          All: "#5b5b5b",
          colornotfound: "#505050",
      };
if (!_colors_by_tags)
    window.localStorage.setItem(
        "colors_by_tags",
        JSON.stringify(colors_by_tags)
    );

export function UpdateColorsByTags(_colors_by_tags) {
    Object.assign(colors_by_tags, _colors_by_tags);
    window.localStorage.setItem(
        "colors_by_tags",
        JSON.stringify(colors_by_tags)
    );
}

const _config = window.localStorage.getItem("config");
export const config = _config
    ? JSON.parse(_config)
    : {
          theme: "light",
      };
if (!_config) window.localStorage.setItem("config", JSON.stringify(config));

export function UpdateConfig(_config) {
    Object.assign(config, _config);
    window.localStorage.setItem("config", JSON.stringify(config));
}

const getUsername = async () => {
    const response = await fetch(API_ROUTES.get_username, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log("Getting username:", data);

    if (data.success) {
        window.localStorage.setItem("username", data.username);
        return data.username;
    } else {
        window.localStorage.setItem("username", "Username");
        return "Username";
    }
};

const _username = window.localStorage.getItem("username");
export let username = _username ? _username : getUsername();

export const updateUsername = (_username) => (username = _username);

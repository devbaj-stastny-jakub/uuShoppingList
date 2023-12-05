import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "welcome": "Welcome to React and react-i18next"
        }
    },
    cz: {
        translation: {
            navmenu: {
                home: "Domů",
                lists: "Nákupní seznamy",
                login: "Přihlásit se",
                logout: "Odhlásit se"
            },
            shopping_lists: {
                active: "Aktivní",
                archived: "Archivované",
                add_list: "Přidat seznam",
                modal: {
                    delele_message: "Opravdu si přejete smazat nákupní seznam?",
                    delete: "Smazat"
                },
                cancel: "Zrušit",
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "cz",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

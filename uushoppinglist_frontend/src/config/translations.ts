import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            navmenu: {
                home: "Home",
                lists: "Shopping Lists",
                login: "Log In",
                logout: "Log Out"
            },
            shopping_lists: {
                active: "Active",
                archived: "Archived",
                add_list: "Add List",
                modal: {
                    delele_message: "Do you really want to delete the shopping list?",
                    delete: "Delete"
                },
                cancel: "Cancel",
            },
            shopping_list_detail: {
                unsolved: "Unsolved",
                everything: "Everything",
                add_item: "Add Item",
                modal: {
                    type_new_name: "Enter item name",
                    new_name: "iceberg lettuce (3 pcs)",
                    cancel: "Cancel",
                    create: "Create"
                },
                actions: {
                    rename: "Rename",
                    description: "Edit Description",
                    archive: "Archive",
                    unarchive: "Unarchive",
                    users: "User Management",
                    delete: "Delete",
                    rename_modal: {
                        title: "Rename List",
                        cancel: "Cancel",
                        rename: "Rename"
                    },
                    description_modal: {
                        title: "Edit List Description",
                        cancel: "Cancel",
                        edit: "Edit"
                    },
                    users_modal: {
                        title: "User Management",
                        owner: "Owner",
                        member: "Member",
                        add: "Add"
                    },
                }
            }
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
            },
            shopping_list_detail: {
                unsolved: "Nevyřešené",
                everything: "Všechny",
                add_item: "Přidat položku",
                modal: {
                    type_new_name: "Zadejte jméno položky",
                    new_name: "ledový salát (3ks)",
                    cancel: "Zrušit",
                    create: "Vytvořit"
                },
                actions: {
                    rename: "Přejmenovat",
                    description: "Upravit popis",
                    archive: "Archivovat",
                    unarchive: "Odarchivovat",
                    users: "Správa uživatelů",
                    delete: "Smazat",
                    rename_modal: {
                        title: "Přejmenovat seznam",
                        cancel: "Zrušit",
                        rename: "přejmenovat"
                    },
                    description_modal: {
                        title: "Upravit popis seznamu",
                        cancel: "Zrušit",
                        edit: "Upravit"
                    },
                    users_modal: {
                        title: "Správa uživatelů",
                        owner: "Majitel",
                        member: "Člen",
                        add: "Přidat"
                    },
                }
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

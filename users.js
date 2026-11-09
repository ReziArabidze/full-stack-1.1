'use strict';

// 🌐 მომხმარებლების მონაცემები პირდაპირ კოდში (API-ს გარეშე, რომ პირდაპირ რუნდეს)
let allUsers = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874"
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
        }
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771"
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains"
        }
    },
    {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        address: {
            street: "Douglas Extension",
            suite: "Suite 847",
            city: "McKenziehaven",
            zipcode: "59590-4157"
        },
        phone: "1-463-123-4447",
        website: "ramiro.info",
        company: {
            name: "Romaguera-Jacobson",
            catchPhrase: "Face to face bifurcated interface",
            bs: "e-enable strategic applications"
        }
    },
    {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        address: {
            street: "Hoeger Mall",
            suite: "Apt. 692",
            city: "South Elvis",
            zipcode: "53919-4257"
        },
        phone: "493-170-9623 x156",
        website: "kale.biz",
        company: {
            name: "Robel-Corkery",
            catchPhrase: "Multi-tiered zero tolerance productivity",
            bs: "transition cutting-edge web services"
        }
    },
    {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        address: {
            street: "Skiles Walks",
            suite: "Suite 351",
            city: "Roscoeview",
            zipcode: "33263"
        },
        phone: "(254)954-1289",
        website: "demarco.info",
        company: {
            name: "Keebler LLC",
            catchPhrase: "User-centric fault-tolerant solution",
            bs: "revolutionize end-to-end systems"
        }
    },
    {
        id: 6,
        name: "Mrs. Dennis Schulist",
        username: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info",
        address: {
            street: "Norberto Crossing",
            suite: "Apt. 950",
            city: "South Christy",
            zipcode: "23505-1337"
        },
        phone: "1-477-935-8478 x6430",
        website: "ola.org",
        company: {
            name: "Considine-Lockman",
            catchPhrase: "Synchronised bottom-line interface",
            bs: "e-enable innovative applications"
        }
    },
    {
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        address: {
            street: "Rex Trail",
            suite: "Suite 280",
            city: "Howemouth",
            zipcode: "58800-1099"
        },
        phone: "210.067.6132",
        website: "elvis.io",
        company: {
            name: "Johns Group",
            catchPhrase: "Configurable multimedia task-force",
            bs: "generate enterprise e-tailers"
        }
    },
    {
        id: 8,
        name: "Nicholas Runolfsdottir V",
        username: "Maxime_Nienow",
        email: "Sherwood@rosamond.me",
        address: {
            street: "Ellsworth Summit",
            suite: "Suite 729",
            city: "Aliyaview",
            zipcode: "45169"
        },
        phone: "586.493.6943 x140",
        website: "jacynthe.com",
        company: {
            name: "Abernathy Group",
            catchPhrase: "Implemented secondary concept",
            bs: "e-enable extensible e-commerce"
        }
    },
    {
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        email: "Chaim_McDermott@dana.io",
        address: {
            street: "Dayna Park",
            suite: "Suite 449",
            city: "Bartholomebury",
            zipcode: "76495-3109"
        },
        phone: "(775)976-6794 x41206",
        website: "conrad.com",
        company: {
            name: "Yost and Sons",
            catchPhrase: "Switchable contextually-based project",
            bs: "aggregate real-time technologies"
        }
    },
    {
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        address: {
            street: "Kattie Turnpike",
            suite: "Suite 198",
            city: "Lebsackbury",
            zipcode: "31428-2261"
        },
        phone: "024-648-380",
        website: "ambrose.net",
        company: {
            name: "Hoeger LLC",
            catchPhrase: "Centralized empowering task-force",
            bs: "target end-to-end models"
        }
    }
];

/**
 * როდესაც DOM ჩაიტვირთება, გავუშვათ მომხმარებლების ინიციალიზაცია
 */
document.addEventListener('DOMContentLoaded', () => {
    initUsers();
    setupSearchFilter();
});

/**
 * მომხმარებლების ჩატვირთვის სიმულაცია და რენდერი
 */
function initUsers() {
    const container = document.getElementById('users-container');
    const statusCounter = document.getElementById('users-counter');

    if (container) {
        showLoadingState(container);
    }

    // მცირე დაყოვნება (setTimeout) რეალური API-ს ჩატვირთვის იმიტაციისთვის
    setTimeout(() => {
        try {
            // 1. მომხმარებლების სახელების დალოგვა კონსოლში
            logUsersToConsole(allUsers);

            // 2. UI-ს განახლება
            if (container) {
                renderUsers(allUsers, container);
            }

            if (statusCounter) {
                statusCounter.textContent = `${allUsers.length} მომხმარებელი`;
            }

        } catch (error) {
            console.error('❌ შეცდომა მომხმარებლების დამუშავებისას:', error);

            if (container) {
                showErrorState(container, error.message);
            }
        }
    }, 400);
}

/**
 * მომხმარებლის სახელების დეტალური დალოგვა ბრაუზერის კონსოლში
 * @param {Array} users 
 */
function logUsersToConsole(users) {
    console.group('👥 მომხმარებლების სია (Local Data)');
    console.log(`✅ წარმატებით ჩაიტვირთა ${users.length} მომხმარებელი:`);

    users.forEach((user, index) => {
        console.log(`${index + 1}. სახელი: "${user.name}" | იუზერნეიმი: @${user.username} | ელ-ფოსტა: ${user.email}`);
    });

    const userNames = users.map(user => user.name);
    console.log('📋 მომხმარებლების სახელების სია (Array):', userNames);

    console.table(users.map(u => ({
        ID: u.id,
        'სახელი (name)': u.name,
        'იუზერნეიმი (username)': u.username,
        'ელ-ფოსტა': u.email,
        'ქალაქი': u.address?.city,
        'კომპანია': u.company?.name
    })));

    console.groupEnd();
}

/**
 * მომხმარებლების ბარათების გენერირება და HTML-ში ჩასმა
 * @param {Array} users 
 * @param {HTMLElement} container 
 */
function renderUsers(users, container) {
    if (!users || users.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 border border-dashed border-slate-800 rounded-3xl p-8 bg-slate-900/30">
                <p class="text-base font-semibold text-slate-300">მომხმარებელი ვერ მოიძებნა</p>
                <p class="text-xs text-slate-500 mt-1">სცადეთ სხვა საძიებო სიტყვა</p>
            </div>
        `;
        return;
    }

    container.innerHTML = users.map(user => {
        const initials = user.name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

        return `
            <article class="group relative rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-brand-500/50 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col justify-between">
                <div>
                    <div class="flex items-start justify-between gap-4 mb-5">
                        <div class="flex items-center gap-3.5">
                            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                                ${initials}
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
                                    ${user.name}
                                </h3>
                                <p class="text-xs text-brand-400 font-medium">@${user.username}</p>
                            </div>
                        </div>
                        <span class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/60">
                            #${user.id}
                        </span>
                    </div>

                    <div class="mb-5 pb-5 border-b border-slate-800/70">
                        <div class="flex items-center gap-2 text-xs text-slate-400 mb-1">
                            <span class="font-medium text-slate-300">${user.company.name}</span>
                        </div>
                        <p class="text-[11px] text-slate-500 italic line-clamp-1">"${user.company.catchPhrase}"</p>
                    </div>

                    <ul class="space-y-2.5 text-xs text-slate-300">
                        <li class="flex items-center gap-2.5">
                            <a href="mailto:${user.email}" class="hover:text-brand-300 truncate transition-colors">${user.email}</a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <a href="tel:${user.phone}" class="hover:text-brand-300 truncate transition-colors">${user.phone}</a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <span class="text-slate-400 truncate">${user.address.city}, ${user.address.street}</span>
                        </li>
                    </ul>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs">
                    <span class="text-slate-500">ZIP: ${user.address.zipcode}</span>
                    <a href="https://${user.website}" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-300 font-semibold group/btn transition-colors">
                        <span>ვებსაიტი</span>
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

function showLoadingState(container) {
    container.innerHTML = `<div class="col-span-full text-center py-10 text-slate-400 animate-pulse">იტვირთება მონაცემები...</div>`;
}

function showErrorState(container, message) {
    container.innerHTML = `<div class="col-span-full text-center py-10 text-red-400">შეცდომა: ${message}</div>`;
}

/**
 * ძიების ფილტრაცია
 */
function setupSearchFilter() {
    const searchInput = document.getElementById('users-search-input');
    const container = document.getElementById('users-container');
    const statusCounter = document.getElementById('users-counter');

    if (!searchInput || !container) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        const filtered = allUsers.filter(user => {
            return user.name.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.company.name.toLowerCase().includes(query) ||
                user.address.city.toLowerCase().includes(query);
        });

        renderUsers(filtered, container);

        if (statusCounter) {
            statusCounter.textContent = `${filtered.length} / ${allUsers.length} მომხმარებელი`;
        }
    });
}
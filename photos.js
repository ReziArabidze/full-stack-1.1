/**
 * ====================================================================
 * ფოტოების მართვის JavaScript ფაილი (photos.js)
 * დანიშნულება: JSONPlaceholder API-დან პირველი 10 ფოტოს წამოღება,
 *              კონსოლში დეტალების დალოგვა და UI-ში ვიზუალიზაცია
 * ====================================================================
 */

'use strict';

const PHOTOS_API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=10';

// გლობალური მასივი წამოღებული ფოტოების შესანახად (ძიებისთვის)
let allPhotos = [];

/**
 * DOM-ის ჩატვირთვის შემდეგ გამოვიძახოთ API
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchPhotos();
    setupPhotosSearch();
});

/**
 * პირველი 10 ფოტოს წამოღების ასინქრონული ფუნქცია
 */
async function fetchPhotos() {
    const container = document.getElementById('photos-container');
    const counterBadge = document.getElementById('photos-counter');

    if (container) {
        showPhotosLoading(container);
    }

    try {
        const response = await fetch(PHOTOS_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP შეცდომა! სტატუსი: ${response.status}`);
        }

        const data = await response.json();
        // გარანტირებულად პირველი 10 ფოტო
        const firstTenPhotos = data.slice(0, 10);
        allPhotos = firstTenPhotos;

        // ==========================================================
        // დავალების მოთხოვნა: მონაცემების დალოგვა ბრაუზერის კონსოლში
        // ==========================================================
        logPhotosToConsole(firstTenPhotos);

        // UI-ს განახლება
        if (container) {
            renderPhotos(firstTenPhotos, container);
        }

        if (counterBadge) {
            counterBadge.textContent = `${firstTenPhotos.length} ფოტო ჩაიტვირთა`;
        }

    } catch (error) {
        console.error('❌ შეცდომა ფოტოების წამოღებისას:', error);

        if (container) {
            showPhotosError(container, error.message);
        }
    }
}

/**
 * ფოტოების დეტალური დალოგვა კონსოლში
 * @param {Array} photos 
 */
function logPhotosToConsole(photos) {
    console.group('📸 JSONPlaceholder - პირველი 10 ფოტო');
    console.log(`✅ წარმატებით ჩაიტვირთა ${photos.length} ფოტო:`);

    // 1. თითოეული ფოტოს სათაური და URL
    photos.forEach((photo, index) => {
        console.log(`${index + 1}. [ID: ${photo.id}] სათაური: "${photo.title}" | URL: ${photo.url}`);
    });

    // 2. მხოლოდ სათაურების მასივი ცალკე
    const titlesArray = photos.map(photo => photo.title);
    console.log('📋 ფოტოების სათაურების სია (Array):', titlesArray);

    // 3. ვიზუალური ცხრილი კონსოლში (console.table)
    console.table(photos.map(p => ({
        'ID': p.id,
        'ალბომი (Album ID)': p.albumId,
        'სათაური (Title)': p.title,
        'სრული ფოტოს URL': p.url,
        'მინიატურა (Thumbnail)': p.thumbnailUrl
    })));

    console.groupEnd();
}

/**
 * ფოტოების ბარათების გენერირება UI-ში
 * @param {Array} photos 
 * @param {HTMLElement} container 
 */
function renderPhotos(photos, container) {
    if (!photos || photos.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 border border-dashed border-slate-800 rounded-3xl p-8 bg-slate-900/30">
                <svg class="w-12 h-12 mx-auto text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-base font-semibold text-slate-300">ფოტო ვერ მოიძებნა</p>
                <p class="text-xs text-slate-500 mt-1">სცადეთ სხვა საძიებო სიტყვა</p>
            </div>
        `;
        return;
    }

    container.innerHTML = photos.map((photo, index) => {
        return `
            <article class="group relative rounded-3xl border border-slate-800/80 bg-slate-900/40 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-brand-500/50 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col justify-between">
                <div>
                    <!-- ფოტოს კონტეინერი / გამოსახულება -->
                    <div class="relative w-full aspect-square overflow-hidden bg-slate-900">
                        <img src="${photo.url}" alt="${photo.title}" loading="lazy"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onerror="this.onerror=null; this.src='${photo.thumbnailUrl}';">
                        
                        <!-- ეტიკეტები / Badges -->
                        <div class="absolute top-3 left-3 flex items-center gap-2">
                            <span class="px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono bg-slate-950/80 backdrop-blur-md text-brand-400 border border-brand-500/30 shadow-md">
                                #${photo.id}
                            </span>
                            <span class="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-800 shadow-md">
                                ალბომი: ${photo.albumId}
                            </span>
                        </div>

                        <div class="absolute top-3 right-3">
                            <span class="w-7 h-7 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-center text-[11px] font-bold text-slate-400">
                                ${index + 1}/10
                            </span>
                        </div>
                    </div>

                    <!-- ფოტოს აღწერა და სათაური -->
                    <div class="p-5 sm:p-6 space-y-3">
                        <div class="flex items-center gap-2 text-xs text-brand-400 font-semibold uppercase tracking-wider">
                            <span class="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                            <span>ფოტო #${photo.id}</span>
                        </div>
                        <h3 class="text-sm sm:text-base font-bold text-white capitalize line-clamp-2 group-hover:text-brand-300 transition-colors">
                            ${photo.title}
                        </h3>
                    </div>
                </div>

                <!-- ქვედა ზოლი და ლინკი -->
                <div class="p-5 sm:p-6 pt-0">
                    <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span class="text-slate-500 text-[11px] truncate max-w-[150px]">
                            ${photo.url}
                        </span>
                        <a href="${photo.url}" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-brand-500 hover:text-white text-brand-400 font-semibold transition-all shadow-sm">
                            <span>ნახვა</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * ჩატვირთვის ანიმაციური ბარათები (Skeletons)
 * @param {HTMLElement} container 
 */
function showPhotosLoading(container) {
    const skeleton = `
        <div class="rounded-3xl border border-slate-800/80 bg-slate-900/30 overflow-hidden animate-pulse">
            <div class="w-full aspect-square bg-slate-800/60"></div>
            <div class="p-5 space-y-3">
                <div class="h-3 bg-slate-800 rounded w-1/4"></div>
                <div class="h-4 bg-slate-800 rounded w-5/6"></div>
                <div class="h-4 bg-slate-800 rounded w-3/4"></div>
            </div>
        </div>
    `;

    container.innerHTML = Array(6).fill(skeleton).join('');
}

/**
 * შეცდომის ჩვენება
 * @param {HTMLElement} container 
 * @param {string} message 
 */
function showPhotosError(container, message) {
    container.innerHTML = `
        <div class="col-span-full text-center py-12 border border-red-500/20 rounded-3xl p-8 bg-red-950/20 backdrop-blur-xl">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">ფოტოების ჩატვირთვა ვერ მოხერხდა</h3>
            <p class="text-sm text-slate-400 max-w-md mx-auto mb-6">${message}</p>
            <button type="button" onclick="fetchPhotos()" 
                class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 shadow-md shadow-brand-500/20 transition-all">
                ხელახლა ცდა
            </button>
        </div>
    `;
}

/**
 * ფოტოების ცოცხალი ძიება სათაურის ან ID-ის მიხედვით
 */
function setupPhotosSearch() {
    const searchInput = document.getElementById('photos-search-input');
    const container = document.getElementById('photos-container');
    const counterBadge = document.getElementById('photos-counter');

    if (!searchInput || !container) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        const filtered = allPhotos.filter(photo => {
            return photo.title.toLowerCase().includes(query) ||
                   photo.id.toString() === query ||
                   photo.albumId.toString() === query;
        });

        renderPhotos(filtered, container);

        if (counterBadge) {
            counterBadge.textContent = `${filtered.length} / ${allPhotos.length} ფოტო`;
        }
    });
}


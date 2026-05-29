const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../projects.html');
let content = fs.readFileSync(filePath, 'utf-8');

const filterHTML = `
            <!-- Project Filters -->
            <div class="flex flex-wrap justify-center gap-3 mb-12 fade-in-up" style="transition-delay: 100ms;" id="project-filters">
                <button class="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all border border-blue-600" data-filter="all">Todos</button>
                <button class="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm" data-filter="fullstack">Full Stack</button>
                <button class="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm" data-filter="backend">Backend</button>
            </div>
            
            <div class="grid`;

if (!content.includes('id="project-filters"')) {
    content = content.replace('<div class="grid', filterHTML);
}

// Add data-categories (assuming 6 projects, 1, 2, 3 are fullstack, 4, 5, 6 are backend based on previous context)
// Let's replace the project div class with the data-category
const projectDivRegex = /<div class="fade-in-up flex flex-col bg-white/g;
let projectIndex = 0;
content = content.replace(projectDivRegex, (match) => {
    projectIndex++;
    let category = 'backend';
    if (projectIndex <= 3) {
        category = 'fullstack';
    }
    return `<div data-category="${category}" class="project-card fade-in-up flex flex-col bg-white`;
});

// Add filtering script at the end of the body
const filterScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active from all
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-blue-600', 'text-white', 'shadow-blue-500/30', 'border-blue-600');
                        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-700');
                    });
                    
                    // Add active to clicked
                    btn.classList.add('bg-blue-600', 'text-white', 'shadow-blue-500/30', 'border-blue-600');
                    btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-700');

                    const filterValue = btn.getAttribute('data-filter');

                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'flex';
                            setTimeout(() => card.style.opacity = '1', 50);
                        } else {
                            card.style.opacity = '0';
                            setTimeout(() => card.style.display = 'none', 300);
                        }
                    });
                });
            });
        });
    </script>
`;

if (!content.includes("const filterBtns = document.querySelectorAll('.filter-btn');")) {
    content = content.replace('</body>', `${filterScript}\n</body>`);
}

fs.writeFileSync(filePath, content);
console.log('Filters added to projects.html');

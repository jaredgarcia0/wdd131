let allEntries = getEntries();

// Populate tag dropdown from all unique tags
function populateTagFilter() {
    const allTags = [...new Set(allEntries.flatMap(e => e.tags))].sort();
    const select = document.getElementById('tag-select');
    allTags.forEach(tag => {
        const opt = document.createElement('option');
        opt.value = tag;
        opt.textContent = tag;
        select.appendChild(opt);
  });
}

function renderEntries() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const sort   = document.getElementById('sort-select').value;
    const tag    = document.getElementById('tag-select').value;

    let filtered = allEntries.filter(entry => {
        const matchesSearch =
            entry.title.toLowerCase().includes(search) ||
            entry.body.toLowerCase().includes(search);
        const matchesTag = tag ? entry.tags.includes(tag) : true;
        return matchesSearch && matchesTag;
    });

    filtered.sort((a, b) => {
        return sort === 'newest'
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
        });

    const container = document.getElementById('entries-list');
    const countEl   = document.getElementById('results-count');

    countEl.textContent = `${filtered.length} entr${filtered.length === 1 ? 'y' : 'ies'} found`;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No entries match your search.</p>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map(entry => `
        <div class="card" style="margin-bottom: 12px;">
        <div style="display:flex; justify-content:space-between; align-items:start;">
            <div>
            <div class="card-date">${formatDate(entry.date)}</div>
            <div class="card-title">${entry.title}</div>
            <div class="card-preview">${entry.body}</div>
            <div class="tags">
                ${entry.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            </div>
            <div style="display:flex; gap:8px; margin-left:1rem; flex-shrink:0;">
            <a href="entry-form.html?id=${entry.id}" class="btn btn-outline">Edit</a>
            <button class="btn btn-outline" style="color:#e05555; border-color:#e05555;"
                onclick="handleDelete('${entry.id}')">Delete</button>
            </div>
        </div>
        </div>
    `).join('');
}

function handleDelete(id) {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    deleteEntry(id);
    allEntries = getEntries();
    populateTagFilter();
    renderEntries();
}

// Event listeners — search and filters update list in real time
document.getElementById('search-input').addEventListener('input', renderEntries);
document.getElementById('sort-select').addEventListener('change', renderEntries);
document.getElementById('tag-select').addEventListener('change', renderEntries);

populateTagFilter();
renderEntries();
let allEntries = getEntries();

function populateTagFilter() {
  const allTags = allEntries
    .flatMap(function(e) { return e.tags; })
    .filter(function(tag, index, self) { return self.indexOf(tag) === index; })
    .sort();

  const select = document.getElementById('tag-select');
  allTags.forEach(function(tag) {
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

  let filtered = allEntries.filter(function(entry) {
    const matchesSearch =
      entry.title.toLowerCase().includes(search) ||
      entry.body.toLowerCase().includes(search);
    const matchesTag = tag ? entry.tags.includes(tag) : true;
    return matchesSearch && matchesTag;
  });

  filtered.sort(function(a, b) {
    return sort === 'newest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const container = document.getElementById('entries-list');
  const countEl   = document.getElementById('results-count');

  countEl.textContent = filtered.length + (filtered.length === 1 ? ' entry' : ' entries') + ' found';

  if (filtered.length === 0) {
    container.innerHTML =
      '<div class="empty-state"><p>No entries match your search.</p></div>';
    return;
  }

  container.innerHTML = filtered.map(function(entry) {
    const tags = entry.tags.map(function(t) {
      return '<span class="tag">' + t + '</span>';
    }).join('');

    return (
      '<div class="card" style="margin-bottom:12px;">' +
        '<div style="display:flex; justify-content:space-between; align-items:start;">' +
          '<div style="flex:1; min-width:0;">' +
            '<div class="card-date">' + formatDate(entry.date) + '</div>' +
            '<div class="card-title">' + entry.title + '</div>' +
            '<div class="card-preview">' + entry.body + '</div>' +
            '<div class="tags">' + tags + '</div>' +
          '</div>' +
          '<div class="card-actions">' +
            '<a href="entry-form.html?id=' + entry.id + '" class="btn btn-outline">Edit</a>' +
            '<button class="btn btn-outline delete-btn" onclick="handleDelete(\'' + entry.id + '\')" aria-label="Delete entry">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

function handleDelete(id) {
  if (!confirm('Delete this entry? This cannot be undone.')) return;
  deleteEntry(id);
  allEntries = getEntries();
  // Reset and repopulate tag filter
  const select = document.getElementById('tag-select');
  select.innerHTML = '<option value="">All tags</option>';
  populateTagFilter();
  renderEntries();
}

document.getElementById('search-input').addEventListener('input', renderEntries);
document.getElementById('sort-select').addEventListener('change', renderEntries);
document.getElementById('tag-select').addEventListener('change', renderEntries);

populateTagFilter();
renderEntries();
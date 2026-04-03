function renderRecentEntries() {
  const entries = getEntries().slice(0, 3);
  const container = document.getElementById('recent-entries-list');

  if (entries.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No entries yet. Start writing your first one!</p>
        <a href="entry-form.html" class="btn btn-primary" style="margin-top:1rem">+ New Entry</a>
      </div>`;
    return;
  }

  container.innerHTML = entries.map(entry => `
    <div class="card" onclick="location.href='entry-form.html?id=${entry.id}'" style="cursor:pointer; margin-bottom: 12px;">
      <div class="card-date">${formatDate(entry.date)}</div>
      <div class="card-title">${entry.title}</div>
      <div class="card-preview">${entry.body}</div>
      <div class="tags">
        ${entry.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderStats() {
  const entries = getEntries();
  document.getElementById('total-entries').textContent = entries.length;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = entries.filter(e => new Date(e.date) >= oneWeekAgo).length;
  document.getElementById('this-week').textContent = thisWeek;

  // Simple streak: count consecutive days from today backwards
  const today = new Date().toDateString();
  const dates = [...new Set(entries.map(e => new Date(e.date).toDateString()))];
  let streak = 0;
  let check = new Date();
  while (dates.includes(check.toDateString())) {
    streak++;
    check.setDate(check.getDate() - 1);
  }
  document.getElementById('streak').textContent = streak + ' 🔥';
}

renderStats();
renderRecentEntries();
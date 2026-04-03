function renderRecentEntries() {
  const entries = getEntries().slice(0, 3);
  const container = document.getElementById('recent-entries-list');

  if (entries.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<p>No entries yet. Start writing your first one!</p>' +
        '<a href="entry-form.html" class="btn btn-primary" style="margin-top:1rem">+ New Entry</a>' +
      '</div>';
    return;
  }

  container.innerHTML = entries.map(function(entry) {
    const tags = entry.tags.map(function(t) {
      return '<span class="tag">' + t + '</span>';
    }).join('');

    return (
      '<div class="card" onclick="location.href=\'entry-form.html?id=' + entry.id + '\'" style="cursor:pointer; margin-bottom:12px;">' +
        '<div class="card-date">' + formatDate(entry.date) + '</div>' +
        '<div class="card-title">' + entry.title + '</div>' +
        '<div class="card-preview">' + entry.body + '</div>' +
        '<div class="tags">' + tags + '</div>' +
      '</div>'
    );
  }).join('');
}

function renderStats() {
  const entries = getEntries();

  // Total entries
  document.getElementById('total-entries').textContent = entries.length;

  // This week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = entries.filter(function(e) {
    return new Date(e.date) >= oneWeekAgo;
  }).length;
  document.getElementById('this-week').textContent = thisWeek;

  // Streak: count consecutive days from today backwards
  const dates = entries.map(function(e) {
    return new Date(e.date).toDateString();
  });
  const uniqueDates = [...new Set(dates)];
  let streak = 0;
  const check = new Date();
  while (uniqueDates.includes(check.toDateString())) {
    streak++;
    check.setDate(check.getDate() - 1);
  }
  document.getElementById('streak').textContent = streak + ' 🔥';
}

renderStats();
renderRecentEntries();
const STORAGE_KEY = 'daily_journal_entries';

function seedIfEmpty() {
  if (getEntries().length > 0) return;
  const seeds = [
    {
      id: '1',
      title: 'A Challenging Day',
      body: 'Today was tough. Had a big presentation at work and felt overwhelmed. I just need to finish this week and do my homework.',
      tags: ['work', 'stress'],
      date: '2024-10-26T19:30:00'
    },
    {
      id: '2',
      title: 'Finals Week',
      body: 'I had two finals. I got 92 in my WDD 131 final and a 100 on my cyber security one. Hard work pays off!',
      tags: ['gratitude', 'productivity', 'school'],
      date: '2024-10-24T09:15:00'
    },
    {
      id: '3',
      title: 'Morning Walk',
      body: 'Went for a 30 minute walk before work, but it was cold because Rexburg. Regardless of the cold I enjoyed the walk.',
      tags: ['mindfulness', 'mood'],
      date: '2024-10-21T07:45:00'
    }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
}

function getEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function getEntryById(id) {
  return getEntries().find(function(e) { return e.id === id; }) || null;
}

function saveEntry(entry) {
  const entries = getEntries();
  if (entry.id) {
    const idx = entries.findIndex(function(e) { return e.id === entry.id; });
    if (idx !== -1) {
      entries[idx] = entry;
    } else {
      entries.unshift(entry);
    }
  } else {
    entry.id = Date.now().toString();
    entry.date = new Date().toISOString();
    entries.unshift(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entry;
}

function deleteEntry(id) {
  const filtered = getEntries().filter(function(e) { return e.id !== id; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

seedIfEmpty();
const params  = new URLSearchParams(window.location.search);
const entryId = params.get('id');
const isEdit  = !!entryId;

const titleInput = document.getElementById('entry-title');
const bodyInput  = document.getElementById('entry-body');
const tagsInput  = document.getElementById('entry-tags');
const saveBtn    = document.getElementById('save-btn');
const deleteBtn  = document.getElementById('delete-btn');
const formTitle  = document.getElementById('form-title');

// If editing, pre-fill the form
if (isEdit) {
  const entry = getEntryById(entryId);
  if (entry) {
    formTitle.textContent     = 'Edit Entry';
    document.title            = 'Edit Entry — Daily Journal';
    titleInput.value          = entry.title;
    bodyInput.value           = entry.body;
    tagsInput.value           = entry.tags.join(', ');
    deleteBtn.style.display   = 'inline-flex';
    saveBtn.textContent       = 'Save Changes';
  } else {
    // Entry not found — go back
    alert('Entry not found.');
    location.href = 'entries.html';
  }
}

// Save
saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const body  = bodyInput.value.trim();
  const tags  = tagsInput.value
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(t => t.length > 0);

  // Basic validation
  if (!title) {
    titleInput.focus();
    titleInput.style.borderColor = '#e05555';
    titleInput.placeholder = 'Please add a title...';
    return;
  }
  if (!body) {
    bodyInput.focus();
    bodyInput.style.borderColor = '#e05555';
    bodyInput.placeholder = 'Please write something...';
    return;
  }

  const entry = {
    id:    isEdit ? entryId : null,
    date:  isEdit ? getEntryById(entryId).date : new Date().toISOString(),
    title,
    body,
    tags
  };

  saveEntry(entry);
  location.href = 'index.html';
});

// Reset border color on input
titleInput.addEventListener('input', () => titleInput.style.borderColor = '');
bodyInput.addEventListener('input',  () => bodyInput.style.borderColor  = '');

// Delete
deleteBtn.addEventListener('click', () => {
  if (!confirm('Delete this entry? This cannot be undone.')) return;
  deleteEntry(entryId);
  location.href = 'entries.html';
});
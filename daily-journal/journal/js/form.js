const params  = new URLSearchParams(window.location.search);
const entryId = params.get('id');
const isEdit  = !!entryId;

const titleInput = document.getElementById('entry-title');
const bodyInput  = document.getElementById('entry-body');
const tagsInput  = document.getElementById('entry-tags');
const saveBtn    = document.getElementById('save-btn');
const deleteBtn  = document.getElementById('delete-btn');
const formTitle  = document.getElementById('form-title');

// Pre-fill form if editing
if (isEdit) {
  const entry = getEntryById(entryId);
  if (entry) {
    formTitle.textContent   = 'Edit Entry';
    document.title          = 'Edit Entry — Daily Journal';
    titleInput.value        = entry.title;
    bodyInput.value         = entry.body;
    tagsInput.value         = entry.tags.join(', ');
    deleteBtn.style.display = 'inline-flex';
    saveBtn.textContent     = 'Save Changes';
  } else {
    alert('Entry not found.');
    location.href = 'entries.html';
  }
}

// Save entry
saveBtn.addEventListener('click', function() {
  const title = titleInput.value.trim();
  const body  = bodyInput.value.trim();
  const tags  = tagsInput.value
    .split(',')
    .map(function(t) { return t.trim().toLowerCase(); })
    .filter(function(t) { return t.length > 0; });

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

  const originalEntry = isEdit ? getEntryById(entryId) : null;

  const entry = {
    id:    isEdit ? entryId : null,
    date:  isEdit && originalEntry ? originalEntry.date : new Date().toISOString(),
    title: title,
    body:  body,
    tags:  tags
  };

  saveEntry(entry);
  location.href = 'index.html';
});

// Reset validation styles on input
titleInput.addEventListener('input', function() { titleInput.style.borderColor = ''; });
bodyInput.addEventListener('input',  function() { bodyInput.style.borderColor  = ''; });

// Delete entry
deleteBtn.addEventListener('click', function() {
  if (!confirm('Delete this entry? This cannot be undone.')) return;
  deleteEntry(entryId);
  location.href = 'entries.html';
});
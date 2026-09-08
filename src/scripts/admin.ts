// Interactive concept only. No fetch, auth, cookies, storage, or remote writes.
type Inquiry = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: string;
  received: string;
};
type Draft = { title: string; summary: string; body: string };
const sampleInquiries: Inquiry[] = [
  {
    id: 'sample-1',
    name: 'Alex Morgan · fictional',
    email: 'alex@example.com',
    service: 'First appointment',
    message: 'I’m interested in learning how a first visit works. What is the best next step?',
    status: 'new',
    received: 'Sample · Today, 9:40 AM',
  },
  {
    id: 'sample-2',
    name: 'Jordan Ellis · fictional',
    email: 'jordan@example.com',
    service: 'Contrast therapy',
    message: 'Could you help me understand the options for booking a contrast therapy session?',
    status: 'new',
    received: 'Sample · Today, 8:15 AM',
  },
  {
    id: 'sample-3',
    name: 'Casey Parker · fictional',
    email: 'casey@example.com',
    service: 'Practitioner mentorship',
    message: 'I would like to hear more about mentorship opportunities and the topics you cover.',
    status: 'contacted',
    received: 'Sample · Yesterday, 3:20 PM',
  },
];
const sampleDrafts: Draft[] = [
  {
    title: 'Manual therapy',
    summary: 'Understand how you move.',
    body: 'Individual assessment, hands-on soft tissue work, and movement education. An approach built around your body and your goals.',
  },
  {
    title: 'Contrast therapy',
    summary: 'Make space for recovery.',
    body: 'Cold plunge, hot plunge, and infrared sauna in our Oswego recovery space. A dedicated hour to complement your tissue work.',
  },
];
let inquiries = structuredClone(sampleInquiries);
let drafts = structuredClone(sampleDrafts);
const el = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const node = <K extends keyof HTMLElementTagNameMap>(tag: K, text = '', className = '') => {
  const n = document.createElement(tag);
  n.textContent = text;
  n.className = className;
  return n;
};
const feedback = (text: string) => {
  el('workspace-message').textContent = text;
};
const readOnly = () => el<HTMLSelectElement>('preview-role').value === 'viewer';
function renderInquiries() {
  const filter = el<HTMLSelectElement>('inquiry-filter').value;
  const rows = inquiries.filter((row) => filter === 'all' || row.status === filter);
  el('inquiry-list').replaceChildren(
    ...rows.map((row) => {
      const article = node('article', '', 'inquiry-item');
      article.append(node('h3', row.name));
      const meta = node('div', '', 'inquiry-meta');
      meta.append(node('span', row.email), node('span', row.received), node('span', row.service));
      article.append(meta, node('p', row.message, 'inquiry-body'));
      const label = node('label', 'Preview status', 'compact-label');
      const select = node('select');
      for (const status of ['new', 'contacted', 'closed']) {
        const option = node('option', status[0].toUpperCase() + status.slice(1));
        option.value = status;
        select.append(option);
      }
      select.value = row.status;
      select.disabled = readOnly();
      label.append(select);
      article.append(label);
      select.addEventListener('change', () => {
        row.status = select.value;
        renderInquiries();
        feedback('Sample status changed in this preview only. Nothing has been saved.');
      });
      return article;
    }),
  );
  if (!rows.length)
    el('inquiry-list').append(
      node('p', 'No fictional inquiries match this view.', 'workspace-muted'),
    );
}
function field(labelText: string, name: string, value: string, multiline = false) {
  const label = node('label', labelText);
  const input = multiline ? node('textarea') : node('input');
  input.name = name;
  input.value = value;
  input.required = true;
  input.maxLength = multiline ? 3000 : 200;
  input.disabled = readOnly();
  label.append(input);
  return label;
}
function renderDrafts() {
  el('draft-list').replaceChildren(
    ...drafts.map((draft, index) => {
      const form = node('form', '', 'draft-form');
      form.append(
        node('h3', `0${index + 1} / ${draft.title}`),
        field('Service title · demo', 'title', draft.title),
        field('Short introduction · demo', 'summary', draft.summary),
        field('Service copy · demo', 'body', draft.body, true),
      );
      const button = node('button', 'Preview changes');
      button.type = 'submit';
      button.disabled = readOnly();
      form.append(button);
      const preview = node('div', '', 'draft-preview');
      preview.hidden = true;
      preview.setAttribute('aria-live', 'polite');
      form.append(preview);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (readOnly() || !form.reportValidity()) return;
        const values = new FormData(form);
        const updated = {
          title: String(values.get('title')).trim(),
          summary: String(values.get('summary')).trim(),
          body: String(values.get('body')).trim(),
        };
        if (Object.values(updated).some((value) => !value)) {
          feedback('Please complete each demo field before previewing.');
          return;
        }
        drafts[index] = updated;
        preview.replaceChildren(
          node('p', 'LOCAL PREVIEW · NOT SAVED', 'eyebrow'),
          node('h3', updated.title),
          node('p', updated.summary, 'draft-preview-summary'),
          node('p', updated.body),
        );
        preview.hidden = false;
        feedback(
          'Draft preview updated. No content was saved or published. Reloading will reset these edits.',
        );
      });
      return form;
    }),
  );
}
el('inquiry-filter').addEventListener('change', renderInquiries);
el('preview-role').addEventListener('change', () => {
  const role = el<HTMLSelectElement>('preview-role').value;
  el('role-description').textContent =
    role === 'owner'
      ? 'Concept: access to inquiries, service drafts, and team planning.'
      : role === 'partner'
        ? 'Concept: manage inquiries and prepare service drafts.'
        : 'Concept: review inquiries and drafts without edit controls.';
  renderInquiries();
  renderDrafts();
  feedback(
    'Role preview changed. This is a visual demonstration, not a sign-in or permission change.',
  );
});
el('reset-preview').addEventListener('click', () => {
  inquiries = structuredClone(sampleInquiries);
  drafts = structuredClone(sampleDrafts);
  el<HTMLSelectElement>('inquiry-filter').value = 'all';
  renderInquiries();
  renderDrafts();
  feedback('Fictional sample data restored. No saved data was changed.');
});
renderInquiries();
renderDrafts();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/p13n_answers', (req, res) => {
  // Return sample dyk_cards and flash_cards
  const response = {
    dyk_cards: [
      {
        id: 'dyk1',
        title: 'Did you know: Screen time effects',
        description: 'Excessive screen time can affect attention span in young children.',
        resources: [
          { type: 'link', url: 'https://example.com/article1' }
        ]
      },
      {
        id: 'dyk2',
        title: 'Did you know: Sleep and development',
        description: 'Consistent sleep schedule supports cognitive development.',
        resources: []
      }
    ],
    flash_cards: [
      {
        id: 'fc1',
        front: 'What helps language development?',
        back: 'Talking frequently, reading aloud, and responsive interactions.'
      },
      {
        id: 'fc2',
        front: 'When to introduce solids?',
        back: 'Around 6 months, when baby shows readiness signs.'
      }
    ]
  };
  res.json(response);
});

app.post('/activate_tinu', (req, res) => {
  // Return sample cards and chips
  const response = {
    cards: [
      { id: 't1', title: 'Tinu Tip: Hydration', body: 'Keep your child hydrated for better mood.' },
      { id: 't2', title: 'Tinu Tip: Routine', body: 'Routines improve sleep and behavior.' }
    ],
    chips: [
      { id: 'c1', label: 'Nutrition' },
      { id: 'c2', label: 'Sleep' },
      { id: 'c3', label: 'Behavior' }
    ]
  };
  res.json(response);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`TinyPal backend listening on ${port}`));

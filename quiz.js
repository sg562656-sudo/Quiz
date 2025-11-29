<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Console Quiz Game — Single File</title>
</head>
<body>
  <h1>Console Quiz Game</h1>
  <p>Open DevTools → Console to see logs. Prompts & alerts will appear in the page.</p>

  <!-- All JS is embedded below to avoid linking issues -->
  <script>
  (function () {
    'use strict';

    // Predefined quiz (answers intentionally lowercase)
    const quiz = [
      { question: "What is the capital of France?", answer: "paris" },
      { question: "Which language runs in a web browser?", answer: "javascript" },
      { question: "What is 5 + 3?", answer: "8" },
      { question: "What color do you get when you mix red and blue?", answer: "purple" }
    ];

    function log(msg) {
      try { console.log(msg); } catch (e) { /* ignore */ }
    }

    function safePrompt(text) {
      try {
        return prompt(text);
      } catch (err) {
        // Some browsers or contexts may block prompt(); report and return null
        alert('prompt() is blocked in this browser/context. See console for details.');
        console.error('prompt() call failed:', err);
        return null;
      }
    }

    function startQuiz() {
      try {
        log('Quiz starting...');
        let score = 0;
        alert('Welcome to the Quiz Game!');

        for (let i = 0; i < quiz.length; i++) {
          // Use safePrompt wrapper to catch prompt() blocking
          const raw = safePrompt(quiz[i].question);

          // If user cancelled or prompt failed, stop gracefully
          if (raw === null) {
            alert('Quiz cancelled or not allowed in this context.');
            log('Quiz cancelled by user or prompt blocked.');
            return;
          }

          // Normalize user input
          const answer = String(raw).toLowerCase().trim();

          if (answer === quiz[i].answer) {
            alert('Correct! 🎉');
            score++;
          } else {
            alert('Wrong ❌ — correct answer: "' + quiz[i].answer + '".');
          }
        }

        alert('Quiz finished! Your score: ' + score + ' / ' + quiz.length);
        log('Final Score: ' + score + ' / ' + quiz.length);

      } catch (error) {
        // Catch any unexpected runtime errors and log them
        alert('An unexpected error happened. Check the console for details.');
        console.error('Quiz runtime error:', error);
      }
    }

    // Start after small delay so page renders first (avoids some race issues)
    window.addEventListener('load', function () {
      setTimeout(startQuiz, 150);
    });
  })();
  </script>
</body>
</html>

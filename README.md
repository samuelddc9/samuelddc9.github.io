<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Tap Games - Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
  <div class="logo">
    <img src="teamtap.png" alt="Team Tap Games Logo"> <!-- Company logo -->
    <h1>Team Tap Games</h1>
  </div>
  <nav>
    <ul>
      <li><a href="#about">About Us</a></li>
      <li><a href="#games">Games</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>

<div class="spacer"></div>

<section class="hero">
  <div class="hero-content">
    <h2>Creating Fun, Cooperative Experiences</h2>
    <p>Join us in crafting games that bring people together.</p>
  </div>
</section>

<section id="about">
  <h2>About Team Tap Games</h2>
  <p>Team Tap Games is all about creating cooperative and interactive gaming experiences that players can enjoy together. Whether it’s fast-paced time management or fun-filled teamwork, we bring joy to players through our games.</p>
</section>

<section id="games">
  <h2>Our Games</h2>
  <div class="game-list">
    <div class="game-item">
      <div class="carousel" id="carousel1">
        <div class="slides">
          <img src="hospitalhavoc.png" alt="Hospital Havoc Screenshot 1">
          <img src="hospital_havoc_screenshot2.jpg" alt="Hospital Havoc Screenshot 2">
          <img src="hospital_havoc_screenshot3.jpg" alt="Hospital Havoc Screenshot 3">
        </div>
        <button class="prev" onclick="plusSlides(-1, 0)">&#10094;</button>
        <button class="next" onclick="plusSlides(1, 0)">&#10095;</button>
        <div class="indicators">
          <span class="dot" onclick="currentSlide(1, 0)"></span>
          <span class="dot" onclick="currentSlide(2, 0)"></span>
          <span class="dot" onclick="currentSlide(3, 0)"></span>
        </div>
      </div>
      <h3>Hospital Havoc</h3>
      <p>A fast-paced, cooperative hospital management game where you and your team...</p>
    </div>

    <div class="game-item">
      <div class="carousel" id="carousel2">
        <div class="slides">
          <img src="medbaylogo.jpg" alt="Game 2 Screenshot 1">
          <img src="medbayss.jpg" alt="Game 2 Screenshot 2">
          <img src="medbayss2.jpg" alt="Game 2 Screenshot 3">
        </div>
        <button class="prev" onclick="plusSlides(-1, 1)">&#10094;</button>
        <button class="next" onclick="plusSlides(1, 1)">&#10095;</button>
        <div class="indicators">
          <span class="dot" onclick="currentSlide(1, 1)"></span>
          <span class="dot" onclick="currentSlide(2, 1)"></span>
          <span class="dot" onclick="currentSlide(3, 1)"></span>
        </div>
      </div>
      <h3>Monster Medbay</h3>
      <p>Another fast-paced, cooperative game where you and your team...</p>
    </div>
  </div>
</section>

<section id="contact">
  <h2>Contact Us</h2>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
    <button type="submit">Send</button>
  </form>
</section>

<footer>
  <p>&copy; 2024 Team Tap Games. All rights reserved.</p>
</footer>

<script src="js/app.js"></script>
</body>
</html>

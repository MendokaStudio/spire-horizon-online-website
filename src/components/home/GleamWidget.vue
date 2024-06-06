<template>
    <div class="gleam-widget">
      <!-- Gleam widget anchor tag -->
      <a class="e-widget no-button" href="https://gleam.io/vMBS0/spire-horizon-online" rel="nofollow">
        Spire Horizon Online
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: "GleamWidget",
    mounted() {
      // Load the Gleam widget script when the component is mounted
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://widget.gleamjs.io/e.js';
      script.async = true;
      document.body.appendChild(script);
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for your Gleam widget here */
  .gleam-widget {
    margin: 20px auto;
    text-align: center;
  }
  </style>
  
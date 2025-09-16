export default defineNuxtPlugin(() => {
  // Ensure client-side only code runs properly
  if (process.client) {
    // Initialize any client-specific functionality here
    console.log('Client-side initialized')
  }
})
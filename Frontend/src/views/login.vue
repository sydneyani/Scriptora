<template>
  <div class="flex items-center justify-center h-screen bg-black-800">
    <div class="w-full max-w-md">
      <h1 class="mb-8 text-4xl font-bold text-center text-purple-700">Welcome</h1>
      <form @submit.prevent="bypassLogin" novalidate="true" class="px-8 pt-6 pb-8 mb-4 bg-gray-700 rounded shadow-md">
        <div class="flex justify-center mt-10">
          <div class="form-button-container">
            <button class="button bg-purple-700 text-white rounded" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useLoggedInUserStore } from "../store/loggedInUser";

export default {
  setup() {
    const store = useLoggedInUserStore();

    // New method to bypass login
    const bypassLogin = () => {
      store.$patch({
        isLoggedIn: true,
        name: "Guest User"  // You can put any name or set dynamic names here
      });
      
      // Redirect to a new page after "login"
      window.location.href = '/dashboard'; // Change this to your desired route
    };

    return {
      store,
      bypassLogin,  // Add the method to the return so it can be used in the template
    }
  }
}
</script>

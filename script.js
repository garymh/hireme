(function () {
  const toggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  function updateIcon() {
    toggle.textContent = html.getAttribute("data-theme") === "dark" ? "☼" : "☾";
  }

  toggle.addEventListener("click", function () {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon();
  });

  updateIcon();
})();

const SUPABASE_URL = "https://aexdvqdxlyhwupxwjzak.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_wDXYuuEPqKNrWIh3rj9Jrg_GgnCcNZQ";
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("form-status");
    const btn = form.querySelector('button[type="submit"]');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const body = form.body.value.trim();

    if (!name || !email || !body) {
      status.className = "form-status error";
      status.textContent = "fill out everything, please";
      return;
    }

    btn.disabled = true;
    btn.textContent = "sending...";

    try {
      const { error } = await supabaseClient
        .from("contacts")
        .insert({ name, email, body });
      if (error) throw error;
      status.className = "form-status success";
      status.textContent = "sent. thank you 😊";
      form.reset();
    } catch (err) {
      status.className = "form-status error";
      status.textContent =
        "oops something broke. try again or contact me on linkedin?";
      console.error(err);
    } finally {
      btn.disabled = false;
      btn.textContent = "send";
    }
  });


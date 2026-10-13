const companyMenuButton = document.querySelector("#company-menu-button");
const companyNav = document.querySelector("#company-nav");

companyMenuButton?.addEventListener("click", () => {
  const isOpen = companyNav.classList.toggle("open");
  companyMenuButton.setAttribute("aria-expanded", String(isOpen));
  companyMenuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  companyMenuButton.textContent = isOpen ? "×" : "☰";
});

companyNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    companyNav.classList.remove("open");
    companyMenuButton?.setAttribute("aria-expanded", "false");
    if (companyMenuButton) {
      companyMenuButton.setAttribute("aria-label", "Ouvrir le menu");
      companyMenuButton.textContent = "☰";
    }
  });
});

const companyYear = document.querySelector("#company-year");
if (companyYear) companyYear.textContent = new Date().getFullYear();

const partnerForm = document.querySelector("#partner-form");
const partnerMessage = document.querySelector("#partner-form-message");

partnerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = partnerForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.querySelector("span:first-child").textContent = "Envoi en cours…";
  partnerMessage.hidden = true;
  partnerMessage.classList.remove("error");

  try {
    const response = await fetch(partnerForm.action, {
      method: "POST",
      body: new FormData(partnerForm),
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error("La demande n’a pas été acceptée.");
    partnerMessage.textContent = "Merci. Votre demande a bien été envoyée à Nova Digital.";
    partnerMessage.hidden = false;
    partnerForm.reset();
  } catch {
    partnerMessage.innerHTML = 'Le formulaire est temporairement indisponible. Écrivez directement à <a href="mailto:omeongaandre2@gmail.com">omeongaandre2@gmail.com</a>.';
    partnerMessage.classList.add("error");
    partnerMessage.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span:first-child").textContent = "Envoyer la demande";
  }
});

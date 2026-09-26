import PolicyPage from "./PolicyPage";
import { site } from "../data/site";

function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>
        This policy explains what information {site.name} collects when you
        use this website, how it is used, and the rights you have over it. We
        keep the information we handle to a minimum: you can browse films and
        build a programme without creating an account or telling us who you
        are.
      </p>

      <h3>Who we are</h3>
      <p>
        {site.name} runs this website and is the data controller for the
        personal information described in this policy. You can contact us
        about privacy at{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>

      <h3>Information we collect</h3>
      <p>
        <strong>Information stored on your device.</strong> When you add films
        to your programme, the list of films you chose is saved in your
        browser&apos;s local storage so it is still there when you come back.
        This stays on your device and is not sent to us. Our{" "}
        <a href="#/cookie-policy">Cookie Policy</a> explains this in more
        detail.
      </p>
      <p>
        <strong>Technical information.</strong> Like almost every website, the
        service that hosts this site automatically records basic technical
        information when pages are requested, such as your IP address,
        browser type, the pages requested and the time of the request. This
        is used to deliver the site and keep it secure.
      </p>
      <p>
        We do not ask for your name, email address or payment details, we do
        not use analytics or advertising tools, and we do not use your
        information to build a profile of you.
      </p>

      <h3>How we use your information and our legal basis</h3>
      <ul>
        <li>
          <strong>Remembering your programme</strong>, so the site works the
          way you expect. This happens only on your device, at your request.
        </li>
        <li>
          <strong>Running and protecting the website</strong>, for example
          preventing abuse and diagnosing faults. Our legal basis is our
          legitimate interest in providing a secure, working website.
        </li>
      </ul>

      <h3>Sharing your information</h3>
      <p>
        We do not sell, rent or trade your personal information. Technical
        information is handled by our hosting provider, who acts on our
        behalf, may only use it to provide their service, and must keep it
        secure. We may disclose information if the law requires it.
      </p>

      <h3>How long we keep it</h3>
      <p>
        Your programme stays in your browser until you remove the films or
        clear your browser&apos;s data for this site. Hosting logs are kept
        for a limited period for security purposes and then deleted.
      </p>

      <h3>Your rights</h3>
      <p>
        Under UK data protection law (the UK GDPR and the Data Protection Act
        2018) you have the right to:
      </p>
      <ul>
        <li>ask for a copy of the personal information we hold about you;</li>
        <li>ask us to correct information that is wrong or incomplete;</li>
        <li>ask us to delete your information;</li>
        <li>ask us to restrict or stop using your information; and</li>
        <li>object to how we use your information.</li>
      </ul>
      <p>
        To use any of these rights, email{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. We
        will respond within one month. If you are unhappy with how we have
        handled your information, you can complain to the Information
        Commissioner&apos;s Office (ICO) at{" "}
        <a href="https://ico.org.uk" rel="noopener noreferrer">
          ico.org.uk
        </a>
        .
      </p>

      <h3>Children</h3>
      <p>
        This website is not designed to collect information from children,
        and we do not knowingly collect personal information from anyone
        under 13.
      </p>

      <h3>Changes to this policy</h3>
      <p>
        We may update this policy from time to time. The date at the top of
        this page shows when it last changed.
      </p>
    </PolicyPage>
  );
}

export default PrivacyPolicy;

import PolicyPage from "./PolicyPage";
import { site } from "../data/site";
import { PROGRAMME_STORAGE_KEY } from "../utils/programmeStorage";

function CookiePolicy() {
  return (
    <PolicyPage title="Cookie Policy">
      <p>
        This policy explains how {site.name} uses cookies and similar
        technologies, and how you can control them.
      </p>

      <h3>What are cookies and similar technologies?</h3>
      <p>
        Cookies are small text files that a website saves on your device.
        Similar technologies, such as your browser&apos;s local storage, let a
        website remember information in the same way. The law treats them
        alike, so this policy covers both.
      </p>

      <h3>Does this site use cookies?</h3>
      <p>
        No. This website does not set any cookies, and it does not use
        analytics, advertising or social media tools that would set cookies
        of their own.
      </p>
      <p>
        We use your browser&apos;s local storage for one purpose: remembering
        the films you add to your programme.
      </p>

      <div className="policy-table">
        <table>
          <caption>What this website stores on your device</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Purpose</th>
              <th scope="col">How long it lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Name">
                <code>{PROGRAMME_STORAGE_KEY}</code>
              </td>
              <td data-label="Type">Local storage (strictly necessary)</td>
              <td data-label="Purpose">
                Remembers the films you have added to your programme.
              </td>
              <td data-label="How long it lasts">
                Until you remove the films or clear your browser&apos;s data
                for this site
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Why we don&apos;t ask for consent</h3>
      <p>
        UK law (the Privacy and Electronic Communications Regulations) allows
        storage that is strictly necessary to provide a service you have
        asked for without asking for consent first. Remembering the programme
        you build is part of the service you use, so we don&apos;t show a
        cookie banner. If we ever add optional cookies, such as analytics, we
        will ask for your consent before setting them and update this policy.
      </p>

      <h3>Managing what is stored</h3>
      <ul>
        <li>
          Remove films from your programme using the &ldquo;Remove from
          programme&rdquo; button on each film.
        </li>
        <li>
          Clear all information this site has stored by clearing your
          browser&apos;s cookies and site data for this website. Your
          browser&apos;s help pages explain how.
        </li>
      </ul>

      <h3>More information</h3>
      <p>
        Our <a href="#/privacy-policy">Privacy Policy</a> explains how we
        handle personal information. If you have questions about this policy,
        email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </PolicyPage>
  );
}

export default CookiePolicy;
